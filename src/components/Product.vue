<template>
    <div class="product">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/product">产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品列表列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
            :data="productList"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="商品名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      productList: []
    }
  },
  created () {
    this.axios('http://192.168.0.109:8080/product/findList')
      .then(res => {
        if (res.code === '200') {
          console.log(res.data)
        }
      })
  }
}
</script>

<style lang = 'less' scoped>

</style>
