import {createGETPromise, createPOSTPromise} from 'components/request'

export default {
    getProjects: createGETPromise('/action/projects/get')
}
