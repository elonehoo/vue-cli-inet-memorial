<template>
  <el-row class="rowTop">
    <el-col :span="12" :offset="7">
      <div class="grid-content bg-purple rowTop">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="用户名"
            width="230">
            <template slot-scope="scope">
              <span>{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱"
            width="230">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="权限名称"
            width="230">
            <template slot-scope="scope">
              <span>{{ scope.row.role === 'users' ? "用户":"管理员" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="修改" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="TableDelete(scope.row.id,scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple rowTop" style="text-align: center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageCurrent"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.pageTotal">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "permissions",
  data() {
    return {
      tableData: [],
      form:[],
      page: {},
      dialogFormVisible:false
    }
  },
  methods:{
    /**
     * 修改按钮的事件
     *
     * @author HCY
     * @since 2021/1/20 下午4:08
     * @param id: 序号
     * @return null
     */
    TableDelete(id,data){
      this.$confirm('此操作将该用户（'+ data.nickname  + '）永久升级成为管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        this.$http.put('admins/users', {
          id: id,
        }).then(function (response) {
            that.$notify({
              title: '信息',
              message: response.data.message,
              type: 'success'
            });
            if (response.data.status === 200) {
              that.pageing(that.page.pageCurrent,that.page.pageSize);
            }
          })
      }).catch(() => {
        this.$notify.info({
          title: '消息',
          message: '已取消修改'
        });
      });

    },
    /**
     * 修改条目数的方法
     *
     * @author HCY
     * @since 2021/1/20 下午4:15
     * @param val: 条目数
     * @return null
     */
    handleSizeChange(val) {
      this.pageing(this.page.pageCurrent,val);
    },
    /**
     * 修改页数的方法
     * @author HCY
     * @since 2021/1/20 下午4:15
     * @param val: 页数
     * @return null
     */
    handleCurrentChange(val) {
      this.pageing(val,this.page.pageSize)
    },
    /**
     * 取消修改用户的方法
     *
     * @author HCY
     * @since 2021/1/20 下午5:22
     */
    EditClose(){
      this.dialogFormVisible = false;
      this.$notify.info({
        title: '消息',
        message: '取消修改'
      });
    },
    /**
     * 确定修改用户的方法
     *
     * @author HCY
     * @since 2021/1/20 下午5:22
     */
    EditDetermine(){
      this.dialogFormVisible = false;
      this.$notify({
        title: '信息',
        message: '修改成功',
        type: 'success'
      });
    },
    pageing(current,size){
      let that = this;
      // 可选地，上面的请求可以这样做
      this.$http.get('admins/users', {
        params: {
          current:current,
          size:size
        }
      }).then(function (response) {
          that.tableData = response.data.message.information;
          that.page = response.data.message;
        })
    },
    show(){
      this.pageing(1,10);
    },
  },
  created() {
    this.show();
  }
}
</script>

<style scoped>
.rowTop{
  margin-top: 10px;
}
</style>
