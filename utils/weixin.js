module.exports = {
    composeXmlData(data) {
        let ret = [];
        for (let rtTag in data) {
            let arDat = data[rtTag];
            ret.push("<" + rtTag + ">");
            for (let tag in arDat) {
                let dat = arDat[tag];
                ret.push("<" + tag + ">");
                if (typeof(dat) === "string") {
                    ret.push("<![CDATA[" + dat + "]]>");
                }
                else if (typeof(dat) === "object") {
                    if (dat.content) {
                        if (dat.cdata && dat.cdata === false) {
                            ret.push(dat.content);
                        }
                        else {
                            ret.push("<![CDATA[" + dat + "]]>");
                        }
                    }
                }
                ret.push("</" + tag + ">");
            }
            ret.push("</" + rtTag + ">");
        }
        return ret.join("");
    }
};