const db = require("../databases/mongo");

module.exports = db.defineModel({
	__modelName:    "order",
	prodId:         db.Types.String,
	prodName:		db.Types.String,
	amount:         db.Types.Number,
	unit:           db.Types.String,
	total:			db.Types.Number,
	time:           db.Types.Date,
	address:        db.Types.String,
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