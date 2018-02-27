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
	},
	'/action/createGitProject':{
		data: 'createGitProject',
		type:'GET'
	},
	'/action/upload':{
		data: 'upload',
		type:'POST'
	},
	'/action/getProjects':{
		data: 'getProjects',
		type: 'GET'
	},
	'/action/getProjectGitLogs':{
		data: 'getProjectGitLogs',
		type: 'GET'
	},
	'/action/initProject':{
		data: 'initProject',
		type: 'GET'
	},
	'/action/removeGitProject':{
		data: 'removeGitProject',
		type: 'GET'
	},
	'/mqsas/login':{
		data: 'login',
		type: 'GET'
	},
	'/action/getIpInfos': {
		data: 'ipInfo/getIpInfos',
		type: 'GET'
	},
	'/action/createIpInfo': {
		data: 'ipInfo/createIpInfo',
		type: 'GET'
	},
	'/action/setIpInfo': {
		data: 'ipInfo/setIpInfo',
		type: 'GET'
	}
}

module.exports = route;
