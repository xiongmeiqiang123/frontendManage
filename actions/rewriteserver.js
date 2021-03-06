var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors')
var path = require('path')
let restart = ' nginx -s reload',
	open = 'nginx'
	var Base64 = require('js-base64').Base64;
const IpInfo = require('../db/models/ipInfo.js')

const ipsConf = require('../conf/ips.js')
const ips = ipsConf.map((item) => ({[item.key]: item.ip}))

// console.log(ipsMap);


function  assemble(servers=[], data={}, frontIpsMap) {
	var mock = data.mock || 'mqsas';
	var front = data.front || 'mqsas';

	return servers.map((server)=>{ //servers解析
		let locations = server.locations || [];

		return `
server {
	listen ${server.listen};
	server_name  localhost www.localhost admin www.admin;

	proxy_set_header Cookie $http_cookie;
	proxy_cookie_domain domino.server nginx.server;

	proxy_set_header backdoor sys;

	
	${
		locations.map((location)=>{//locations解析
			let proxy_passes = location.proxy_passes || {};
			let using = location.type === 'front' ? front : mock;
			let proxy_pass = proxy_passes[using] || location.proxy_pass;

			console.log(`${location.path} `.debug +`is using: ` + `${using} -- ${proxy_pass}`.warn)

			return `
	location  ${location.path} {
		client_max_body_size    1000m;
		proxy_read_timeout 10000s;
		proxy_pass ${proxy_pass};
	}
			`
		}).join(' ')
	}
}
			`
	}).join(' ')

}

function exec(command='say hello') {
	return shell.exec(command)
}

exports.route = '/action/rewriteServer'
module.exports = async function asyncrewriteServer(req, res, next) {

	let data = await IpInfo.find({});

	const ips = data.filter(item=>!item.isFront).map((item) => ({[item.id]: `http://${item.ip}:${item.port}`}))
	const frontIps =  data.filter(item=>item.isFront).map((item) => ({[item.id]: `http://${item.ip}:${item.port}`}))
	console.log(frontIps,'frontIps');
	console.log(ips,'ips');
	let frontIpsMap = {}
	frontIps.map((item) => {
		Object.assign(frontIpsMap, item)
	})
	let ipsMap = {}
	ips.map((item) => {
		Object.assign(ipsMap, item)
	})
	let locations = []
	if(frontIps.length) {
		locations.push({
			path: '~ ^/(.*).(gif|jpg|png|js|css|html|svg)$',
			using:'mqsas',
			type: 'front',
			proxy_passes: frontIpsMap
		})
	}
	if(ips.length) {
		locations.push({
			path: '/',
			using: 'mqsas',//
			type: 'mock',
			proxy_passes: ipsMap
		})
	}
	let servers = [
		{
			listen: 80,
			locations: locations
		 }
	]

	//获取参数
	let query = req.query;


	fs.readFile(path.join(__dirname, '../conf/currentData.json'), function(err, result) {
		var data = {}
		try {
			data = JSON.parse(result.toString());
		} catch (e) {

		} finally {

		}

		data = Object.assign({}, data, query)
		if(!query.pwd) {
			return res.send({status: false, msg: '需要sudo权限'})
		}
		let pwd = Base64.decode(query.pwd)
		fs.writeFile(path.join(__dirname, '../conf/currentData.json'), JSON.stringify(data), function (err, result) {})
		fs.writeFile("server", assemble(servers, data, frontIpsMap), (err)=>{
			console.log('restart nginx'.error, 'pwd', pwd);
			let result = exec(`echo ${pwd} | sudo -S  nginx -s reload`);
			console.log(result);
			
			if(result.code !== 0) {
				console.log('restart nginx'.error, result)
				res.send({status: false, msg: result.stderr})
			}else {
				res.send({status: true})

			}
		});
	})



	// return ;
}
