<template>
  <div>
    <el-row class="rowTop">
      <el-col :span="14" :offset="5">
        <div class="grid-content bg-purple rowTop">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="用户名"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.nickname }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="邮箱"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="电话"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.telephone }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.gmt_create }}</span>
              </template>
            </el-table-column>
            <el-table-column label="编辑" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="TableEdit(scope.row.id,scope.row)">编辑</el-button>
                <el-dialog title="编辑个人信息" :before-close="DialogClose" :visible.sync="dialogFormVisible" width="600px">
                  <el-form>
                    <el-form-item label="昵称" label-width="60px">
                      <el-input v-model="form.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" label-width="60px">
                      <el-input v-model="form.telephone" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="EditClose()">取 消</el-button>
                    <el-button type="primary" @click="EditDetermine()">确 定</el-button>
                  </div>
                </el-dialog>
              </template>
            </el-table-column>
            <el-table-column label="删除" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="TableDelete(scope.row.id,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="14" :offset="5">
        <div class="grid-content bg-purple primary" style="text-align: center">
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
  </div>

</template>

<script>
export default {
  name: "User",
  data() {
    return {
      tableData: [],
      form:{},
      page: [],
      dialogFormVisible:false,
    }
  },
  methods:{
    /**
     * 修改按钮的事件
     *
     * @author HCY
     * @since 2021/1/20 下午4:07
     * @param id: 序号
     * @return null
    */
    TableEdit(id,data){
      this.form = data;
      this.dialogFormVisible = true;
    },
    /**
     * 删除按钮的事件
     *
     * @author HCY
     * @since 2021/1/20 下午4:08
     * @param id: 序号
     * @return null
    */
    TableDelete(id,data){
      let that = this;
      this.$confirm('此操作将永久删除该用户（'+ data.nickname  + '）, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('admins/users', {
          params: {
            userId: id
          },
        }).then(function (response) {
            that.$notify({
              title: '信息',
              message: response.data.message,
              type: 'success'
            });
            that.pageing(that.page.pageCurrent,that.page.pageSize)
          })
      }).catch(() => {
        this.$notify.info({
          title: '消息',
          message: '已取消删除'
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
      this.pageing(val,this.page.pageSize);
    },
    /**
     * 取消修改用户的方法
     *
     * @author HCY
     * @since 2021/1/20 下午5:22
    */
    EditClose(){
      this.dialogFormVisible = false;
      this.pageing(this.page.pageCurrent,this.page.pageSize)
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
      let that = this;
      this.$http.put('admins/user', {
        id:that.form.id,
        nickname:that.form.nickname,
        telephone:that.form.telephone
      }).then(function (response) {
          var dates = response.data;
          if (dates.status === 200){
            that.dialogFormVisible = false;
            that.$notify({
              title: '信息',
              message: dates.message,
              type: 'success'
            });
          }
        })
      that.pageing(that.page.pageCurrent,that.page.pageSize)
    },
    /**
     * 关闭Dialog
     *
     * @author HCY
     * @since 2021/1/20 下午5:29
    */
    DialogClose(done){
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$notify.info({
            title: '消息',
            message: '取消修改'
          });
        })
        .catch(_ => {}
        );
    },
    show(){
      this.pageing(1,10);
    },
    pageing(current,size){
      let that = this;
      this.$http.get('admins/users',{
        params:{
          "current":current,
          "size":size
        }
      })
        .then(function (response) {
          var dates = response.data.message
          that.tableData = dates.information;
          that.page = dates;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
