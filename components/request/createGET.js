import request from 'superagent'
import {endHandle} from './index.js'
/**
 * createGET - description
 *
 * @param  {type} url="/mqsas/test1" description
 * @return {type}                    description
 */
 export default function createGET(url="/mqsas/test1"){

	 function get(query={}, success=()=>{}, error=()=>{}){
		// showLoding();
		request.get(url)
			.query(query)
			.end(endHandle.bind(this, success, error))
	}
  return get;
}
