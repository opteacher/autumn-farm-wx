const db = require("../databases/mongo");

module.exports = db.defineModel({
    __modelName:    "admin",
    username:   db.Types.String,
    password:   db.Types.String
}, {
    router: {
        methods: ["GET", "ALL"]
    }
});