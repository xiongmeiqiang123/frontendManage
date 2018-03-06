import {createGETPromise, createPOSTPromise} from 'components/request'

export default {
    login: createGETPromise('/actions/login')
}
