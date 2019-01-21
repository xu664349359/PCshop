<template>
   <el-container class="home">
    <el-header>
      <div class="left">
        <a href="javascript:;">SHOP</a>
        <a href="javascript:;">name</a>
        <a href="javascript:;">testa</a>
      </div>
      <div class="right">
        <a href="javascript:;" @click="logout">admin
          <i class="el-icon-caret-bottom"></i>
        </a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/user"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>产品管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span slot="title">产品列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>付款管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">付款列表</span>
            </el-menu-item>
            <el-menu-item index="4-2">
              <i class="el-icon-menu"></i>
              <span slot="title">name32</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    async logout () {
      try {
        // 弹出一个确认框
        await this.$confirm('您确定要退出本系统吗？', '温馨提示', {
          type: 'warning'
        })
        // 移除token
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('退出系统成功')
      } catch (e) {
        this.$message.info('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .home {
  height: 100%;
  .el-header {
    background-color: #333;
    height:60px;
    line-height:60px;
    .left{
      float:left;
    }
    .right{
      float:right;
    }
  }

  .el-aside {
    background-color: #545c64;

    .el-submenu {
      width: 200px;
    }
  }

  .el-main {
    background-color: #d4dfe4;
  }
}
</style>
