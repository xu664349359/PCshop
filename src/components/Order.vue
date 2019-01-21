<template>
    <div class="goods">
        <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/order">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 查询订单 -->
      <div class="search">
       <el-input placeholder="订单号" v-model="input3">
       <template slot="prepend">订单号:</template>
       </el-input>
        <el-button type="primary">查询</el-button>
     </div>
      <!-- 表格 -->
    <el-table
     stripe
     border
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="number"
      label="订单号"
      width="500">
    </el-table-column>
    <el-table-column
      prop="state"
      label="订单状态"
      width="250">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="200">
    </el-table-column>
    <el-table-column
      prop="data"
      label="创建时间"
      width="400">
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button @click="showEdit(scope.row)" type="primary" size="small"  round>查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  background
  :total="1000">
</el-pagination>
<!-- 查看 -->
  <el-dialog
      title="查看详情"
      :visible.sync="editDialogVisible"
      width="40%">
      <!-- 表单组件 -->
      <el-form ref="editForm" status-icon :model="editForm" label-width="80px">
        <el-form-item label="订单号">
          <el-tag type="info">{{editForm.number}}</el-tag>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-tag type="info">{{editForm.state}}</el-tag>
        </el-form-item>
        <el-form-item label="价格">
          <el-tag type="info">{{editForm.price}}</el-tag>
        </el-form-item>
         <el-form-item label="创建时间">
          <el-tag type="info">{{editForm.data}}</el-tag>
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
      input3: '',
      tableData3: [{
        number: '20190111115800099',
        state: '未付款',
        price: '9',
        data: '2019-01-11 11:58:00'
      },
      {
        number: '20190111115914204',
        state: '未付款',
        price: '9',
        data: '2019-01-11 11:58:00'
      },
      {
        number: '20190111115914786',
        state: '未付款',
        price: '9',
        data: '2019-01-11 11:58:00'
      },
      {
        number: '20190111115914786',
        state: '未付款',
        price: '9',
        data: '2019-01-11 11:58:00'
      },
      {
        number: '20190111115914786',
        state: '未付款',
        price: '9',
        data: '2019-01-11 11:58:00'
      },
      {
        number: '20190111115914786',
        state: '未付款',
        price: '9',
        data: '2019-01-11 11:58:00'
      }
      ],
      multipleSelection: [],
      editDialogVisible: false,
      editForm: {
        number: '',
        state: '',
        price: '',
        data: ''
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    showEdit (row) {
      this.editDialogVisible = true
      console.log(row)
    }
  }
}
</script>

<style lang="less" scoped>
.goods{
   .search{
    .el-input{
        width: 300px;
    }
    .el-button{
        margin-left:10px;
    }
   }
   .el-table{
       margin-top:10px;
   }
}
</style>
