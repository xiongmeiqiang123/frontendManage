const simpleGit = require('simple-git')
const basePath = '../../release';
var shell = require('shelljs');
const path = require('path')
module.exports = function (name, branchName = 'master') {

    const gitPath = path.join(__dirname, `${basePath}/${name}`)
    console.log(`cd ${gitPath} && git checkout ${branchName} && git pull`,"`cd ${gitPath} && git checkout ${branchName} && git pull`");
    shell.exec(`cd ${gitPath} && git checkout ${branchName} && git pull`);

    return new Promise((resolve, reject)=>{
        try {
            const git = simpleGit(gitPath)
            git.log([branchName], (err, log) =>{
                if(log) {
                    resolve(log.all.splice(0, 20))
                }else {
                    reject(0)
                }
            })
        } catch (e) {
            reject(0)
        } finally {

        }
    })

}
