import request from 'superagent'
import {endHandle} from './index.js'

/**
 * createPOST - description
 *
 * @param  {type} url = "/mqsas/test1" description
 * @return {type}                      description
 */
export default function createPOST(url = "/mqsas/test1") {

    function post(query = {}, success = () => {}, error = () => {}) {
        // showLoding()
        request.post(url).send(query).end(endHandle.bind(this, success, error))
    }
    return post;
}
