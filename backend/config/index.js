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
	key: {
		secret: process.env.SECRET || 'Secret',
	},
	server: {
		port: process.env.PORT || 3000,
	},
};
