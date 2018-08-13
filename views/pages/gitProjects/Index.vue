<template>
  <div id="">
    <el-button size='small' type='primary' @click.native="add">添加</el-button>
  
    <el-table :data='projects' style='margin:10px;'>
      <el-table-column prop='name' label='项目名称'>
      </el-table-column>
      <el-table-column prop='git' label='git地址'>
      </el-table-column>
      <el-table-column prop='devBranch' label='开发分支'>
      </el-table-column>
      <el-table-column prop='currentRelease' label='当前发布hash'>
      </el-table-column>
      <el-table-column prop="操作" width='200' label="操作">
        <template slot-scope='scope'>
                                   <div>
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


      <label for="">项目：</label>
    <el-select v-model="project">
        <el-option v-for="elem in projects" :key="elem.name" :label='elem.name' :value='elem.git'></el-option>
    </el-select>
    <el-button v-show="isShowInitBtn" type='primary' @click='initProject' :disabled='isInit'>初始化该项目</el-button>
    <el-button v-show="logs.length && project" type='danger' @click='removeGitProject'>删除项目</el-button>
    <br>
    <br>
    <label for="">日志：</label>
    <!-- <div >
      <el-steps direction="vertical" :active="1">
        <el-step   :description="`${log.author_name} : ${log.date}` " :title="log.message" v-for="log in logs" :key="log.hash"></el-step>
      </el-steps>
    </div> -->
    <el-select v-model="currentComit">
        <el-option v-for="elem in logs" :key="elem.hash" :label='elem.message' :value='elem.hash'></el-option>
    </el-select>

    <el-dialog :visible.sync="isEditOrAdd" title='编辑信息' :show-close='false'>
		<el-form :model="currentItem" class="demo-form-inline">
			<el-form-item label="名称">
				<el-input v-model="currentItem.name" placeholder="名称"></el-input>
			</el-form-item>

			<el-form-item label="git地址" >
					<el-input v-model="currentItem.git" placeholder="git地址，必填"></el-input>
			</el-form-item>

			<el-form-item label="开发分支">
					<el-input v-model="currentItem.port" placeholder="开发分支，默认为 master"></el-input>
			</el-form-item>

			<el-form-item label="note">
					<el-input v-model="currentItem.msg" placeholder="note"></el-input>
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
import api from "./api";

export default {
  name: "",
  data: () => ({
    projects: [],
    logs: [],
    project: "",
    isShowInitBtn: false,
    currentComit: "",
    isInit: false,
    isAdd: false,
    isEdit: false,
    currentItem: {}
  }),
  computed: {
    currentProject(test) {
      console.log(this.project, test);
      return this.projects.filter(item => item.git === this.project)[0];
    },
    isEditOrAdd() {
      return this.isAdd || this.isEdit;
    }
  },
  watch: {
    project: function(value) {
      let currentProject = this.projects.filter(item => item.git === value)[0];

      if (currentProject) {
        this.getProjectGitLogs(currentProject);
      }
    }
  },
  methods: {
    getProjectGitLogs(currentProject) {
      api.getProjectGitLogs(currentProject).then(res => {
        if (res.status) {
          this.isShowInitBtn = false;
          this.logs = res.data;
        } else {
          this.logs = [];
          if (res.code === 0) {
            this.isShowInitBtn = true;
            this.currentComit = "";
          }
        }
      });
    },
    initProject() {
      const project = this.project;
      let currentProject = this.projects.filter(
        item => item.git === project
      )[0];
      this.isInit = true;
      api.initProject(currentProject).then(res => {
        this.isInit = false;
        if (res.status) {
          this.getProjectGitLogs(currentProject);
          this.$message({
            type: "success",
            message: "初始化成功!"
          });
        } else {
        }
      });
    },
    release() {
      const project = this.project;
      let currentProject = this.projects.filter(
        item => item.git === project
      )[0];

      api.release(currentProject).then(res => {
        if (res.status) {
        } else {
        }
      });
    },
    removeGitProject() {
      const { project } = this;
      let currentProject = this.projects.filter(
        item => item.git === project
      )[0];
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.removeGitProject(currentProject).then(res => {
            if (res.status) {
              this.logs = [];
              this.currentComit = "";
              this.project = "";
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editItem(item) {
      this.isEdit = true;
      this.isAdd = false;
      this.currentItem = Object.assign({}, item);
    },
    add() {
      this.isAdd = true;
      this.isEdit = false;
      this.currentItem = {};
    },
    submit() {
      let data = Object.assign(this.currentItem);

      if (this.isAdd) {
        api.add(this.currentItem).then(res => {
          if (res.status) {
            this.$notify({
              type: "success",
              message: "添加成功！"
            });
            this.isAdd = false;
            this.getProjects();
          } else {
            this.$notify({
              type: "error",
              message: res.msg || "失败"
            });
          }
        });
      } else {
        api.update(this.currentItem).then(res => {
          if (res.status) {
            this.$notify({
              type: "success",
              message: "修改成功！"
            });
            this.isEdit = false;
            this.getProjects();
          } else {
            this.$notify({
              type: "error",
              message: res.msg || "失败"
            });
          }
        });
      }
    },
    getProjects() {
      api.getProjects().then(res => {
        if (res.status) {
          this.projects = res.data;
        }
      });
    },
    deleteItem(item) {
      api.remove(item).then(res => {
        if (res.status) {
          this.$notify({
            type: "success",
            message: "删除成功"
          });
          this.isEdit = false;
          this.getProjects();
        } else {
          this.$notify({
            type: "error",
            message: res.msg || "失败"
          });
        }
      });
    }
  },
  created() {
    this.getProjects();
  }
};
</script>

<style scoped>
</style>
