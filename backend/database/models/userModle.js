"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userModle = new Schema(
	{
		email: {
			type: String,
			required: "email is required",
		},
		password: {
			type: String,
		},
		role: {
			type: Number,
			default: 2,
			// 1 = Regular user, 2 = Admin
		},
		name: {
			type: String,
			required: "name is required",
		},
		image: {
			type: String
		},
		status: {
			type: Number,
			default: 1,
			// 1 = Active, 2 = Blocked, 3 = Deleted
		},
		password_status: {
			type: Number,
			default: 1,
			// 0 = Active, 1 = Reset request
		},
		otp: {
			type: Number,
		},
		otpExpiry: {
			type: Date,
		},
	},
	{ timestamps: true }
);
userModle.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("user", userModle);
