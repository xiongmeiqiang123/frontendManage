const express = require("express");
const _ = require("lodash");
const router = express.Router();
const posts = require("./post.json");
const gets = require("./get.json");
const actionRoutes = require("./actionroutes");
const fs = require('fs')
const path = require('path')

router.use(function(req, res, next) {
    console.log("Time:", Date.now());
    console.log("Request URL:", req.originalUrl);
    console.log('Request Type:', req.method);
    next();
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

_.each(posts, function(value, name) {
    router.post(name, function(req, res) {
        let dataFormatted = JSON.parse(
            fs.readFileSync(path.join(__dirname, `../data/${value.data}.json`))
        );
        let text;
        try {
            text = Mock.mock(dataFormatted);
        } catch (e) {
            text = dataFormatted;
        } finally {
        }
        res.send(text);
    });
});

_.each(gets, function(value, name) {
    router.get(name, function(req, res) {
        let dataFormatted = JSON.parse(
            fs.readFileSync(path.join(__dirname, `../data/${value.data}.json`))
        );
        let text;
        try {
            text = Mock.mock(dataFormatted);
        } catch (e) {
            text = dataFormatted;
        } finally {
        }
        res.send(text);
    });
});

module.exports = router;
