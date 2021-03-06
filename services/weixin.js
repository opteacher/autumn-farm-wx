const _ = require("lodash");
const wxXml = require("wx-xml");
const axios = require("axios");
const crypto = require("crypto");
const uuidv4 = require("uuid/v4");

const env = require("../utils/system").env();
const wxCfg = require(`../config/wx.${env}`);
const cookies = require("../utils/cookies");

module.exports = {
	accessToken: {},
    jsApiTicket: {},
    wrapError(errResp) {
        if(!errResp) {
            return "undefined response";
        }
        return `${errResp.errcode || "XXXXX"} -- ${errResp.errmsg || "no error message"}`;
    },
    async getAccessToken() {
        if(this.accessToken.tkn && Date.now() < this.accessToken.exp) {
            return this.accessToken.tkn;
        } else {
	        let result = (await axios.get(wxCfg.urls.getToken, {
		        params: {
			        "grant_type": "client_credential",
			        "appid": wxCfg.appid,
			        "secret": wxCfg.secret
		        }
	        })).data;
	        if(!result.access_token) {
		        throw new Error(this.wrapError(result));
	        }
	        this.accessToken.tkn = result.access_token;
	        this.accessToken.exp = Date.now() + result.expires_in * 1000;
	        return this.accessToken.tkn;
        }
    },
    async getJsApiTicket() {
	    if(this.jsApiTicket.tkt && Date.now() < this.jsApiTicket.exp) {
	        return this.jsApiTicket.tkt;
        } else {
            let result = (await axios.get(wxCfg.urls.getJsApiTicket, {
                params: {
                    access_token: await this.getAccessToken(),
                    type: "jsapi"
                }
            })).data;
            if(!result.ticket) {
                throw new Error(this.wrapError(result));
            }
            this.jsApiTicket.tkt = result.ticket;
            this.jsApiTicket.exp = Date.now() + result.expires_in * 1000;
            return this.jsApiTicket.tkt
        }
    },
    async initialize() {
        // 获取access token
        let acsTkn = await this.getAccessToken();

        // 初始化界面
        let result = (await axios.post(`${wxCfg.urls.createButton}?access_token=${acsTkn}`,
            wxCfg.templates.createButton)).data;
        if(result.errcode !== 0 || result.errmsg !== "ok") {
            throw new Error(this.wrapError(result));
        }
    },
	_encode(unencoded) {
		return encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22")
	},
    switchMessage(msg) {
        console.log(`接收的消息：${msg}`);
        let xml = wxXml.xml2js(msg);
        let msgTyp = xml.MsgType;
        let ret = "";
        if(msgTyp === "event") {
            switch(xml.Event.toLowerCase()) {
                case "subscribe":
                    let resDat = {
                        ToUserName: xml.FromUserName,
                        FromUserName: xml.ToUserName,
                        CreateTime: Date.now(),
                        MsgType: "news",
                        ArticleCount: 1,
                        Articles: [{
                            item: {
                                Title: "测试",
                                Description: "这是关注之后的推送",
                                PicUrl: "http://owb90pdwd.bkt.clouddn.com/th.jpeg",
                                Url: "http://opteacher.top/doc/v1"
                            }
                        }]
                    };
                    ret = wxXml.js2xml(resDat);
                    break;
                case "view":
                    xml.EventKey += `?openid=${xml.FromUserName}`;
                    ret = wxXml.js2xml(xml);
                    break;
            }
        }
        if(msgTyp === "text") {
            if(wxCfg.adminPasswords.includes(xml.Content)) {
	            let resDat = {
		            ToUserName: xml.FromUserName,
		            FromUserName: xml.ToUserName,
		            CreateTime: Date.now(),
		            MsgType: "news",
		            ArticleCount: 1,
		            Articles: [{
			            item: {
				            Title: "管理员链接",
				            Description: "点击登陆管理员页面",
				            PicUrl: "http://owb90pdwd.bkt.clouddn.com/th.jpeg",
				            Url: [
					            wxCfg.urls.authorize,
					            `?appid=${wxCfg.appid}`,
					            `&redirect_uri=${this._encode("http://opteacher.top/#/autumnFarmWX/admin/process/orders")}`,
					            "&response_type=code",
					            "&scope=snsapi_base",
					            "#wechat_redirect"
				            ].join("")
			            }
		            }]
	            };
	            ret = wxXml.js2xml(resDat);
            }
        }
        console.log(`发送的消息：${ret}`);
        return ret;
    },
    genSignature(cypoAlgo, encBody, noSort) {
	    let signature = _.toPairs(encBody);
        // signature = signature.map(pr => [pr[0], pr[1].toLowerCase()]);
        signature.sort((pr1, pr2) => pr1[0] < pr2[0] ? -1 : 1);
        if(noSort) {
            signature = signature.concat(_.toPairs(noSort));
        }
        signature = signature.map(pr => `${pr[0]}=${pr[1]}`).reduce((pr1, pr2) => `${pr1}&${pr2}`);
        return crypto.createHash(cypoAlgo).update(signature).digest("hex");
    }
};