import request from 'superagent'
import { Notification } from 'element-ui'
// import { Message } from 'element-ui'

const ip = ''
function formatUrl (url) {
  return ip + url
}
const notification = function (type = 'success', title = '成功') {
  Notification({
    type,
    title
  })
}

// const message = function () {
//   Message({
//
//   })
// }

window.isShowLoading = false
// message.config({top: 400, duration: 2})

const stateCode = {
  FORBIDDEN: 800,
  NOAUTH: 801,
  UNLOGIN: 302
}

const loginUrl = `https://cas.mioffice.cn/login?service=${encodeURI(window.location.href)}`

function errorHandle (err, res = {}, callback = f => f) {
  if (err.crossDomain || res.statusCode === stateCode.UNLOGIN) {
    window.location.href = loginUrl
    return
  }
  // return
  if (res.status === stateCode.FORBIDDEN) {
      // 没有登录
    // console.log('test unlogin')
    if (window.noPermission) {
      return
    }
    window.alert('请发邮件至 yuanhao@xiaomi.com 开通访问权限！')
    window.noPermission = true
    window.location.href = '/mqsas/index.html'
    // postErrot('No Permisstion')
    // throw Error('No Permisstion')
    return
  }

  if (res.status === stateCode.NOAUTH) {
    notification('error', '没有操作权限，如有问题，请发邮件至 yuanhao@xiaomi.com')
    // postErrot('No Permisstion')
    // throw Error('No Permisstion')
    return
  }

  if (res.status === 'false' && res.code === '403') {
    notification('warning', '没有操作权限')
    return
  }

  // postErrot(`HTTP ERROR : ${res.status}---${res.error.method}--${res.error.url}`)
  callback(res)
  return true
}

function endHandle (success = f => f, error = f => f, err, res, status) {
  hideLoading()
  if (err) {
    errorHandle(err, res)
    notification('error', '网络请求出错！')
    return error(err)
  }
  success(res.body)
}

export function createPOST (url = '/mqsas/test1') {
  function post (query = {}, success = () => {}, error = () => {}) {
    showLoding()
    request.post(url).send(query).end(endHandle.bind(this, success, error))
  }
  return post
}

export function createFormPOST (url = '/mqsas/test1') {
  function fromPOST (query = {}, success = () => {}, error = () => {}) {
    showLoding()
    request.post(url).type('form').send(query).end(endHandle.bind(this, success, error))
  }
  return fromPOST
}

export function createGET (url = '/mqsas/test1') {
  function get (query = {}, success = () => {}, error = () => {}) {
    showLoding()
    request.get(url).query(query).end(endHandle.bind(this, success, error))
  }
  return get
}

export function createGETPromise (url = '/mqsas/test1') {
  url = formatUrl(url)
  function get (query = {}) {
    return new Promise((resolve, reject) => {
      showLoding()
      try {
        request.get(url).query(query).end((err, res) => {
          hideLoading()
          if (err) {
            errorHandle(err, res)
            if (res.status === 405) {
              notification('warning', '请输入完整的参数')
            } else {
              notification('error', '网络请求出错！')
            }
            reject(null)
          } else {
            resolve(res.body)
          }
        })
      } catch (e) {
        reject(null)
      }
    })
  }
  return get
}

export function createPOSTPromise (url = '/mqsas/test1', contentType = 'form') {
  function post (body = {}, query = {}) {
    return new Promise((resolve, reject) => {
      showLoding()
      try {
        request.post(url).send(body).query(query).type(contentType).end((err, res) => {
          hideLoading()
          if (err) {
            errorHandle(err, res)
            if (res.status === 405) {
              notification('warning', '请输入完整的参数')
            } else {
              notification('error', '网络请求出错！')
            }
            reject(null)
          } else {
            resolve(res.body)
          }
        })
      } catch (e) {
        reject(null)
      }
    })
  }
  return post
}

function showLoding () {
  if (!window.isShowLoading) {
    // message.loading('数据加载中……', 0)
    window.isShowLoading = true
  }
}

function hideLoading () {
  if (window.isShowLoading) {
    // message.destroy()
    window.isShowLoading = false
  }
}
