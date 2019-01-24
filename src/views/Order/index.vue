<template>
  <div class="order">
    <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/order">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 搜索框 -->
      <el-input placeholder="请输入订单ID" v-model="orderid" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <!-- 订单列表表格 -->
       <el-table
        :data="orderList"
        style="width: 100%">
        <el-table-column
          prop="orderNo"
          label="订单号"
          width="300">
        </el-table-column>
        <el-table-column
          prop="totalPrice"
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
            @click="delOrder(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
      </el-table>
      <!-- 修改对话框 -->
     <el-dialog
      title="修改订单"
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
      orderList: [],
      orderid: '',
      editDialogVisible: false,
      editForm: {
        orderNo: '',
        totalPrice: '',
        id: ''
      }
    }
  },
  created () {
    this.getorderList()
  },
  methods: {
    getorderList () {
      this.axios('http://192.168.0.109:8080/order/findList')
        .then(res => {
          if (res.code === '200') {
            this.orderList = res.data
            console.log(res.data)
          }
        })
    },
    async search () {
      let res = await this.axios(`http://192.168.0.109:8080/order/get?orderid=${this.orderid}`)
      if (res.code === '200') {
        this.orderList = []
        this.orderList.push(res.data)
      }
    },
    showEdit (order) {
      this.editDialogVisible = true
      this.editForm.id = order.id
      this.editForm.orderNo = order.orderNo
      this.editForm.totalPrice = order.totalPrice
    },
    delOrder () {}
  }
}
</script>

<style lang="less" socped>
.el-input{
  width: 400px;
  margin-bottom: 10px;
}
</style>
