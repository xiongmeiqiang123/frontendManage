import {createGETPromise, createPOSTPromise} from 'components/request'

export default {
    getList: createGETPromise('/action/getIpInfos'),
    getCurrentInfo: createGETPromise('/action/getCurrentInfo'),
    rewriteServer: createGETPromise('/action/rewriteServer'),
}
