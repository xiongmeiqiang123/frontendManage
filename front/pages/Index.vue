<template lang="html">
    <el-tabs  v-model='activeName' type="card">
        <el-tab-pane label="选择Mock" name="first">
            <select-mock> </select-mock>
        </el-tab-pane>
       <el-tab-pane label="创建Mock" name="second">
           <create-mock> </create-mock>
       </el-tab-pane>
     </el-tabs>
</template>

<script>
import createMock from '../createmock/index.vue'
import SelectMock from '../selectmock/app.vue'
export default {
    name: 'IndexPage',
    components: {
        createMock,
        SelectMock
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
          console.log(tab);
        this.activeName2 = tab;
      }
    }
}
</script>

<style lang="css">
</style>
