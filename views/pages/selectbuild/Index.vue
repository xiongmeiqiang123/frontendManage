<template>
<div id="build">

    <div>
        <h1  class='title'>miui-sys-front</h1>
        <h2>选择打包的模块</h2>

        <div class="current">
            <!-- 当前选择前端工程：{{currentFront}} -->
        </div>
        <div class="buttons">
            <el-button key='item.name'
                v-for="item in modules"
                :loading="current === item"
                :type="current === item ? 'primary':''"
                :disabled="current !== null "
                @click.native="selectBuild(item)">{{item}}</el-button>
        </div>

        <div class="buttons">
            <h1  class='title'>admin</h1>
            <h2>选择打包的模块</h2>
            <el-button key='item.name'
                :loading="current === item"
                :type="current === item ? 'primary':''"
                :disabled="current !== null "
                @click.native="selectBuild('admin')">admin</el-button>
        </div>
    </div>

</div>
</template>

<script>
import request from 'superagent'
import {
    createPOSTPromise,
    createGETPromise
} from 'components/request'
import modules from 'conf/modules.js'

export default {
    name: 'select-build',
    data() {
        return {
            modules:[],
            current: null
        }
    },
    created() {
        createGETPromise('/action/getModules')().then(res=>{
            if(res.status) {
                this.modules = res.data
            }else {

            }
        })
    },
    methods: {
        selectBuild(module){
            this.current = module
            this.$message('正在打包模块－－' + module);
            createPOSTPromise('/action/build', 'json')({module}).then(res=>{
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
</style>
