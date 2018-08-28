const router = require("koa-router")();
const qiniu = require("qiniu");
const projPath = require("../../../../../utils/system").projRootPath();

const env = require(`${projPath}/utils/system`).env();
const cdnCfg = require(`${projPath}/config/cdn.${env}`);

let token = {tkn: "", exp: 0};

router.get("/token", async ctx => {
    if(token.tkn.length === 0 || Date.now() - token.exp > 1200000) {// 过期一小时后
        let mac = new qiniu.auth.digest.Mac(cdnCfg.access, cdnCfg.secret);
        let putPolicy = new qiniu.rs.PutPolicy({
            scope: cdnCfg.bucket
        });
        token.tkn = putPolicy.uploadToken(mac);
        token.exp = Date.now();
    }
    ctx.body = token.tkn;
});

module.exports = router;