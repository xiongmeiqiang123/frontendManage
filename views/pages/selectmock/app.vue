<template>
<div id="nginx">

    <div style="text-align:center">
        <el-button @click='add' type='primary'>
            新增
        </el-button>
    </div>
	<el-row>
		<el-col :span='11'>
			<h1 class='title'>前端选择</h1>
            <mock-table
                :current='currentFront'
                :select='selectFrontEnd'
                :deleteItem='deleteItem'
                :editItem='editItem'
                :data='frontIps'></mock-table>
		</el-col>
		<el-col :span='11' :offset='2'>
			<h1 class='title'>mock 服务器选择</h1>
            <mock-table
                :current='current'
                :select='createMock'
                :deleteItem='deleteItem'
                :editItem='editItem'
                :data='backendIps'></mock-table>
			<!-- <div class="buttons">
                <el-tooltip placement="top" v-for="item in backendIps"  effect='light'>
                  <div slot="content"> {{item.ip}}</div>
                <el-button key='item.name' v-bind:type="item.key === current ? 'primary' : ''"  @click.native="createMock(item.key)">{{item.name}}</el-button>
                </el-tooltip>
            </div> -->
		</el-col>
	</el-row>


	<el-dialog :visible.sync="isEditOrAdd" title='编辑信息' :show-close='false'>
		<el-form :model="currentItem" class="demo-form-inline">
			<el-form-item label="名称">
				<el-input v-model="currentItem.name" placeholder="名称"></el-input>
			</el-form-item>

			<el-form-item label="ip" >
					<el-input v-model="currentItem.ip" placeholder="填写ip或者域名"></el-input>
			</el-form-item>

			<el-form-item label="port">
					<el-input v-model="currentItem.port" placeholder="port"></el-input>
			</el-form-item>

			<el-form-item label="msg">
					<el-input v-model="currentItem.msg" placeholder="msg"></el-input>
			</el-form-item>
            <el-form-item label="是否是前端接口">
                <el-switch
                    v-model="currentItem.isFront"
                    on-text="前端"
                    off-text="后端">
                </el-switch>
            </el-form-item>
		</el-form>
        <div style='text-align: center'>
            <el-button @click='isEdit = false; isAdd = false'>取消</el-button>
            <el-button @click='submit'>提交</el-button>
        </div>
	</el-dialog>
</div>
</template>

<script>
import request from 'superagent'
import api from './api.js'
import MockTable from './table.vue'
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
    components: {
        CreateMock,
        MockTable
    },
	data() {
		return {
			msg: 'mock 服务器选择',
			backendIps: [],
			frontIps: [],
			current: '还未选择',
			currentFront: '还未选择',
			selected: 'test',
			currentItem: {},
			isEdit: false,
			isAdd: false
		}
	},
    computed:{
        isEditOrAdd(){
            return this.isAdd || this.isEdit
        }
    },
	created() {

		this.getList();

		api.getCurrentInfo().then(res => {
			if (res.status) {
				let data = res.data;
				this.current = data.mock;
				this.currentFront = data.front;
			} else {
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

	methods: {
		selectFrontEnd(name) {
			api.rewriteServer({
				front: name
			}).then(res => {
				if (res.status) {
					this.currentFront = this.frontIps.filter(item => item.id === name)[0].id;
					this.$notify({
						type: 'success',
						message: '修改成功！'
					})
				} else {
					// this.currentFront = name;
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
			}).then(res => {
				if (res.status) {
					this.current = this.backendIps.filter(item => item.id === name)[0].id;

					this.$notify({
						type: 'success',
						message: '修改成功！'
					})
				} else {
					// this.current = name;
					this.$notify({
						message: '请求出错',
						duration: 6000
					});
				}
			})
		},
		getList() {
			//do something after creating vue instance
			api.getList().then(res => {
				if (res.status) {
					this.backendIps = res.data.filter((item) => !item.isFront)
					this.frontIps = res.data.filter((item) => item.isFront)

				} else {

				}
			})
		},

		deleteItem(item) {
			this.$confirm('确定删除?').then(_ => {
				api.delete({
					id: item.id
				}).then(res => {
					if (res.status) {
						this.$notify({
							type: 'success',
							message: '删除成功！'
						})
						this.getList()
					} else {

					}
				})
			})
		},
		editItem(item) {
			this.isEdit = true;
			this.currentItem = Object.assign({}, item);
		},
        add(){
            this.isAdd = true
            this.currentItem = {
                isFront:false
            }
        },
        submit(){
            let data = Object.assign(this.currentItem)
            if(!data.ip) {
                return;
            }
            if(data.ip.match('http://(.*)')) {
                data.ip = data.ip.match('http://(.*)')[1]
            }

            if(this.isAdd) {
                api.add(this.currentItem).then(res=>{
                    if(res.status) {
                        this.$notify({
							type: 'success',
							message: '添加成功！'
						})
                        this.isAdd = false
                        this.getList()
                    }else {

                    }
                })
            }else {
                api.update(this.currentItem).then(res=>{
                    if(res.status) {
                        this.$notify({
							type: 'success',
							message: '修改成功！'
						})
                        this.isEdit = false
                        this.getList()
                    }else {

                    }
                })
            }
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
