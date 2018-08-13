const _ = require("lodash");
const router = require("koa-router")();
const projPath = require("../../../../../utils/system").projRootPath();
const crypto = require("crypto");

const wxCfg = require(`${projPath}/config/wx`);

router.get("/", async ctx => {
    if(!ctx.request.query) {
        ctx.body = "This's not a weixin request";
        return;
    }
    let query = ctx.request.query;
    if(!query.signature || !query.timestamp
    || !query.nonce || !query.echostr) {
        ctx.body = "Lost one of signature or timestamp or nonce or echostr";
        return;
    }
    let sig = query.signature;
    let tms = query.timestamp;
    let noc = query.nonce;
    let ecs = query.echostr;
    let tkn = wxCfg.token;

    let ary = [tkn, tms, noc].sort();
    let hsh = crypto.createHash("sha1").update(ary).digest("hex");
    console.log(hsh);

    if(hsh === sig) {
        ctx.body = ecs;
    } else {
        ctx.body = "";
    }
});

module.exports = router;