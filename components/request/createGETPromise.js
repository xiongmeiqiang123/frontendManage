import request from 'superagent'
import notification from '../note'
import {errorHandle} from './index.js'
import queryString from 'query-string'
// import postErrot from '@@/log'
/**
 * createGETPromise - 创建一个返回Promise的get request
 *
 * @param  {type} url='/mqsas/test1' description
 * @return {type}                    description
 */
 export default function createGETPromise(url='/mqsas/test1', necessaryQuerys={}) {
    let query = queryString.parse(window.location.search)
    const {ticket} = query;
    let loginParam = {};
    if(ticket) {
        loginParam = {
            ticket,
            service: window.location.origin + window.location.pathname
        };
    }
    function get(query={}){
        let isWrong = false;
        query = { ...necessaryQuerys, ...query}
        Object.keys(necessaryQuerys).map((key) => {
            if(query[key]  === null) {
                console.info(url + ' 缺少参数：', key);
                isWrong = true;
            }
        })
        if(isWrong) {
            return Promise.reject('缺少参数')
        }

        return new Promise((resolve, reject)=>{
            // showLoding();
            try {
                request.get(url)
                    .query(query)
                    .end((err, res)=>{
                        // hideLoading()
                        if(err){
                            errorHandle(err, res);
                            if(res && res.status === 405) {
                                notification('warning', '请输入完整的参数')
                            }else if(res && res.status === 400){
								// postErrot(`PARAM ERROR : ${res.status}---${res.error.method}--${res.error.url}--${res.statusText}`)
								reject(null)
							}else {
                                notification('error', '网络请求出错！');
                            }
                            reject(null)
                         }else {
                             if(!res.body) {
                                 reject(null)
                                 return;
                             }
                             resolve(res.body)
                         }
                })
            } catch (e) {
                reject(null)
            }

        })
   }
   return get;
}
