const db = require("../databases/mongo");

module.exports = db.defineModel({
	__modelName:    "temp",
	json:   db.Types.String
}, {
	router: {
		methods: ["GET", "ALL", "POST", "DELETE", "PUT"]
	}
});