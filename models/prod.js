const db = require("../databases/mongo");

module.exports = db.defineModel({
    __modelName:    "prod",
    icon:       db.Types.String,
    name:       db.Types.String,
    type:       db.Types.String,
    title:      db.Types.String,
    prices: [{
        price:  db.Types.String,
        unit:   db.Types.String
    }],
    express: [{
        typ:    db.Types.String,
        cost:   db.Types.String
    }],
    prefer:     [db.Types.String],
    date:       db.Types.Date
}, {
    router: {
        methods: ["GET", "ALL", "POST", "PUT", "DELETE"]
    }
});