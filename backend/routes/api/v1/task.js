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
const taskController                    = require('./../../../controllers/api/v1/task');
const {jwtVerify}                       = require("../../../helpers/jwt");





routes.post('/create-task-board', [
    jwtVerify,
    check('name').notEmpty().withMessage('Email is required').trim().toLowerCase(),
    check('description').optional()
],  asyncHandler(taskController.create_task_board()));

routes.post('/create-task', [
    jwtVerify,
    check('name').notEmpty().withMessage('Email is required').trim().toLowerCase(),
    check('description').optional()
],  asyncHandler(taskController.create_task()));


module.exports = routes;