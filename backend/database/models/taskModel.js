"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskModel = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		task_board_id: {
			type: Schema.Types.ObjectId,
			ref: "taskBoard",
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

module.exports = mongoose.model("task", taskModel);
