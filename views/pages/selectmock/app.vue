<template>
<div id="nginx">

    <el-row>
        <el-col :span='11'>
            <h1 class='title'>前端选择</h1>

            <el-table
             :data="frontIps"
             style="width: 100%">
             <el-table-column
               prop="name"
               label="名称"
               width="180">
             </el-table-column>
             <el-table-column
               prop="key"
               label="key"
               width="180">
             </el-table-column>
             <el-table-column
               prop="ip"
               label="ip">
             </el-table-column>
             <el-table-column
               prop="port"
               label="端口">
             </el-table-column>
             <el-table-column
               prop="操作"
               label="操作">
               <template slot-scope='scope'>
                   <div>
                        <el-button key='scope.row.key'
                        v-bind:type="scope.row.key === currentFront ? 'primary' : ''"
                         @click.native="selectFrontEnd(scope.row.key)">选择</el-button>
                   </div>
               </template>
             </el-table-column>

           </el-table>
            <!-- <div class="current">
            </div>
            <div class="buttons">
                <el-tooltip placement="top" v-for="item in frontIps" effect='light'>
                  <div slot="content"> {{item.ip}}</div>
                  <el-button key='item.name' v-bind:type="item.key === currentFront ? 'primary' : ''"  @click.native="selectFrontEnd(item.key)">{{item.name}}</el-button>
                </el-tooltip>
            </div> -->
        </el-col>
        <el-col :span='11' :offset='2'>
            <h1 class='title'>mock 服务器选择</h1>

            <el-table
             :data="backendIps"
             style="width: 100%">
             <el-table-column
               prop="name"
               label="名称"
               width="180">
             </el-table-column>
             <el-table-column
               prop="key"
               label="key"
               width="180">
             </el-table-column>
             <el-table-column
               prop="ip"
               label="ip">
             </el-table-column>
             <el-table-column
               prop="port"
               label="端口">
             </el-table-column>
             <el-table-column
               prop="操作"
               label="操作">
               <template slot-scope='scope'>
                   <div>
                        <el-button key='scope.row.key'
                        v-bind:type="scope.row.key === current ? 'primary' : ''"
                         @click.native="createMock(scope.row.key)">选择</el-button>
                   </div>
               </template>
             </el-table-column>

           </el-table>
            <!-- <div class="buttons">
                <el-tooltip placement="top" v-for="item in backendIps"  effect='light'>
                  <div slot="content"> {{item.ip}}</div>
                <el-button key='item.name' v-bind:type="item.key === current ? 'primary' : ''"  @click.native="createMock(item.key)">{{item.name}}</el-button>
                </el-tooltip>
            </div> -->
        </el-col>
    </el-row>

</div>
</template>

<script>
import request from 'superagent'
import api from './api.js'

import {
    createGETPromise
} from 'components/request'
import CreateMock from '../createmock/index.vue'
import ipsConf from 'conf/ips.js'
const ips = ipsConf.map((item) => ({
    value: item.key,
    name: item.name,
    ip: item.ip
}))

import frontProjects from 'conf/frontProjects.js'
const frontIps = frontProjects.map((item) => ({
    value: item.key,
    name: item.name,
    ip: item.ip
}))

const backendIps = ips

export default {
    name: 'selectMock',
    data() {
        return {
            msg: 'mock 服务器选择',
            backendIps: [],
            frontIps: [],
            current: '还未选择',
            currentFront: '还未选择',
            selected: 'test'
        }
    },
    created() {

        this.getList();

        api.getCurrentInfo().then(res=>{
            if(res.status) {
                let data = res.data;
                this.current = data.mock;
                this.currentFront = data.front;
            }else {
                this.$notify({
                    message: '请求出错',
                    duration: 6000
                });
            }
        })
        this.backendIps.map(item => {
            //   createGETPromise(item.ip)()
        })
    },
    components: {
        CreateMock
    },
    methods: {
        selectFrontEnd(name){
            api.rewriteServer({
                front: name
            }).then(res=>{
                if(res.status) {
                    this.currentFront = this.frontIps.filter(item => item.key === name)[0].key;
                    this.$notify({
                        type: 'success',
                        message: '修改成功！'
                    })
                }else {
                    this.currentFront = name;
                    this.$notify({
                        message: '请求出错',
                        duration: 6000
                    });
                }
            })
        },
        createMock(name) {
            api.rewriteServer({
                mock: name
            }).then(res=>{
                if(res.status) {
                    this.current = this.backendIps.filter(item => item.key === name)[0].key;

                    this.$notify({
                        type: 'success',
                        message: '修改成功！'
                    })
                }else {
                    this.current = name;
                    this.$notify({
                        message: '请求出错',
                        duration: 6000
                    });
                }
            })
        },
        getList() {
          //do something after creating vue instance
          api.getList().then(res=>{
              if(res.status) {
                  this.backendIps = res.data.filter((item) => !item.isFront)
                  this.frontIps = res.data.filter((item) => item.isFront)
              }else {

              }
          })
        }
    },

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
