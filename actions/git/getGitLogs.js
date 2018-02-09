const simpleGit = require('simple-git')
const basePath = '../../release';
const path = require('path')
module.exports = function (name) {

    const gitPath = path.join(__dirname, `${basePath}/${name}`)

    return new Promise((resolve, reject)=>{
        try {
            const git = simpleGit(gitPath)
            git.log((err, log) =>{
                resolve(log.all.splice(0, 20))
            })
        } catch (e) {
            reject(0)
        } finally {

        }
    })

}
