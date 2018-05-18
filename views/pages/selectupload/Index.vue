<template>
<div id="build">

    <div>
        <h1  class='title'>选择需要上传的项目</h1>
        <h2 style='color:orange;'>在上传之前需要先打包</h2>

        <div>
            <h3>上传到线上哪个分支？</h3>
            <el-input placeholder='默认为master分支' v-model="branch"></el-input>
            <h3>要发布的内容</h3>
            <el-input placeholder='须填写本次发布内容' v-model="message"></el-input>
        </div>
        <div class="buttons">
            <h3>发布哪个项目？</h3>
            <el-button key='item.name'
                v-for="item in modules"
                :loading="current === item"
                :type="current === item ? 'primary':''"
                :disabled="current !== null "
                @click.native="selectBuild(item)">{{item}}</el-button>
        </div>

    </div>

</div>
</template>

<script>
import request from 'superagent'
import api from './api.js'

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
            branch: 'dev'
        }
    },
    created() {
        api.getProjects().then(res=>{
            if(res.status ) {
                this.modules = res.data.map(i=>i.name)
            }else {

            }
        })
    },
    methods: {
        selectBuild(module){

            const {message, branch} = this;
            if(!message) {
                this.$notify.warning('请填写要发布的内容')
                return;
            }
            this.current = module
            this.$message('正在上传' + module);
            createPOSTPromise('/action/upload', 'json')({module, message, branch}).then(res=>{
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
