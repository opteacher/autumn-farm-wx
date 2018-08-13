const wxXml = require("wx-xml");
const axios = require("axios");

const wxCfg = require("../config/wx");

module.exports = {
    wrapError(errResp) {
        if(!errResp) {
            return "undefined response";
        }
        return `${errResp.errcode || "XXXXX"} -- ${errResp.errmsg || "no error message"}`;
    },
    async initialize() {
        // 获取access token
        let acsTkn = (await axios.get(wxCfg.urls.getToken, {
            params: {
                "grant_type": "client_credential",
                "appid": wxCfg.appid,
                "secret": wxCfg.secret
            }
        })).data;
        if(!acsTkn.access_token) {
            throw new Error(this.wrapError(acsTkn));
        }
        acsTkn = acsTkn.access_token;

        // 初始化界面
        let result = (await axios.post(`${wxCfg.urls.createButton}?access_token=${acsTkn}`,
            wxCfg.templates.createButton)).data;
        if(result.errcode !== 0 || result.errmsg !== "ok") {
            throw new Error(this.wrapError(result));
        }
    },
    switchMessage(ctx, msg) {
        console.log(`接收的消息：${msg}`);
        let xml = msg.xml;
        let msgTyp = xml.MsgType;
        let ret = "";
        if(msgTyp === "event") {
            switch(xml.Event) {
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
                    ctx.set("Content-Type", "text/xml");
                    ret = wxXml.js2xml(resDat);
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
            ctx.set("Content-Type", "text/xml");
            ret = wxXml.js2xml(resDat);
        }
        ctx.body = ret;
        console.log(`发送的消息：${ctx.body}`);
    }
};