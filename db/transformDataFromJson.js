const getRoutes = require('../route/get.json')
const postRoutes = require('../route/post.json')
const _ = require ('lodash')
const fs = require('fs')
const path = require('path')

const mongoose = require('mongoose');
const config   = require('./config');
const GETModel = require('./models/GET.js')
const POSTModel = require('./models/POST.js')
mongoose.connect(config.db).then((value) => {
    console.log('mongooose connected！');
})

load(getRoutes, GETModel)
load(postRoutes, POSTModel)
function load(routes, Model) {
    _.each(getRoutes, function(value, name) {
        let dataFormatted;
        try {
            dataFormatted = fs.readFileSync(path.join(__dirname, `../data/${value.data}.json`))
        } catch (e) {
            console.log(e);
            dataFormatted = '{}'
        } finally {

        }
        console.log(dataFormatted);
        let model = new Model({
            url: name,
            data: dataFormatted
        })

        model.save().then((value) => {
            // console.log(value, 'saved');
        })
    });
}
