<template>
    <div>
        <el-menu
         :default-active="activeIndex2"
         mode="horizontal"
         @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
         <el-menu-item index="1"><a href="#/selectmock">选择Mock</a></el-menu-item>
         <el-menu-item index="2"><a href="#/createMock">创建Mock</a></el-menu-item>
         <el-menu-item index="3"><a href="#/selectbuild">build</a></el-menu-item>
         <el-menu-item index="4"><a href="#/selectupload">upload</a></el-menu-item>
        </el-menu>
    </div>

</template>
<script>
 export default {
   data() {
     return {
       activeIndex: '1',
       activeIndex2: '1'
     };
   },
   methods: {
     handleSelect(key, keyPath) {
       console.log(key, keyPath);
     }
   }
 }
</script>
<style scoped>
</style>
