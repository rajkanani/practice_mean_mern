'use strict'

/**
 * import required files and define static constants
 * 
 * @author Raj Kanani
**/
const express                           = require('express');
const routes                            = express.Router();
const {check, query, oneOf}             = require('express-validator');

const {asyncHandler}                    = require("../../../helpers/common");
const authController                    = require('./../../../controllers/api/v1/auth');
const {jwtVerify}                       = require("../../../helpers/jwt");





routes.post('/register', [
    check('email').notEmpty().withMessage('Email is required').trim().isEmail().withMessage('Invalid email Address').toLowerCase(),
    check('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('password must be 8 characters'),
    check('name').optional()
],  asyncHandler(authController.register()));


routes.post('/login', [
    check('email').notEmpty().withMessage('Email is required').trim().isEmail().withMessage('Invalid email Address').toLowerCase(),
    check('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('password must be 8 characters')
],  asyncHandler(authController.login()));

routes.post('/forgot-password', [
    check('email').notEmpty().withMessage('Email is required').trim().isEmail().withMessage('Invalid email Address').toLowerCase()
],  asyncHandler(authController.forgot_password()));

routes.post('/reset-password', [
    check('email').notEmpty().withMessage('Email is required').trim().isEmail().withMessage('Invalid email Address').toLowerCase(),
    check('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('password must be 8 characters'),
    check('old_password').notEmpty().withMessage('old password is required').isLength({min:8}).withMessage('old password must be 8 characters')
],  asyncHandler(authController.reset_password()));

module.exports = routes;