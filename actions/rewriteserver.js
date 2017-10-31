var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors')
var path = require('path')
let restart = ' nginx -s reload',
	open = 'nginx'

const ipsConf = require('../conf/ips.js')
const ips = ipsConf.map((item) => ({[item.key]: item.ip}))

const frontProjects = require('../conf/frontProjects.js')
const frontIps =  frontProjects.map((item) => ({[item.key]: item.ip}))

let ipsMap = {}
ips.map((item) => {
	Object.assign(ipsMap, item)
})

let frontIpsMap = {}
frontIps.map((item) => {
	Object.assign(frontIpsMap, item)
})
// console.log(ipsMap);
let servers = [
	{
		listen: 80,
		locations: [
			{
				path: '~ ^/mqsas(.*).(gif|jpg|png|js|css|html)$',
				using:'mqsas',
				type: 'front',
				proxy_passes: frontIpsMap
			},{
				path: '~ ^/(myDeviceCloundNew|mqsas|mqsasdata|mqsasABTest|knowledge|whiteList|mqsasback|test1|myDeviceClound|conf)/',
				using: 'mqsas',//
				type: 'mock',
				proxy_passes: ipsMap
			}
		]
	 }
]

function  assemble(servers=[], data={}) {

	var mock = data.mock || 'mqsas';
	var front = data.front || 'mqsas';

	return servers.map((server)=>{ //servers解析
		let locations = server.locations || [];

		return `
server {
	listen ${server.listen};
	server_name  localhost www.localhost admin www.admin;
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
	return shell.exec(command).code;
}

exports.route = '/action/rewriteServer'
module.exports = function rewriteServer(req, res, next) {

	//获取参数
	let query = req.query;


	fs.readFile(path.join(__dirname, '../conf/currentData.json'), function(err, result) {
		var data = {}
		try {
			data = JSON.parse(result.toString());
		} catch (e) {

		} finally {

		}
		var front = data.front || 'mqsas';
		var mock = data.mock || 'mqsas';


		data = Object.assign({}, data, query)
		fs.writeFile(path.join(__dirname, '../conf/currentData.json'), JSON.stringify(data), function (err, result) {

		})

		let proxy_pass = data.mock;
		fs.writeFile("server", assemble(servers, data), (err, result)=>{
			console.log('restart ngix'.error)
			let resultCode = exec(restart);
			if(resultCode !== 0) {
				res.send({status: false})
			}else {
				res.send({status: true})
			}
		});
	})



	// return ;
}
