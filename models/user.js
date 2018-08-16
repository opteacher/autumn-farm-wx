const db = require("../databases/mongo");

module.exports = db.defineModel({
    __modelName:    "user",
    phonenum:   db.Types.String,
    password:   db.Types.String
}, {
    middle: {
        create: {
            before(doc) {
                let sha1 = require("crypto").createHash("sha1");
                sha1.update(doc.password);
                doc.password = sha1.digest("hex");
            }
        }
    },
    router: {
        methods: ["GET", "ALL", "POST"]
    }
});