const router = require("koa-router")();
const projPath = require("../../../../../../utils/system").projRootPath();

const env = require(`${projPath}/utils/system`).env();
const wxCfg = require(`${projPath}/config/wx.${env}`);
const wxSvc = require(`${projPath}/services/weixin`);

router.get("/", async ctx => {
    let resBody = {};
    if(ctx.request.query.appid !== undefined) {
        ctx.request.query.appid = wxCfg.appid;
        resBody.appid = ctx.request.query.appid;
    }
    if(ctx.request.query.mch_id !== undefined) {
        ctx.request.query.mch_id = wxCfg.pay.mch_id;
        resBody.mch_id = ctx.request.query.mch_id;
    }
    if(ctx.request.query.jsapi_ticket !== undefined) {
        ctx.request.query.jsapi_ticket = await wxSvc.getJsApiTicket();
        resBody.jsapi_ticket = ctx.request.query.jsapi_ticket;
    }
    let cypoAlgo = "sha1";
    if(ctx.request.query.crypto !== undefined) {
        cypoAlgo = ctx.request.query.crypto;
        delete ctx.request.query.crypto;
    }

    resBody.signature = wxSvc.genSignature(cypoAlgo, ctx.request.query);

    ctx.body = resBody;
});

module.exports = router;