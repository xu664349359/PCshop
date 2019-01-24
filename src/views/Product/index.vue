<template>
    <div class="product">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/product">产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品列表</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 搜索框 -->
      <el-input placeholder="请输入商品ID" v-model="productId" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" plain @click="showAdd">添加用户</el-button>
        <!-- 商品列表表格 -->
      <el-table
        :data="productList"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="商品名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
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
            @click="delProduct(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8, 10]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
      <!-- 添加的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="40%">
      <!-- 表单组件 -->
      <el-form ref="addForm" status-icon :model="addForm" label-width="80px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProduct">确 定</el-button>
      </span>
    </el-dialog>
        <!-- 修改的对话框 -->
     <el-dialog
      title="修改商品"
      :visible.sync="editDialogVisible"
      width="40%">
      <!-- 表单组件 -->
      <quill-editor v-model="content"
                ref="myQuillEditor"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)">
      </quill-editor>
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
      content: '',
      defaultMsg: '这里是UE测试',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: 'user1',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      productList: [],
      productId: '',
      addDialogVisible: false,
      addForm: {
        name: '',
        price: ''
      },
      editDialogVisible: false,
      editForm: {
        name: '',
        price: '',
        id: ''
      }
    }
  },
  created () {
    this.getproductList()
  },
  methods: {
    getproductList () {
      this.axios('http://192.168.0.109:8080/product/findList')
        .then(res => {
          if (res.code === '200') {
            this.productList = res.data
            this.total = res.data.total
            console.log(res.data)
          }
        })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getproductList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getproductList()
    },
    async search () {
      let res = await this.axios(`http://192.168.0.109:8080/product/get?productId=${this.productId}`)
      if (res.code === '200') {
        this.productList = []
        this.productList.push(res.data)
      }
    },
    showAdd () {
      this.addDialogVisible = true
    },
    async addProduct () {
      let res = await this.axios({
        method: 'post',
        url: 'http://192.168.0.109:8080/product/save',
        data: this.addForm
      })
      if (res.code === '200') {
        this.$refs.addForm.resetFields()
        this.addDialogVisible = false
        this.getproductList()
        this.$message.success(res.message)
        console.log(res.data)
      } else {
        this.$message.error('商品添加失败')
      }
    },
    showEdit (product) {
      this.editDialogVisible = true
      this.editForm.id = product.id
      this.editForm.name = product.name
      this.editForm.price = product.price
    },
    delProduct () {}
  }
}
</script>

<style lang="less" socped>
.el-input{
  width: 400px;
  margin-bottom: 10px;
}
</style>
