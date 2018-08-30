const db = require("../databases/mongo");
const moment = require("moment");

module.exports = db.defineModel({
	__modelName:    "order",
	prodId:         db.Types.String,
	prodName:		db.Types.String,
	amount:         db.Types.Number,
	unit:           db.Types.String,
	total:			db.Types.Number,
	time:           db.Types.Date,
	expTyp:         db.Types.String,
	expNo:          db.Types.String,
	address:        db.Types.String,
	openId:			db.Types.String,
	custName:       db.Types.String,
	custContact:    db.Types.String,
	process:        db.Types.String,
	note:           db.Types.String,
	cancelReason:   db.Types.String,
    rateLevel:		db.Types.Number,
	rateContent:	db.Types.String
}, {
	middle: {
        select: {
        	after(docs) {
                docs = docs.map(d => {
                    d._doc.time = moment(d._doc.time).format("YYYY/MM/DD HH:mm:ss");
                    return d;
				});
			}
		}
	},
	router: {
		methods: ["GET", "ALL", "POST", "PUT"]
	}
});