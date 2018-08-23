const wxXml = require("wx-xml");
const axios = require("axios");

const env = require("../utils/system").env();
const wxCfg = require(`../config/wx.${env}`);
const cookies = require("../utils/cookies");

module.exports = {
	accessToken: {},
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
    switchMessage(ctx, msg) {
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
                    // 保存微信用户openid
	                ctx.set("openid", xml.FromUserName);
                    ret = xml.FromUserName;
                    break;
            }
        }
        if(msgTyp === "text") {
            let resDat = {
                ToUserName: xml.FromUserName,
                FromUserName: xml.ToUserName,
                CreateTime: Date.now(),
                MsgType: "news",
                ArticleCount: 1,
                Articles: [{
                    item: {
                        Title: "测试",
                        Description: "这是发送消息之后的推送",
                        PicUrl: "http://owb90pdwd.bkt.clouddn.com/th.jpeg",
                        Url: "http://opteacher.top/doc/v1"
                    }
                }]
            };
            ret = wxXml.js2xml(resDat);
        }
        console.log(`发送的消息：${ret}`);
        return ret;
    }
};