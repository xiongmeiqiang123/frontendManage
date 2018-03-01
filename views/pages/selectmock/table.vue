<template>
  <div id="">
      <el-table :data="data" style="width: 100%">
          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="status" label="状态" >
              <template slot-scope='scope'>
                  <div :style='`color:${scope.row.status?"green":"red" }`' >
                      {{
                          scope.row.status ? '成功':'未连接'
                      }}
                  </div>
              </template>
          </el-table-column>
          <el-table-column prop="ip" label="ip" width='180'>
          </el-table-column>
          <el-table-column prop="port" label="端口">
          </el-table-column>
          <el-table-column prop="操作" width='200' label="操作">
              <template slot-scope='scope'>
             <div>
                  <el-button key='scope.row.key'
                  size='small'
                  v-bind:type="scope.row.id === current ? 'primary' : ''"
                   @click.native="select(scope.row.id)">选择</el-button>

                   <el-button
                   size='small'
                   type='danger'
                    @click.native="deleteItem(scope.row)">删除</el-button>

                    <el-button
                    size='small'
                    type='info'
                     @click.native="editItem(scope.row)">编辑</el-button>
             </div>
         </template>
          </el-table-column>

      </el-table>
  </div>
</template>
<script>
export default {
  name: "mock-table",
  data: () => ({

  }),
  props: {
      data: Array,
      select: {
          type: Function
      },
      createMock: {
          type: Function
      },
      deleteItem: {
         type: Function
      },
      editItem:{
         type: Function
      },
      current: {
          type: String
      }

  }
}
</script>
<style lang="css" scoped>
</style>
