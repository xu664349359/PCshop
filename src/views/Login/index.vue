<template>
    <div class="login">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          @keyup.enter.native="login"
        ></el-input>
      </el-form-item>
    <el-form-item>
      <el-form-item>
    <el-checkbox-group v-model="form.rememberMe">
      <el-checkbox label="记住密码" name="rememberMe"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
   </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        rememberMe: false
      },
      // 表单的校验规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.form.resetFields()
    },
    async login () {
      try {
        await this.$refs.form.validate()
        // 发送ajax请求
        let res = await this.axios({
          method: 'post',
          url: 'http://192.168.0.109:8080/token',
          data: this.form
        })
        if (res.code === '200') {
          this.$message.success('登录成功')
          localStorage.setItem('token', res.data)
          localStorage.setItem('userInfo', JSON.stringify(this.form))
          this.$router.push('/home')
        } else {
          this.$message.error('登录失败')
        }
      } catch (e) {
        return false
      }
    }
  },
  mounted () {
    if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).rememberMe === true) {
      let user = JSON.parse(localStorage.getItem('userInfo'))
      this.form.username = user.username
      this.form.password = user.password
      this.form.rememberMe = user.rememberMe
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    width: 400px;
    background-color: #fff;
    margin: 200px auto;
    padding: 75px 40px 15px;
    position: relative;
    border-radius: 10px;
    .el-button ~ .el-button {
      margin-left: 80px;
    }
  }
}
</style>
