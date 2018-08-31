const _ = require("lodash");
const router = require("koa-router")();
const projPath = require("../../../../../../utils/system").projRootPath();
const crypto = require("crypto");

const env = require(`${projPath}/utils/system`).env();
const wxCfg = require(`${projPath}/config/wx.${env}`);
const wxSvc = require(`${projPath}/services/weixin`);

router.get("/", async ctx => {
    if(!ctx.request.query) {
        ctx.throw(400, "weixin", "This's not a weixin request");
    }
    let query = ctx.request.query;
    if(!query.signature || !query.timestamp || !query.nonce || !query.echostr) {
        ctx.throw(400, "weixin", "Lost one of signature or timestamp or nonce or echostr");
    }
    let sig = query.signature;
    let tms = query.timestamp;
    let noc = query.nonce;
    let ecs = query.echostr;
    let tkn = wxCfg.token;

    let dat = [tkn, tms, noc].sort().join("");
    let hsh = crypto.createHash("sha1").update(dat).digest("hex");
    console.log(hsh);

    if(hsh === sig) {
        ctx.body = ecs;
    } else {
        ctx.body = "";
    }
});

router.post("/", async ctx => {
	ctx.set("openid", ctx.request.query.openid);

    ctx.body = await new Promise((res, rej) => {
	    var data = "";
	    ctx.req.on("data", chunk => {
		    data += chunk;
	    });
	    ctx.req.on("error", msg => {
	        rej(msg)
	    });
	    ctx.req.on("end", async () => {
		    res(wxSvc.switchMessage(data));
	    });
    }).then(res => {
	    if(res.length === 0) {
	        ctx.throw(400, "weixin", "错误的请求格式，来源非微信");
	    }
	    ctx.set("Content-Type", "text/xml");
	    return res;
    }).catch(err => {
        ctx.set("Content-Type", "application/json");
	    return err;
    })
});

module.exports = router;