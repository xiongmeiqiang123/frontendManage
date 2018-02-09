<template>
  <div id="app">
      <Menu></Menu>
      <div class='content'>
          <router-view></router-view>
      </div>
  </div>
</template>


<script>
import Menu from '../menu/Index.vue'

export default {
	name: 'Index',
	data() {
		return {
		};
	},
    components: {
      Menu
    }
}
</script>

<style lang="css">
body{
    margin: 0;
}
.content{
    padding: 20px;
}
</style>
