const db = require("../databases/mongo");

module.exports = db.defineModel({
    __modelName:    "user",
    openid:     db.Types.String,
    name:       db.Types.String,
    sex:        db.Types.String,
    phone:      db.Types.String,
    addresses:  db.Types.String
}, {
    router: {
        methods: ["GET", "ALL", "POST", "PUT"]
    }
});