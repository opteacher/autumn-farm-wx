const _ = require("lodash");
const router = require("koa-router")();
const uuidv4 = require("uuid/v4");
const moment = require("moment");
const axios = require("axios");
const wxXml = require("wx-xml");
const projPath = require("../../../../../utils/system").projRootPath();

const getClientIp = require(`${projPath}/utils/system`).getClientIp;
const env = require(`${projPath}/utils/system`).env();
const wxCfg = require(`${projPath}/config/wx.${env}`);
const wxSvc = require(`${projPath}/services/weixin`);

router.post("/", async ctx => {
    let prodName = ctx.request.body.body;
    let reqBody = {
        appid: wxCfg.appid,
        mch_id: wxCfg.pay.mch_id,
        device_info: "WEB",
        nonce_str: uuidv4().replace("-", ""),
        body: `秋缘农场-购买商品${prodName ? `:${prodName}` : ""}`,
    };
    reqBody.sign = wxSvc.genSignature("md5", reqBody, {key: wxCfg.pay.key}).toUpperCase();
    let orderTime = moment(ctx.request.body.time);
    reqBody = _.assign(reqBody, {
        sign_type: "MD5",
        detail: ctx.request.body.note,
        attach: "",
        out_trade_no: ctx.request.body.orderId,
        fee_type: "CNY",
        total_fee: ctx.request.body.total,
        spbill_create_ip: getClientIp(ctx.request),// 客户端IP
        time_start: orderTime.format("YYYYMMDDHHmmss"),
        time_expire: orderTime.add(1, "d").format("YYYYMMDDHHmmss"),
        goods_tag: "",
        notify_url: ctx.request.body.callback,
        trade_type: "JSAPI",
        product_id: ctx.request.body.prodId,
        limit_pay: "no_credit",
        openid: ctx.request.body.openid,
        scene_info: ""
    });

    let reqXmlBody = wxXml.js2xml(reqBody, false); // 如果指定了scene_info，则需要加CDATA
    let resXmlData = (await axios({
        method: "POST",
        url: wxCfg.urls.newOrder,
        data: reqXmlBody,
        headers: { "content-type": "text/xml" }
    })).data;
    let resData = wxXml.xml2js(resXmlData);
    if(resData.return_code !== "SUCCESS") {
        ctx.throw(400, "weixin", resData.return_msg);
    }
    if(resData.result_code !== "SUCCESS") {
        ctx.throw(400, "weixin", `${resData.err_code} - ${resData.err_code_des}`);
    }
    ctx.body = {
        prepay_id: resData.prepay_id
    }
});

module.exports = router;