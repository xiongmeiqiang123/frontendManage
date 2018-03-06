import request from 'superagent'
import notification from '../note'
// import {message} from 'antd';
// import createGETPromiseWithStore from './createGETPromiseWithStore.js'
import createGETPromise from './createGETPromise.js'
import createPOSTPromise from './createPOSTPromise.js'
import createFormPOST from './createFormPOST.js'
import createGET from './createGET.js'
import createPOST from './createPOST.js'
// import postErrot from 'components/log'
import {saveLashHash} from './storeBeforeLogin'
import isOnline from 'components/isonline'
window.isShowLoading = false;
window.currentRequst = {}

// message.config({top: 400, duration: 2});

const stateCode = {
    FORBIDDEN: 800,
    NOAUTH: 801,
    UNLOGIN: 302
}

const loginUrl = isOnline ? `https://cas.mioffice.cn/login?service=${encodeURI(window.location.origin + window.location.pathname)}` :
`https://casdev.mioffice.cn/login?service=${encodeURI(window.location.origin + window.location.pathname)}` ;

/**
  * errorHandle - description
  *
  * @param  {type} err           description
  * @param  {type} res={}        description
  * @param  {type} callback=f=>f description
  * @return {type}               description
  */
let count = 0;
function errorHandle(err, res = {}, callback = f => f) {
    let matchTicket = window.location.search.match(/\?ticket\=(.*)/);
    if(matchTicket) {
        //createGETPromise('/mqsas/ops/userLoginStatus/getUserName.do')()
        return;
    }

    // console.log(err.crossDomain, res.statusCode);
    if (err.crossDomain || res.statusCode === stateCode.UNLOGIN) {
        count++
        saveLashHash()//保存登录前的路径
        if(count>1) {
            return;
        }
        window.location.href = loginUrl;
        return;
    }
    // return;
    if (res.status === stateCode.FORBIDDEN) { //没有登录
        // console.log('test unlogin');
        if (window.noPermission) {
            return;
        }
        window.alert('请发邮件至 yuanhao@xiaomi.com 开通访问权限！');
        window.noPermission = true;
        window.location.href = '/mqsas/index.html';
        postErrot('No Permisstion')
        // throw Error('No Permisstion')
        return;
    }

    if (res.status === stateCode.NOAUTH) {
        notification('error', '没有操作权限，如有问题，请发邮件至 yuanhao@xiaomi.com')
        postErrot('No Permisstion')
        // throw Error('No Permisstion')
        return;
    }

    if (res.status === 'false' && res.code === '403') {
        notification('warning', '没有操作权限')
        return;
    }

    postErrot(`HTTP ERROR : ${res.status}---${res.error.method}--${res.error.url}`)
    callback(res);
    return true;
}

/**
 * anonymous function - description
 *
 * @param  {type} success=f=>f description
 * @param  {type} error=f=>f   description
 * @param  {type} err          description
 * @param  {type} res          description
 * @param  {type} status       description
 * @return {type}              description
 */
export function endHandle(success = f => f, error = f => f, err, res, status) {
    // hideLoading();
    if (err) {
        errorHandle(err, res);
		if(res && res.status === 405) {
			notification('warning', '请输入完整的参数');
		}else if(res && res.status === 400){
			// postErrot(`PARAM ERROR : ${res.status}---${res.error.method}--${res.error.url}--${res.statusText}`)
		}else {
			notification('error', '网络请求出错！');
		}
		return error(err)
        // notification('error', '网络请求出错！');
        // return error(err)
    }
    if (!res.body) {
        notification('error', '后端返回数据出错');
        return false;
    }
    success(res.body)
}


function showLoding() {
    if (!window.isShowLoading) {
        // message.loading('数据加载中……', 0);
        window.isShowLoading = true;
    }
}

function hideLoading() {
    if (window.isShowLoading) {
        // message.destroy();
        window.isShowLoading = false;
    }
}

export {
    errorHandle,
    createPOST,
    createFormPOST,
    createGET,
    createGETPromise,
    createPOSTPromise,
    // createGETPromiseWithStore
}
