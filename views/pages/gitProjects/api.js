import {createGETPromise, createPOSTPromise} from 'components/request'

export default {
    getProjectGitLogs: createGETPromise('/action/getProjectGitLogs'),
    getProjects: createGETPromise('/action/getProjects'),
    initProject: createGETPromise('/action/initProject'),
}