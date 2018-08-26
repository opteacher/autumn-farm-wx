const router = require("koa-router")();
const uuidv4 = require("uuid/v4");
const projPath = require("../../../../../utils/system").projRootPath();

const wxSvc = require(`${projPath}/services/weixin`);

router.get("/", async ctx => {
    let noncestr = ctx.request.query.noncestr;
    if(!noncestr) {
        noncestr = uuidv4();
    }
    let timestamp = ctx.request.query.timestamp;
    if(!timestamp) {
        timestamp = Date.now();
    }

    ctx.body = {
        noncestr,
        timestamp,
        sig: await wxSvc.genSignature(noncestr, timestamp)
    }
});

module.exports = router;