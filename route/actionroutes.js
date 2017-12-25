const route = {
	'/mock/get/test': {
		type: 'GET',
		data: 'test'
	},
	'/action/start': {
		data: 'start'
	},
	'/action/rewriteServer': {
		data: 'rewriteserver'
	},
	'/action/checkurl': {
		data: 'checkUrl'
	},
	'/action/createmock': {
		data: 'createmock',
		type: 'POST'
	},
	'/action/collecterror': {
		data: 'collecterror',
		type: 'POST'
	},
	'/action/getCurrentInfo': {
		data: 'getCurrentInfo',
		type: 'GET'
	},
	'/action/build':{
		data: 'build',
		type: 'POST'
	},
	'/action/getModules':{
		data: 'getModules',
		type:'GET'
	}
}

module.exports = route;
