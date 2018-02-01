<template>
<div id="build">

    <div>
        <h1  class='title'>miui-sys-front</h1>
        <h2>选择打包的模块</h2>

        <div class="current">
            <!-- 当前选择前端工程：{{currentFront}} -->
        </div>
        <div class="buttons">
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

            <el-button  :disabled="isBuiding || !checkedModules.length"
                type='primary'
                @click.native="selectBuild(checkedModules.join('##'))">打包</el-button>
        </div>

        <div class="buttons">
            <h1  class='title'>admin</h1>
            <h2>选择打包的模块</h2>
            <el-button key='item.name'
                :loading="current === item"
                :type="current === item ? 'primary':''"
                :disabled="isBuiding"
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
            checkedModules:[],
            isBuiding:false,
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
            this.isBuiding = true;
            this.current = module
            this.$message('正在打包模块－－' + module);
            createPOSTPromise('/action/build', 'json')({module}).then(res=>{
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
</style>
