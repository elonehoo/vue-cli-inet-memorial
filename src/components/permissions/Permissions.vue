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
              <span>{{ scope.row.nickName }}</span>
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
              <span>{{ scope.row.role }}</span>
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
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10">
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
      tableData: [{
        id:'1'
        ,nickName:'晓寻遥1'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }, {
        id:'2'
        ,nickName:'晓寻遥2'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }, {
        id:'3'
        ,nickName:'晓寻遥3'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }, {
        id:'4'
        ,nickName:'晓寻遥4'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      },{
        id:'5'
        ,nickName:'晓寻遥5'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }, {
        id:'6'
        ,nickName:'晓寻遥6'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }, {
        id:'7'
        ,nickName:'晓寻遥7'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }, {
        id:'8'
        ,nickName:'晓寻遥8'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }, {
        id:'9'
        ,nickName:'晓寻遥9'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }, {
        id:'10'
        ,nickName:'晓寻遥10'
        ,email:'huchengyea@163.com'
        ,telephone:'17605818915'
        ,gmt_create:'2020-12-26 09:55:22'
        ,role:'学生'
      }],
      form:[],
      currentPage: 1,
      dialogFormVisible:false
    }
  },
  methods:{
    /**
     * 删除按钮的事件
     *
     * @author HCY
     * @since 2021/1/20 下午4:08
     * @param id: 序号
     * @return null
     */
    TableDelete(id,data){
      this.$confirm('此操作将该用户（'+ data.nickName  + '）永久升级成为管理员, 是否继续?', '提示', {
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
  }
}
</script>

<style scoped>
.rowTop{
  margin-top: 10px;
}
</style>
