const router = require("koa-router")();
const projPath = require("../../../../../../utils/system").projRootPath();

const env = require(`${projPath}/utils/system`).env();
const cdnCfg = require(`${projPath}/config/cdn.${env}`);

const cfg = require(`${projPath}/config/model.json`);
const db = require(`${projPath}/databases/${cfg.type}`);
const {Images} = require(`${projPath}/models/index`);

router.post("/", async ctx => {
    try {
        await db.save(Images, ctx.request.body)
    } catch (e) {
        ctx.throw(400, "failed", e.message || JSON.stringify(e))
    }

    ctx.body = `${cdnCfg.bucketUrl}/${ctx.request.body.key}`
});

module.exports = router;