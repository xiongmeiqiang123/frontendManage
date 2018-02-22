const getRoutes = require('../route/get.json')
const postRoutes = require('../route/post.json')
const fs = require('fs')
const path = require('path')

const _ = require ('lodash')
const Db = require ('./Db.js')

const db = new Db()
db.connect('mqsas').then((db) => {
    _.each(postRoutes, function(value, name) {
        let dataFormatted;
        try {
            dataFormatted =  JSON.parse(
                fs.readFileSync(path.join(__dirname, `../data/${value.data}.json`))
            );
        } catch (e) {
            console.log(e,'test');
            dataFormatted = {}
        } finally {

        }
        db.insert("POST", {
            url: name,
            data: dataFormatted
        })
    });
    _.each(getRoutes, function(value, name) {

        try {
            dataFormatted =  JSON.parse(
                fs.readFileSync(path.join(__dirname, `../data/${value.data}.json`))
            );
        } catch (e) {
            dataFormatted = {}
        } finally {

        }
        db.insert("GET", {
            url: name,
            data: dataFormatted
        })
    });


    db.find("POST", {}).then((value) => {
        console.log(value.length);
    })
})
