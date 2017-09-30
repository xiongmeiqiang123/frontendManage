var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors')

let restart = ' nginx -s reload',
	open = 'nginx'

const ipsConf = require('../conf/ips.js')
const ips = ipsConf.map((item) => ({[item.key]: item.ip}))
let ipsMap = {}
ips.map((item) => {
	Object.assign(ipsMap, item)
})
console.log(ipsMap);
let servers = [
	{
		listen: 80,
		locations: [
			{
				path: '/',
				proxy_pass: 'http://127.0.0.1:3000'
			},{
				path: '~ ^/(myDeviceCloundNew|mqsas|mqsasdata|mqsasABTest|knowledge|whiteList|mqsasback|test1|myDeviceClound)/',
				using: 'mqsas',//
				proxy_passes: ipsMap
			}
		]
	 }
]

function  assemble(servers=[], using="mqsas") {
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
	let query = req.query;
	let proxy_pass = query.using || 'mqsas'
	fs.writeFile("server", assemble(servers, proxy_pass), (err, result)=>{
		console.log('restart ngix'.error)
		let resultCode = exec(restart);
		if(resultCode !== 0) {
			res.send({status: false})
		}else {
			res.send({status: true})
		}
	});
	return ;
}
