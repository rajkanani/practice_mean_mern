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

routes.post('/get-task-board', [
    jwtVerify,
],  asyncHandler(taskController.get_task_board()));

routes.post('/delete-task-board', [
    jwtVerify,
    check('task_board_id').notEmpty().withMessage('task_board_id is required'),
],  asyncHandler(taskController.delete_task_board()));

routes.post('/create-task', [
    jwtVerify,
    check('name').notEmpty().withMessage('name is required').trim().toLowerCase(),
    check('task_board_id').notEmpty().withMessage('task_board_id is required'),
    check('description').optional()
],  asyncHandler(taskController.create_task()));

routes.post('/get-task', [
    jwtVerify,
],  asyncHandler(taskController.get_task()));

routes.post('/delete-task', [
    jwtVerify,
    check('task_id').notEmpty().withMessage('task_id is required'),
],  asyncHandler(taskController.delete_task()));

routes.post('/update-task', [
    jwtVerify,
    check('task_id').notEmpty().withMessage('task_id is required'),
    check('new_task_board_id').notEmpty().withMessage('new_task_board_id is required')
],  asyncHandler(taskController.update_task()));


module.exports = routes;