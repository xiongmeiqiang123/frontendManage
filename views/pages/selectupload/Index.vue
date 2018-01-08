<template>
<div id="build">

    <div>
        <h1  class='title'>选择需要上传的项目</h1>
        <h2>在上传之前需要先打包</h2>
        <div class="buttons">
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
import {
    createGETPromise,
    createPOSTPromise
} from 'components/request'
const modules = ['miui-sys-front', 'admin']

export default {
    name: 'select-upload',
    data() {
        return {
            modules:modules,
            current: null
        }
    },
    created() {

    },
    methods: {
        selectBuild(module){
            this.current = module
            this.$message('正在上传' + module);
            createPOSTPromise('/action/upload', 'json')({module}).then(res=>{
                this.current = null
                if(res.status) {
                    this.$notify({
                        type: 'success',
                        message: '上传成功！请在git项目上加2，然后发布'
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
