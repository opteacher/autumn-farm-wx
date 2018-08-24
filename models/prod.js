const db = require("../databases/mongo");

module.exports = db.defineModel({
    __modelName:    "prod",
    icon:       db.Types.String,
    name:       db.Types.String,
    type:       db.Types.String,
    title:      db.Types.String,
    prices: [{
        price:  db.Types.Number,
        unit:   db.Types.String
    }],
    express: [{
        typ:    db.Types.String,
        cost:   db.Types.Number
    }],
    prefer:     [db.Types.String],
    date:       db.Types.Date
}, {
    router: {
        methods: ["GET", "ALL", "POST", "PUT", "DELETE"]
    }
});