"use strict";

const bcrypt = require("bcryptjs");
const config = require("./../../../config");
var mongoose = require("mongoose");
var user = mongoose.model("user");
// const query = require("./../../../db/mysql.master");
const error = require("./../../../helpers/error");
const { jwtSign } = require("../../../helpers/jwt");

class Customer {
    constructor() { }

    register = () => {
        return async (req, res, next) => {
            try {
                const { name, email, password } = req.body;

                var user_select = await user.findOne({ email: email });
                if (user_select) return error.sendBadRequest(res, "Your email is already registered with us.");

                req.body.role = 1;
                req.body.password = await bcrypt.hashSync(password);

                var new_user = await user.create(req.body);

                return res.status(200).json({
                    success: true,
                    message: `Registered successfully`
                });

                // if (user.length) return error.sendBadRequest(res, "Your email is already registered with us.");
                // return error.sendBadRequest(res, "Registered failed"); 
            } catch (err) {
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };


    login = () => {
        return async (req, res, next) => {
            try {
                const { email, password } = req.body;
                var user_select = await user.findOne({ email: email });
                if (!user_select) {
                    return error.sendBadRequest(res, "User does not exists");
                }
                if (user_select.status == 2) {
                    return error.sendBadRequest(res, "Account does not exist");
                }
                if (user_select.status == 3) {
                    return error.sendBadRequest(res, "Account does not exist");
                }

                var result2 = await bcrypt.compare(req.body.password, user_select.password);
                if (!result2) {
                    return error.sendBadRequest(res, "wrong password");
                }
                
                console.log(user_select, "---------user_select");

                // let payload = JSON.parse(JSON.stringify(user[0]))
                // let token = await jwtSign(payload, 365656);

                // return res.status(200).json({
                //     success: true,
                //     message: `Login successfully`,
                //     token
                // });

            } catch (err) {
                console.log(err);
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

}

module.exports = new Customer();
