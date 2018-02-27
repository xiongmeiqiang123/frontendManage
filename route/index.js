const express = require("express");
const _ = require("lodash");
const router = express.Router();
const posts = require("./post.json");
const gets = require("./get.json");
const actionRoutes = require("./actionroutes");
const fs = require('fs')
const path = require('path')
const mockRoute = require('./middleware/mockRoute.js')


router.use(function(req, res, next) {
    console.log("Time:", Date.now());
    console.log("Request URL:", req.originalUrl);
    console.log('Request Type:', req.method);
    next();
});

/**
 * router - 检查数据库是否有响应的mock
 */
 let db = require('../db/models')
 db.then((value) => {
     router.use(mockRoute);
 }).catch((err) => {
     console.log(err);
     console.log('mock数据库连接失败', '------------');
 })



_.map(actionRoutes, (value, name) => {
    if (value.type === "POST" || value.type === "post") {
        router.post(
            name,
            function(req, res, next) {
                const action = require("../actions/" + value.data);
                console.log(action, 'action');
                action(req, res, next);
            },
            function(req, res, next) {
                // console.log(req, 'next')
            }
        );
    } else {
        router.get(
            name,
            function(req, res, next) {
                const action = require("../actions/" + value.data);
                action(req, res, next);
            },
            function(req, res, next) {
                // console.log(req, 'next')
            }
        );
    }
});
module.exports = router;
