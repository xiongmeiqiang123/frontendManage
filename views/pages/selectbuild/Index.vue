<template>
<div id="build">

    <div>

        <el-card   class="project" v-for="project in gitProjects" :key="project.git">
            <div>
                log加载时间：{{logTime}}
            </div>
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
                      v-for="item in modules"
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
                <el-select :value='project.currentRelease ||　""'  :loading='loadingLog' loading-text='正在加载'>
                    <el-option v-for="log in logMap[project.name]" :key="log.hash" :label='log.message'></el-option>
                </el-select>
            </div>
        </el-card >

    </div>

</div>
</template>

<script>
import api from './api.js'
import modules from 'conf/modules.js'
// import gitProjects from 'conf/gitProjects'

export default {
    name: 'select-build',
    data() {
        return {
            checkedModules:[],
            isBuiding:false,
            modules:[],
            current: null,
            gitProjects:[],
            loading:false,
            loadingLog:false,
            logTime: new Date(),
            logMap:{

            }
        }
    },
    created() {
        api.getProjects().then(res=>{
            if(res.status) {
                this.gitProjects = res.data;
                this.getProjectGitLogs();
            }else {

            }
        })
        api.getModules().then(res=>{
            if(res.status) {
                this.modules = res.data
            }else {

            }
        })
        this.timer =  setInterval(()=>{
            this.getProjectGitLogs()
        }, 1000 * 60)
    },
    destroyed() {
      //do something after destroying vue instance
      //
      console.log('destroying');
      clearInterval(this.timer)
  },
    methods: {
        getProjectGitLogs(currentProject){
            this.loadingLog = true;
            this.logTime = new Date();
            this.gitProjects.map(async (item)=>{
                let data = await api.getProjectGitLogs(item).then((res) => {
                    if(res.status) {
                        this.logMap = Object.assign({}, this.logMap, {[item.name]: res.data})
                        return res.data
                    }
                })
                this.loadingLog = false
            })
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
                }else {
                    this.$notify({
                        type: 'error',
                        message: '失败'
                    })
                }
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
