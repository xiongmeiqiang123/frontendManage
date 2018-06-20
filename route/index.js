const express = require("express");
const _ = require("lodash");
const router = express.Router();
const actionRoutes = require("./actionroutes");
const fs = require('fs')
const path = require('path')
const mockRoute = require('./middleware/mockRoute.js')
const checklogin = require("./middleware/login.js");
const login = require('../actions/login.js')
router.use(function(req, res, next) {
    console.log("Time:", Date.now());
    console.log("Request URL:", req.originalUrl);
    console.log('Request Type:', req.method);
    next();
});
let db = require('../db/models')

async function init() {

    /**
     * router - 检查数据库是否有响应的mock
     */

     await db.then((value) => {
         router.use(mockRoute);
     }).catch((err) => {
         console.log(err);
         console.log('mock数据库连接失败', '------------');
     })

    router.use(checklogin)

    _.map(actionRoutes, (value, name) => {
        if (value.type === "POST" || value.type === "post") {
            router.post(
                name,
                function(req, res, next) {
                    const action = require("../actions/" + value.data);
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

    router.post('/actions/login', login)
}

init();

module.exports = router;
