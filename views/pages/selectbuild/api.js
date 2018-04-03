import {createGETPromise, createPOSTPromise} from 'components/request'

export default {
    getProjectGitLogs: createGETPromise('/action/getProjectGitLogs'),
    getModules: createGETPromise('/action/getModules'),
    build: createPOSTPromise('/action/build', 'json'),
    getProjects: createGETPromise('/action/projects/get'),
    updateProject: createGETPromise('/action/projects/update'),
}
