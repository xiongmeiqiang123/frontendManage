import {createGETPromise, createPOSTPromise} from '@@/request'

export default {
    getPages: createGETPromise('/action/mock/getpages', {
        moduleId: String
    }),
    deletePage: createPOSTPromise('/action/mock/deletepage', {
        id: {
            type: String,
            isRequired: true
        }
    }),
    updatePage: createPOSTPromise('/action/mock/addpage', {
        id: {
            type: String,
            isRequired: true
        },
        url: String,
        name: String,
        note: String,
        team: Array,
        query: Array
    }),
    addPage: createPOSTPromise('/action/mock/addpage', {
        url: String,
        name: String,
        note: String,
        team: Array,
        query: Array
    }),
}
