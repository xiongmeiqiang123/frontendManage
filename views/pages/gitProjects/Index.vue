<template>
  <div id="">

      <el-table :data='projects' style='margin:10px;'>
        <el-table-column prop='name' label='项目名称'>
        </el-table-column>
        <el-table-column prop='git' label='git地址'>
        </el-table-column>
        <el-table-column prop='devBranch' label='开发分支'>
        </el-table-column>
        <el-table-column prop='currentRelease' label='当前发布hash'>
        </el-table-column>
      </el-table>


      <label for="">项目：</label>
    <el-select v-model="project">
        <el-option v-for="elem in projects" :key="elem.name" :label='elem.name' :value='elem.git'></el-option>
    </el-select>
    <el-button v-show="isShowInitBtn" type='primary' @click='initProject' :disabled='isInit'>初始化该项目</el-button>
    <el-button v-show="logs.length && project" type='danger' @click='removeGitProject'>删除项目</el-button>
    <br>
    <br>
    <label for="">日志：</label>
    <!-- <div >
      <el-steps direction="vertical" :active="1">
        <el-step   :description="`${log.author_name} : ${log.date}` " :title="log.message" v-for="log in logs" :key="log.hash"></el-step>
      </el-steps>
    </div> -->
    <el-select v-model="currentComit">
        <el-option v-for="elem in logs" :key="elem.hash" :label='elem.message' :value='elem.hash'></el-option>
    </el-select>

    <el-button v-show="currentComit" @click='release' type='primary'>发布</el-button>

  </div>
</template>
<script>

import api from './api'

export default {
  name: "",
  data: () => ({
    projects: [],
    logs: [],
    project: '',
    isShowInitBtn: false,
    currentComit: '',
    isInit: false
  }),
  computed:{
      currentProject(test){
          console.log(this.project, test);
          return this.projects.filter((item) => item.git === this.project)[0];
      }
  },
  watch:{
    project: function(value){
        let currentProject = this.projects.filter((item) => item.git === value)[0];

        if(currentProject) {
            this.getProjectGitLogs(currentProject)
        }
    }
  },
  methods: {
          getProjectGitLogs(currentProject) {
              api.getProjectGitLogs(currentProject).then(res=>{
                  if(res.status) {
                      this.isShowInitBtn = false
                      this.logs = res.data;
                  }else {
                      this.logs = []
                      if(res.code === 0) {
                          this.isShowInitBtn = true
                          this.currentComit = ''
                      }
                  }
              })
          },
        initProject() {
            const project = this.project;
            let currentProject = this.projects.filter((item) => item.git === project)[0];
            this.isInit = true
            api.initProject(currentProject).then(res=>{
                this.isInit = false
                if(res.status) {
                    this.getProjectGitLogs(currentProject)
                    this.$message({
                      type: 'success',
                      message: '初始化成功!'
                    });
                }else {

                }
            })

        },
        release(){
            const project = this.project;
            let currentProject = this.projects.filter((item) => item.git === project)[0];

            api.release(currentProject).then(res=>{
                if(res.status) {

                }else {

                }
            })
        },
        removeGitProject(){
            const {project} = this;
            let currentProject = this.projects.filter((item) => item.git === project)[0];
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                api.removeGitProject(currentProject).then(res=>{
                    if(res.status) {
                        this.logs = []
                        this.currentComit = ''
                        this.project = ''
                        this.$message({
                          type: 'success',
                          message: '删除成功!'
                        });
                    }else {

                    }
                })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });

        }
    },
  created() {
    //do something after creating vue instance
    api.getProjects().then((res)=>{
        if(res.status) {
            this.projects = res.data;
        }
    })
  }
}
</script>
<style scoped>
</style>
