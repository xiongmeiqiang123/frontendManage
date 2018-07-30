<template>
<div id="build">

    <div>
        <h1  class='title'>选择需要上传的项目</h1>
        <h2 style='color:orange;'>在上传之前需要先打包</h2>
        <div class="buttons">
            <h3>发布哪个项目？</h3>
             <el-radio v-for="item in modules" v-model="current" :label="item._id">{{item.name}}</el-radio>

        </div>
        <div>
            <h3>上传到线上哪个分支？</h3>
            <el-input placeholder='默认为master分支' v-model="branch"></el-input>
            <h3>要发布的内容</h3>
            <el-input placeholder='须填写本次发布内容' v-model="message"></el-input>
        </div>
        <div class="buttons">
            <h3>发布哪个项目？</h3>
            <el-button key='item.name'
                :loading="current === item"
                :type="current === item ? 'primary':''"
                :disabled="!current || isLoading"
                @click.native="selectBuild()">发布</el-button>
        </div>

    </div>

</div>
</template>

<script>
import request from 'superagent'
import api from './api.js'
import _ from 'lodash'
import {
    createGETPromise,
    createPOSTPromise
} from 'components/request'
// import gitProjects from 'conf/gitProjects'
// const modules = gitProjects.map(i=>i.name)
export default {
    name: 'select-upload',
    data() {
        return {
            modules: [],
            current: null,
            message: '',
            branch: 'dev',
            isLoading: false,
            moduleIdMap: {}
        }
    },
    created() {
        api.getProjects().then(res=>{
            if(res.status ) {
                this.modules = res.data
                this.moduleIdMap = _.keyBy(res.data, item=>item._id)
            }else {

            }
        })
    },
    watch:{
        current(value){
            let data = this.moduleIdMap[value] || {}
            this.branch = data.defaultReleaseBranch || 'master'
        }
    },
    methods: {
        selectModule(module){
            // console.log(module)
        },
        selectBuild(){
            if(!this.current) {
                this.$notify.warning('请选择项目')
                return 
            }
            const module = this.moduleIdMap[this.current].name;
            const {message, branch} = this;
            if(!message) {
                this.$notify.warning('请填写要发布的内容')
                return;
            }
            // this.current = module
            this.$message('正在上传' + module);
            this.isLoading = true;
            
            createPOSTPromise('/action/upload', 'json')({module, message, branch}).then(res=>{
                this.isLoading = false;
                this.current = null
                if(res.status) {
                    this.$notify({
                        type: 'success',
                        message: '上传成功！请在git项目上加2，然后发布'
                    })
                    this.message = ''
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
</style>
