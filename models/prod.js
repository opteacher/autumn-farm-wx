const db = require("../databases/mongo");

module.exports = db.defineModel({
    __modelName:    "prod",
    tempId:     db.Types.String,
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
    prefers:    [db.Types.String],
    images:     [db.Types.String],
    date:       db.Types.Date
}, {
    router: {
        methods: ["GET", "ALL", "POST", "PUT", "DELETE", {
            method: "PROP", properties: ["images"]
        }]
    }
});