const fs = require('fs');
const shell = require('shelljs');
const path = require('path')
const colors = require('../conf/colors')
const GETModel = require('../db/models/GET.js')
const POSTModel = require('../db/models/POST.js')
// const Db = require('../db/Db.js')
// const db = new Db()

module.exports = function(req, res, next) {
	let params = req.body;
	const {
		url,
		data,
		type
	} = params;

	let _url = url.split('?')[0];

	if(!url.match(/^\//)) { //如果不是以 / 开头则加上
		_url = '/' + _url;
	}

	let Model = type === 'GET' ? GETModel : POSTModel;
	Model.find({url: _url}).then((FoundData) => {
		if(FoundData.length) {
			Model.update( {url: _url}, {data:JSON.stringify(data)}).then((value) => {
					res.send({
						status: true,
						message: '创建成功'
					})
			})
		}else {
			Model.create({url: _url, data:JSON.stringify(data)}).then((value) => {
				console.log(value);
					res.send({
						status: true,
						message: '创建成功'
					})
			})
		}
	})

}
