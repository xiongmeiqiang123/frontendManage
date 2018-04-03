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
	'/actions/login':{
		data: 'login',
		type: 'GET'
	},
	'/action/getIpInfos': {
		data: 'ipInfo/getIpInfos',
		type: 'GET'
	},
	'/action/ping': {
		data: 'ipInfo/ping',
		type: 'GET'
	},
	'/action/createIpInfo': {
		data: 'ipInfo/createIpInfo',
		type: 'POST'
	},
	'/action/updateIpInfo': {
		data: 'ipInfo/update',
		type: 'POST'
	},
	'/action/deleteIpInfo': {
		data: 'ipInfo/delete',
		type: 'POST'
	},
	'/action/projects/get': {
		data: 'projects/get',
		type: 'GET'
	},
	'/action/pvcount': {
		data: 'pvcount',
		type: 'GET'
	},
	'/action/projects/update': {
		data: 'projects/updateById',
		type: 'POST'
	},
}

module.exports = route;
