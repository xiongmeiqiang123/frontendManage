import request from 'superagent'
import notification from '../note'
import {errorHandle} from './index.js'
import {assambleQuery} from '@@/query'
// import postErrot from '@@/log'

window._localRequestData = window._localRequestData  || {};

setInterval(()=>{
    window._localRequestData = {}
}, 1000 * 60 * 10)//每十分钟清除内存
/**
 * createGETPromiseWithStore - 存在全局变量里_localRequestData
 *
 * @param  {type} url='/mqsas/test1' description
 * @return {type}                    description
 */
export default function createGETPromiseWithStore(url='/mqsas/test1', necessaryQuerys={}) {
        function get(query={}){

            let isWrong = false;
            query = { ...necessaryQuerys, ...query}
            Object.keys(necessaryQuerys).map((key) => {

                if(query[key] === null) {
                    console.info(url + '  缺少参数：', key);
                    isWrong = true;
                }
            })
            if(isWrong) {
                return Promise.reject('缺少参数').catch(() => {});
            }

            let queryStr = assambleQuery(query)
            let localData = window._localRequestData[url + queryStr];
            if(localData) {
                return Promise.resolve(localData)
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
                                if(res.status === 405) {
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
                                 window._localRequestData[url + queryStr] = res.body;
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

export function clearLocalStore(url='/mqsas/test1', query={}) {
    let queryStr = assambleQuery(query)
    window._localRequestData[url + queryStr] = null;
    return true;
}
