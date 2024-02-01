"use strict";

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	mode: {
		production: false,
		staging: false,
		development: true,
	},
	mongo: {
		url: process.env.MONGO_URL,
	},
	mysql: {
		hostname: process.env.DB_HOSTNAME || "localhost",
		user: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || "",
		dbname: process.env.DB_DATABASE || "master",
		prefix: process.env.DB_PREFIX || "",
	},
	key: {
		secret: process.env.SECRET,
	},
	server: {
		port: process.env.PORT,
	},
};
