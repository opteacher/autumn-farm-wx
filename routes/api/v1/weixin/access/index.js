const _ = require("lodash");
const router = require("koa-router")();
const projPath = require("../../../../../utils/system").projRootPath();
const crypto = require("crypto");
const xml2json = require("xml2json");

const wxCfg = require(`${projPath}/config/wx`);
const wxSvc = require(`${projPath}/services/weixin`);

router.get("/", async ctx => {
    if(!ctx.request.query) {
        ctx.body = "This's not a weixin request";
        return;
    }
    let query = ctx.request.query;
    if(query.echostr) {
        if(!query.signature || !query.timestamp || !query.nonce) {
            ctx.body = "Lost one of signature or timestamp or nonce or echostr";
            return;
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
    } else {
        ctx.req.rawBody = "";
        ctx.acceptsCharsets("utf-8");
        ctx.req.on("data", chunk => {
            ctx.req.rawBody += chunk;
        });
        ctx.req.on("end", () => {
            wxSvc.switchMessage(
                JSON.parse(xml2json.toJson(ctx.req.rawBody))
            );
        });
        ctx.send();
    }
});

module.exports = router;