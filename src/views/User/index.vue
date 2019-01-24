<template>
    <div class="user">
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/user">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <el-input placeholder="请输入用户ID" v-model="userid" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <!-- 用户列表表格 -->
      <el-table
        :data="userNumber"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="500"
        >
        </el-table-column>
         <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showEdit(scope.row)" type="primary" icon="el-icon-edit" size="mini" plain circle></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            circle
            @click="delUser(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
      </el-table>
       <!-- 修改对话框 -->
    <el-dialog
      title="查看用户"
      :visible.sync="editDialogVisible"
      width="40%">
      <!-- 表单组件 -->
      <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名">
          <el-tag type="info">{{editForm.username}}</el-tag>
        </el-form-item>
         <el-form-item label="创建时间" prop="createTime">
          <el-tag type="info">{{editForm.createTime}}</el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
export default {

  data () {
    return {
      userNumber: [],
      // 用户id
      userid: '',
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ]
      },
      editDialogVisible: false,
      editForm: {
        username: '',
        createTime: '',
        id: ''
      }
    }
  },
  created () {
    this.getuserList()
  },
  methods: {
    open () {
      this.$alert('未授权，请登录！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push('/login')
        }
      })
    },
    getuserList () {
      this.axios('http://192.168.0.109:8080/user/findList')
        .then(res => {
          if (res.code === '200') {
            this.userNumber = res.data
          } else if (res.code === '401') {
            this.open()
          }
        })
    },
    async search () {
      let res = await this.axios(`http://192.168.0.109:8080/user/get?userid=${this.userid}`)
      if (res.code === '200') {
        this.userNumber = []
        this.userNumber.push(res.data)
      }
    },
    showEdit (user) {
      this.editDialogVisible = true
      this.editForm.id = user.id
      this.editForm.username = user.username
      this.editForm.createTime = user.createTime
    }
  }

}
</script>

<style lang="less" socped>
.el-input{
  width: 400px;
  margin-bottom: 10px;
}
</style>
