const db = require("../databases/mongo");

module.exports = db.defineModel({
    __modelName:    "prod",
    icon:       db.Types.String,
    name:       db.Types.String,
    type:       db.Types.String,
    baseDesc:   db.Types.String,
    moreDesc:   db.Types.String,
    detail: {

    }
}, {
    router: {
        methods: ["GET", "ALL", "POST", "PUT", "DELETE"]
    }
});