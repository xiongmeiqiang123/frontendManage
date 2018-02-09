<template>
  <div id="">
      <label for="">项目：</label>
    <el-select v-model="project">
        <el-option v-for="elem in projects" :key="elem.name" :label='elem.name' :value='elem.git'></el-option>
    </el-select>
    <el-button v-show="isShowInitBtn" type='primary' @click='initProject'>初始化该项目</el-button>
    <br>
    <br>
    <label for="">日志：</label>
    <el-select v-model="currentComit">
        <el-option v-for="elem in logs" :key="elem.hash" :label='elem.message' :value='elem.hash'></el-option>
    </el-select>

    <el-button v-show="currentComit" @click='build' type='primary'>打包</el-button>

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
    currentComit: ''
  }),
  watch:{
    project: function(value){
        let currentProject = this.projects.filter((item) => item.git === value)[0];

        if(currentProject) {
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
        }
    }
  },
  methods: {
        initProject() {
            const project = this.project;
            let currentProject = this.projects.filter((item) => item.git === project)[0];
            api.initProject(currentProject).then(res=>{
                if(res.status === 'true') {
                    
                }else {

                }
            })

        },
        build(){

        },
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
