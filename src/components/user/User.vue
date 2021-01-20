<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="5">
        <div class="grid-content bg-purple">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="用户名"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.nickName }}</span>
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
                  <el-form :model="form">
                    <el-form-item label="昵称" label-width="60px">
                      <el-input v-model="form.nickName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" label-width="60px">
                      <el-input v-model="form.email" autocomplete="off"></el-input>
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
        <div class="grid-content bg-purple" style="text-align: center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="10">
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
      tableData: [{
         id:'1'
        ,nickName:'晓寻遥1'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }, {
         id:'2'
        ,nickName:'晓寻遥2'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }, {
        id:'3'
        ,nickName:'晓寻遥3'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }, {
        id:'4'
        ,nickName:'晓寻遥4'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      },{
        id:'5'
        ,nickName:'晓寻遥5'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }, {
        id:'6'
        ,nickName:'晓寻遥6'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }, {
        id:'7'
        ,nickName:'晓寻遥7'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }, {
        id:'8'
        ,nickName:'晓寻遥8'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }, {
        id:'9'
        ,nickName:'晓寻遥9'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }, {
        id:'10'
        ,nickName:'晓寻遥10'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
      }],
      form:[],
      currentPage: 1,
      dialogFormVisible:false
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
      this.form = data
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
      this.$confirm('此操作将永久删除该用户（'+ data.nickName  + '）, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '信息',
          message: '已经修改成功',
          type: 'success'
        });
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
      console.log(`每页 ${val} 条`);
    },
    /**
     * 修改页数的方法
     * @author HCY
     * @since 2021/1/20 下午4:15
     * @param val: 页数
     * @return null
    */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
    }
  }
}
</script>

<style scoped>

</style>
