"use strict";

const bcrypt = require("bcryptjs");
const config = require("./../../../config");
var mongoose = require("mongoose");
var user = mongoose.model("user");
var taskBoard = mongoose.model("taskBoard");
var task = mongoose.model("task");
const path = require('path');
const error = require("./../../../helpers/error");
const { jwtSign } = require("../../../helpers/jwt");

class Customer {
    constructor() { }

    file_upload = async (element) => {
        return new Promise((resolve, reject) => {
            element.mv(path.join(__dirname, '../../../public/images', `${element.md5}-${element.name}`),function(err) {
                if(err){
                    console.log(err);
                    resolve()
                }else{
                    console.log("uploaded");
                    resolve(`${element.md5}-${element.name}`)
                } 
            })
        })
    } 

    get_task_board = () => {
        return async (req, res, next) => {
            try {
                const {_id} = req.body.auth;
                const { name } = req.body;

                const boards = await taskBoard.aggregate([{
                    $match: {
                        user_id: new mongoose.Types.ObjectId(_id),
                    }
                }]);

                return res.status(200).json({
                    success: true,
                    message: `Task board get successfully`,
                    data: boards
                });
            } catch (err) {
                console.log(err);
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

    delete_task_board = () => {
        return async (req, res, next) => {
            try {
                const {_id} = req.body.auth;
                const { task_board_id } = req.body;

                const boards = await taskBoard.deleteOne({ _id: task_board_id, user_id: _id });
                const tasks = await task.deleteMany({ task_board_id: task_board_id, user_id: _id });

                return res.status(200).json({
                    success: true,
                    message: `Task board deleted successfully`
                });
            } catch (err) {
                console.log(err);
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

    create_task_board = () => {
        return async (req, res, next) => {
            try {
                const {_id} = req.body.auth;
                const { name, description } = req.body;

                let data = {name, description, user_id: _id}
                var  board = await taskBoard.create(data);

                return res.status(200).json({
                    success: true,
                    message: `Task board created successfully`,
                    data: board
                });
            } catch (err) {
                if (err.code === 11000) return error.sendBadRequest(res, "Task board already exists!");
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

    create_task = () => {
        return async (req, res, next) => {
            try {
                const {_id} = req.body.auth;
                const { name, description, task_board_id } = req.body;

                let data = {name, description, user_id: _id, task_board_id}
                var  board = await task.create(data);

                return res.status(200).json({
                    success: true,
                    message: `Task created successfully`,
                    data: board
                });
            } catch (err) {
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

    get_task = () => {
        return async (req, res, next) => {
            try {
                const {_id} = req.body.auth;
                const { name } = req.body;

                const boards = await task.aggregate([{
                    $match: {
                        user_id: new mongoose.Types.ObjectId(_id),
                    }
                }]);

                return res.status(200).json({
                    success: true,
                    message: `Task get successfully`,
                    data: boards
                });
            } catch (err) {
                console.log(err);
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

    delete_task = () => {
        return async (req, res, next) => {
            try {
                const {_id} = req.body.auth;
                const { task_id } = req.body;

                const tasks = await task.deleteOne({ _id: task_id, user_id: _id });

                return res.status(200).json({
                    success: true,
                    message: `Task deleted successfully`
                });
            } catch (err) {
                console.log(err);
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

    update_task = () => {
        return async (req, res, next) => {
            try {
                const {_id} = req.body.auth;
                const { task_id, new_task_board_id } = req.body;

                const tasks = await task.updateOne({ _id: task_id, user_id: _id }, {task_board_id: new_task_board_id});

                return res.status(200).json({
                    success: true,
                    message: `Task updated successfully`
                });
            } catch (err) {
                console.log(err);
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

}

module.exports = new Customer();
