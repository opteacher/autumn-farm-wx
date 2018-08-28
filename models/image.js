const db = require("../databases/mongo");

module.exports = db.defineModel({
    __modelName:    "image",
    key:    db.Types.String,
    hash:   db.Types.String
}, {
    router: {
        methods: ["ALL", "POST"]
    }
});