const db = require("../databases/mongo");

module.exports = db.defineModel({
	__modelName:    "order",
	oid:            db.Types.String,
	prodId:         db.Types.Id,
	amount:         db.Types.Number,
	unit:           db.Types.String,
	time:           db.Types.Date,
	custName:       db.Types.String,
	custContact:    db.Types.String,
	process:        db.Types.String,
	note:           db.Types.String
}, {
	router: {
		methods: ["GET", "ALL", "POST", "PUT"]
	}
});