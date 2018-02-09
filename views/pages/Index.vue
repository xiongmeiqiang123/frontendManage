<template>
  <div id="app">
      <Menu></Menu>
    <router-view></router-view>
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
</style>
