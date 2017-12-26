<template lang="html">
    <el-tabs  v-model='activeName' type="card">
        <el-tab-pane label="选择Mock" name="first">
            <select-mock> </select-mock>
        </el-tab-pane>
       <el-tab-pane label="创建Mock" name="second">
           <create-mock> </create-mock>
       </el-tab-pane>
       <el-tab-pane label="build" name="third">
       <select-build></select-build>
       <!-- 有个问题，正在解决。。。。 -->
       </el-tab-pane>
     </el-tabs>
</template>

<script>
import createMock from './createmock/index.vue'
import SelectMock from './selectmock/app.vue'
import SelectBuild from './selectbuild/Index.vue'

export default {
    name: 'IndexPage',
    components: {
        SelectBuild,
        createMock,
        SelectMock,
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        this.activeName2 = tab;
      }
    }
}
</script>

<style lang="css">
</style>
