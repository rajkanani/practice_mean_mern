"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskBoardModel = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		name: {
			type: String,
			required: "name is required",
		},
		description: {
			type: String,
		},
		files: {
			type: String
		},
		status: {
			type: Number,
			default: 1,
			// 1 = Active, 2 = Deleted
		}
	},
	{ timestamps: true }
);
taskBoardModel.index({ name: 1, user_id: 1 }, { unique: true });
module.exports = mongoose.model("taskBoard", taskBoardModel);
