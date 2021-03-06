import {createGETPromise, createPOSTPromise} from 'components/request'

export default {
    getProjectGitLogs: createGETPromise('/action/getProjectGitLogs'),
    getProjects: createGETPromise('/action/projects/get'),
    initProject: createGETPromise('/action/initProject'),
    removeGitProject: createGETPromise('/action/removeGitProject'),
    release: createGETPromise('/action/release'),
    add: createPOSTPromise('/action/projects/add'),
    remove: createPOSTPromise('/action/projects/remove'),
    update: createPOSTPromise('/action/projects/update'),
}
