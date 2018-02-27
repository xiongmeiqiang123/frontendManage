const ips = require('../conf/ips.js')
const frontIps = require('../conf/frontProjects.js')
const _ = require ('lodash')
const fs = require('fs')
const path = require('path')

const mongoose = require('mongoose');
const config   = require('./config');
const IpInfo = require('./models/ipInfo.js')

mongoose.connect(config.db).then((value) => {
    console.log('mongooose connected！');
})

// ips.map(item => {
//     let ipModel = new IpInfo({
//         name:item.name,
//         ip: item.ip.match(/http:\/\/.*\.\w+/)[0].split('http://')[1],
//         port: item.ip.match(/\:\d+/) ? item.ip.match(/\:\d+/)[0].split(':')[1] : 80,
//         key: item.key,
//         isFront: false
//     })
//
//     ipModel.save()
// })
// frontIps.map(item => {
//     let ipModel = new IpInfo({
//         name:item.name,
//         ip: '120.0.0.1',
//         port: item.ip.match(/\:\d+/) ? item.ip.match(/\:\d+/)[0].split(':')[1] : 80,
//         key: item.key,
//         isFront: true
//     })
//
//     ipModel.save()
// })
