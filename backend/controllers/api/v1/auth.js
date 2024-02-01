"use strict";

const bcrypt = require("bcryptjs");
const config = require("./../../../config");
var mongoose = require("mongoose");
var user = mongoose.model("user");
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

                let token = await jwtSign(JSON.parse(JSON.stringify(user_select)), 365656);

                return res.status(200).json({
                    success: true,
                    message: `Login successfully`,
                    token
                });

            } catch (err) {
                console.log(err);
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

    forgot_password = () => {
        return async (req, res, next) => {
            try {
                const { email, password, otp } = req.body;
                if (email && otp) {
                    const findUser = await user.findOne({ email: email });
                    if (findUser.otpExpiry < new Date()){
                        return res.status(201).json({success: true, message: `OTP expired`});
                    }
                    if (findUser.otp == otp){
                        let new_pass = await bcrypt.hashSync(password);
                        const result = await user.findOneAndUpdate({ email: email },{password: new_pass});
                        return res.status(200).json({success: true, message: "OTP verified successfully, password updated successfully", findUser});
                    }
                    else return res.status(201).json({success: true, message: `wrong OTP`});
                } else {

                    var val = Math.floor(1000 + Math.random() * 9000);
                    const findUser = await user.findOne({ email: email });
                    if (!findUser) return error.sendBadRequest(res, "Account does not exist!");
                    
                    findUser.otp = val;
                    var d = new Date();
                    d.setMinutes(d.getMinutes() + 15);
                    findUser.otpExpiry = d;
                    var subject = "Forgot Password";
                    var html = "";
                    html += `<h1>Forgot Password</h1>`;
                    html += `<br>One Time Password(OTP) to reset the password: ${val}, It will be valid for 15 minutes only`;
                    // var check = await helper.email_sendgrid("", email, subject, html);

                    await findUser.save({ validateBeforeSave: false }).then();
                    return res.status(200).json({success: true, message: "Please check your email for the OTP, Expires in 15 minutes", otp: val});
                    
                }
            } catch (err) {
                console.log(err);
                return error.sendBadRequest(res, "Something went wrong");
            }
        };
    };

}

module.exports = new Customer();
