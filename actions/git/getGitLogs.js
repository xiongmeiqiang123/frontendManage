const simpleGit = require('simple-git')
const basePath = '../../release';
var shell = require('shelljs');
const path = require('path')
module.exports = function (name) {

    const gitPath = path.join(__dirname, `${basePath}/${name}`)
    shell.exec(`cd ${gitPath} && git checkout master && git pull`);

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
