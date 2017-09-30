<template>
  <div id="nginx">
    <h1 class='title'>{{ msg }}</h1>

    <div class="current">
    	当前选择服务器：{{current}}
    </div>
    <div class="buttons">
		<el-button key='item.name' v-bind:type="item.name === current ? 'primary' : ''"  v-for="item in names" @click.native="createMock(item.value)">{{item.name}}</el-button>
	</div>
	<create-mock> </create-mock>
  </div>
</template>

<script>
	import request from 'superagent'
    import {createGETPromise} from '../../components/request'
	import CreateMock from '../createmock/index.vue'
    import ipsConf  from '../../conf/ips.js'
    const ips = ipsConf.map((item) => ({value:item.key, name: item.name}))

	const names = ips

	export default {
	  data () {
	    return {
	      msg: 'mock 服务器选择',
	      names,
	      current: '还未选择',
        selected: 'test'
	    }
	  },
      created(){
          this.names.map(item=>{
            //   createGETPromise(item.ip)()
          })
      },
	  components: {
	  	CreateMock
	  },
	  methods: {
	    createMock (name) {
	    	// let who = e.target.innerHTML;
	    	request.get('/action/rewriteServer')
	    		.query({using: name})
	    		.end((err, res)=>{
	    			if(err) {
	    				this.$notify({
					        message: '请求出错',
					        duration: 1000
					      });
	    				return false;
	    			}
	    			if(res.body.status) {
	    				// $('.buttons button').removeClass('active')
	    				// $(e.target).addClass('active');
	    				this.current = this.names.filter(item=>item.value === name)[0].name;

              this.$notify({
                type:'success',
                message: '修改成功！'
              })
	    			}else {
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
	.title{
		text-align: center;
	}
	.current{
		margin: 20px;
	}
</style>
