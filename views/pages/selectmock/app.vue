<template>
<div id="nginx">

    <div>
        <h1 class='title'>前端选择</h1>

        <div class="current">
            <!-- 当前选择前端工程：{{currentFront}} -->
        </div>
        <div class="buttons">
            <el-tooltip placement="top" v-for="item in frontIps" effect='light'>
              <div slot="content"> {{item.ip}}</div>
              <el-button key='item.name' v-bind:type="item.value === currentFront ? 'primary' : ''"  @click.native="selectFrontEnd(item.value)">{{item.name}}</el-button>
            </el-tooltip>
        </div>
    </div>



    <div>
        <h1 class='title'>mock 服务器选择</h1>

        <div class="current">
            <!-- 当前选择服务器：{{current}} -->
        </div>
        <div class="buttons">
            <el-tooltip placement="top" v-for="item in names"  effect='light'>
              <div slot="content"> {{item.ip}}</div>
            <el-button key='item.name' v-bind:type="item.value === current ? 'primary' : ''"  @click.native="createMock(item.value)">{{item.name}}</el-button>
            </el-tooltip>
        </div>
    </div>


</div>
</template>

<script>
import request from 'superagent'
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

console.log(ips, 'ips');
const names = ips

export default {
    name: 'selectMock',
    data() {
        return {
            msg: 'mock 服务器选择',
            names,
            frontIps,
            current: '还未选择',
            currentFront: '还未选择',
            selected: 'test'
        }
    },
    created() {
        request.get('/action/getCurrentInfo')
            .query()
            .end((err, res) => {
                if (err) {
                    this.$notify({
                        message: '请求出错',
                        duration: 1000
                    });
                    return false;
                }
                if (res.body.status) {
                    let data = res.body.data;
                    this.current = data.mock;
                    this.currentFront = data.front;
                } else {
                    this.$notify({
                        message: '请求出错',
                        duration: 6000
                    });
                }

            });
        this.names.map(item => {
            //   createGETPromise(item.ip)()
        })
    },
    components: {
        CreateMock
    },
    methods: {
        selectFrontEnd(name){
            request.get('/action/rewriteServer')
                .query({
                    front: name
                })
                .end((err, res) => {
                    if (err) {
                        this.$notify({
                            message: '请求出错',
                            duration: 1000
                        });
                        return false;
                    }
                    if (res.body.status) {
                        // $('.buttons button').removeClass('active')
                        // $(e.target).addClass('active');
                        this.currentFront = this.frontIps.filter(item => item.value === name)[0].value;

                        this.$notify({
                            type: 'success',
                            message: '修改成功！'
                        })
                    } else {
                        // this.who = who;
                        this.currentFront = name;
                        this.$notify({
                            message: '请求出错',
                            duration: 6000
                        });
                    }

                });
        },
        createMock(name) {
            // let who = e.target.innerHTML;
            request.get('/action/rewriteServer')
                .query({
                    mock: name
                })
                .end((err, res) => {
                    if (err) {
                        this.$notify({
                            message: '请求出错',
                            duration: 1000
                        });
                        return false;
                    }
                    if (res.body.status) {
                        // $('.buttons button').removeClass('active')
                        // $(e.target).addClass('active');
                        this.current = this.names.filter(item => item.value === name)[0].value;

                        this.$notify({
                            type: 'success',
                            message: '修改成功！'
                        })
                    } else {
                        // this.who = who;
                        this.current = name;
                        this.$notify({
                            message: '请求出错',
                            duration: 6000
                        });
                    }

                });
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
