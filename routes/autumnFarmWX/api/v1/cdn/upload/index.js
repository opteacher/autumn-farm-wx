const router = require("koa-router")();
const qiniu = require("qiniu");
const projPath = require("../../../../../../utils/system").projRootPath();

const env = require(`${projPath}/utils/system`).env();
const cdnCfg = require(`${projPath}/config/cdn.${env}`);

let token = {tkn: "", exp: 0};

router.get("/token", async ctx => {
	let mac = new qiniu.auth.digest.Mac(cdnCfg.access, cdnCfg.secret);
	let putPolicy = new qiniu.rs.PutPolicy({
		scope: cdnCfg.bucket
	});
    ctx.body = putPolicy.uploadToken(mac);
});

module.exports = router;