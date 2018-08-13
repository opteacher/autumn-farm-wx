const json2xml = require("json2xml");

module.exports = {
    switchMessage(ctx, msg) {
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
                        Articles: [],
                        Title: "测试",
                        Description: "这是关注之后的推送",
                        PicUrl: "http://owb90pdwd.bkt.clouddn.com/th.jpeg",
                        Url: "http://opteacher.top/doc/v1/file-list"
                    };
                    ctx.set("Content-Type", "text/xml");
                    ret = json2xml(resDat);
            }
        }
        ctx.body = `<xml>${ret}</xml>`;
    }
};