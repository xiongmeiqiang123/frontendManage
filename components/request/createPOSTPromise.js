import request from 'superagent'
import notification from '../note'
import {errorHandle} from './index.js'
// import postErrot from '@@/log'

 export default function createPOSTPromise(url='/mqsas/test1', contentType='form', necessaryQuerys={}) {
    function post(body={},query={}){
        return new Promise((resolve, reject)=>{
            let isWrong = false;
            query = { ...necessaryQuerys, ...query}
            Object.keys(necessaryQuerys).map((key) => {
                if(!query[key]) {
                    console.info('缺少参数：'+ key);
                    isWrong = true;
                }
            })
            if(isWrong) {
                return Promise.reject('缺少参数')
            }
            try {
                request.post(url)
                    .send(body)
                    .query(query)
                    .type(contentType)
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
                             resolve(res.body)
                         }
                })
            } catch (e) {
                reject(null)
            }

        })
   }
   return post;
}
