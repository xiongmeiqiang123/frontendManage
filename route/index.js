const express = require("express");
const _ = require("lodash");
const router = express.Router();
const posts = require("./post.json");
const gets = require("./get.json");
const actionRoutes = require("./actionroutes");
const fs = require('fs')
const path = require('path')
const Db = require('../db/Db.js')
let db = new Db();


router.use(function(req, res, next) {
    console.log("Time:", Date.now());
    console.log("Request URL:", req.originalUrl);
    console.log('Request Type:', req.method);
    next();
});


/**
 * router - 检查数据库是否有响应的mock
 *
 * @param  {type} function(req description
 * @param  {type} res          description
 * @param  {type} next         description
 * @return {type}              description
 */
router.use(function(req, res, next) {
    const {method, _parsedUrl} = req;
    const {pathname} = _parsedUrl;

    db.connect('mqsas').then((db) => {
        db.find(method, {url:pathname}).then((data) => {
            if(data.length){
                res.send( JSON.parse(data[0].data))
            }else {
                next()
            }
        })
    })
});

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
module.exports = router;
