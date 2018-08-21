const db = require("../databases/mongo");

module.exports = db.defineModel({
	__modelName:    "order",
	oid:            db.Types.String,
	wayBill:		db.Types.String,
	prodId:         db.Types.String,
	prodName:		db.Types.String,
	amount:         db.Types.Number,
	unit:           db.Types.String,
	time:           db.Types.Date,
	openId:			db.Types.String,
	custName:       db.Types.String,
	custContact:    db.Types.String,
	process:        db.Types.String,
	note:           db.Types.String
}, {
	router: {
		methods: ["GET", "ALL", "POST", "PUT"]
	}
});