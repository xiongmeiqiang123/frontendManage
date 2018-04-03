import {createGETPromise, createPOSTPromise} from 'components/request'

export default {
    getList: createGETPromise('/action/getIpInfos'),
    delete: createPOSTPromise('/action/deleteIpInfo'),
    update: createPOSTPromise('/action/updateIpInfo'),
    add: createPOSTPromise('/action/createIpInfo'),
    getCurrentInfo: createGETPromise('/action/getCurrentInfo'),
    rewriteServer: createGETPromise('/action/rewriteServer'),
    ping: createGETPromise('/action/ping')
}
