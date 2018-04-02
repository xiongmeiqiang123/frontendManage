<template>
    <div>
        <el-menu
         :default-active="activeIndex2"
         mode="horizontal"
         @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
         <el-menu-item index="#/selectmock" >选择Mock</el-menu-item>
         <el-menu-item index="#/createMock">创建Mock</el-menu-item>
         <el-menu-item index="#/selectbuild">构建打包</el-menu-item>
         <el-menu-item index="#/selectupload">上线releases</el-menu-item>
        </el-menu>
    </div>

</template>
<script>

 export default {
   data() {
     return {
       activeIndex: '1',
       activeIndex2: window.location.hash
     };
   },
   methods: {
     handleSelect(key, keyPath) {
       window.location.href = key;
     }
   }
 }
</script>
<style scoped>
</style>
