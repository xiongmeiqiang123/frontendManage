<template>
    <div>
        <el-menu
         :default-active="activeIndex2"
         mode="horizontal"
         @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
         <el-menu-item index="#/selectmock">选择Mock</el-menu-item>
         <el-menu-item index="#/createMock">创建Mock</el-menu-item>
         <el-menu-item index="#/selectbuild">build</el-menu-item>
         <el-menu-item index="#/selectupload">upload</el-menu-item>
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
       window.location.href = key;
     }
   }
 }
</script>
<style scoped>
</style>
