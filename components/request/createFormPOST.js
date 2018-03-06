import request from 'superagent'
import {endHandle} from './index.js'

export default function createFormPOST(url="/mqsas/test1"){

   function fromPOST(query={}, success=()=>{}, error=()=>{}){
       // showLoding()
       request.post(url)
           .type('form')
           .send(query)
           .end(endHandle.bind(this, success, error))
   }
 return fromPOST;
}
