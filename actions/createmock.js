const fs = require('fs');
const shell = require('shelljs');
const path = require('path')
const colors = require('../conf/colors')
const Db = require('../db/Db.js')
const getRoutes = require('../route/get.json')
const postRoutes = require('../route/post.json')
const db = new Db()

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

	let routes = type === 'GET' ? getRoutes: postRoutes;
	db.connect('mqsas').then(async (db) => {
		let FoundData = await db.find(type, {url:_url})
		console.log(FoundData, 'FoundData');
		if(FoundData.length) {
			db.update(type, {url: _url}, {$set: {data:JSON.stringify(data)}}).then((value) => {
					res.send({
						status: true,
						message: '创建成功'
					})
			})
		}else {
			db.insert(type, {url: _url, data:JSON.stringify(data)}).then((value) => {
					res.send({
						status: true,
						message: '创建成功'
					})
			})
		}
	});
	// writeRoute(type, _url, routes, data, (err, result) => {
	// 	if(err) {
	// 		res.send({
	// 			status: false,
	// 			message: '创建失败'
	// 		});
	//
	// 		return;
	// 	}
	// 	res.send({
	// 		status: true,
	// 		message: '创建成功'
	// 	})
	// 	setTimeout(function () {
	// 		process.exit(1);
	// 	})
	// })
}

function writeRoute(type = 'GET', url, routes = {}, data = {}, callback) {

	let name = url.toLowerCase().split(/[\/\.]/).join(''); //mock文件名
	routes[url] = {
		data: name
	};

	fs.writeFile(path.join(__dirname, '../route/' + (type === 'GET' ? 'get' : 'post') + '.json'), JSON.stringify(routes,null, 4), (err, result) => {
		if (err) {
			callback(err, result);
			return;
		}
	});
}
