<template>
<div id="build">

    <div>
        <h2 v-if='isLastSuccessed !== undefined' :style='isLastSuccessed? "color: green;" :"color: red;"'>
            上次打包结果：　{{ isLastSuccessed === true ? '成功':"失败" }}
            <div>时间：　{{lastBuildTime}}</div>
        </h2>
        <el-card   class="project" v-for="project in gitProjects" :key="project.git">

            <div   v-if="project.name ==='miui-sys-front-for-build'">
                <h3 >{{project.name}} -- 开发分支： {{project.devBranch}}</h3>
                <el-select
                    v-model="checkedModules"
                    multiple
                    filterable
                    remote
                    style="width:800px;"
                    reserve-keyword
                    placeholder="请输入关键词"
                    :loading="loading">
                    <el-option
                      v-for="item in project.modules"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>

                <el-button
                    :disabled="isBuiding || !checkedModules.length"
                    type='primary'
                    :loading="current === project.name"
                    @click.native="selectBuild(checkedModules.join('##'), project)">构建打包</el-button>

            </div >


            <div v-if="project.name !=='miui-sys-front-for-build'">
                <h3  >{{project.name}} -- 开发分支： {{project.devBranch}}</h3>
                <el-button key='item.name'
                    :loading="current === project.name"
                    :disabled="isBuiding"
                    @click.native="selectBuild('admin', project)">构建打包</el-button>

            </div>

            <div class='gitLogs'>
                <label for="">当前git log：</label>
                <el-select :value='project.currentRelease ||　""'  :loading='getProjectInfo(project,"loadingLog")' loading-text='正在加载'>
                    <el-option  v-for="log in (logMap[project.name] && logMap[project.name].data)" :value="log.hash" :label='log.message'></el-option>
                </el-select>
                <el-button  :loading='getProjectInfo(project,"loadingLog")'
                     :disabled='getProjectInfo(project,"loadingLog")'
                     @click="getProjectGitLogs(project)">获取/刷新</el-button>

                <span>
                    加载时间：{{ getProjectInfo(project,"logTime") }}
                </span>
            </div>
        </el-card >

    </div>

</div>
</template>

<script>
import api from './api.js'
import modules from 'conf/modules.js'
import moment from 'moment'
// import gitProjects from 'conf/gitProjects'

export default {
    name: 'select-build',
    data() {
        return {
            isLastSuccessed: undefined,
            checkedModules:[],
            isBuiding:false,
            modules:[],
            current: null,
            gitProjects:[],
            loading:false,
            loadingLog:false,
            lastBuildTime: new Date(),
            logTime: new Date(),
            logMap:{

            }
        }
    },
    created() {
        api.getProjects().then(res=>{
            if(res.status) {
                this.gitProjects = res.data;
                // this.getProjectGitLogs();
            }else {

            }
        })
        api.getModules().then(res=>{
            if(res.status) {
                this.modules = res.data
            }else {

            }
        })
        // this.timer =  setInterval(()=>{
        //     this.getProjectGitLogs()
        // }, 1000 * 60)
    },
    destroyed() {
      //do something after destroying vue instance
      //
      console.log('destroying');
      clearInterval(this.timer)
  },
    methods: {
        async getProjectGitLogs (currentProject ={}){
            this.logMap = Object.assign({}, this.logMap, {[currentProject.name]: {data: [], loadingLog:true}})
            const logTime = moment().format('YYYY/MM/DD HH:MM:SS');
            let data = await api.getProjectGitLogs(currentProject).then((res) => {
                if(res.status) {
                    this.logMap = Object.assign({}, this.logMap, {[currentProject.name]: {data: res.data,  logTime, loadingLog:false}})
                    return res.data
                }
            })
            // this.loadingLog = false
        },
        getProjectInfo(project = {}, name){
            return this.logMap[project.name] && this.logMap[project.name][name]
        },
        selectBuild(module, project){
            this.isBuiding = true;
            this.current = project.name
            this.$message('正在打包模块－－' + module);
            api.build({module, project}).then(res=>{
                this.isBuiding = false;
                this.current = null
                if(res.status) {
                    this.$notify({
                        type: 'success',
                        message: '打包成功！'
                    })
                    this.isLastSuccessed = true
                    this.lastBuildTime = new Date()
                    console.log('打包成功！',　module)
                }else {
                    this.$notify({
                        type: 'error',
                        message: '失败'
                    })
                    this.isLastSuccessed = false
                    this.lastBuildTime = new Date()
                    console.error('打包失败', module)
                }
            }).catch(e=>{
                this.isLastSuccessed = true
                    this.lastBuildTime = new Date()
            })
        }
    }
}
</script>

<style>
.title {
    text-align: center;
}

.current {
    margin: 20px;
}
.gitLogs{
    margin: 10px;
}
.project{
    margin:10px;
    padding: 10px;
    border-bottom: solid thin #ebebeb;
}
</style>
