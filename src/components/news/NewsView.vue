<template>
    <div>
      <!--搜索（开始）-->
      <el-row :gutter="20" class="top">
        <el-col :span="7" :offset="5">
          <div class="grid-content bg-purple" style="text-align: center">
            文章的标题：
            <el-input
              placeholder="请输入内容"
              v-model="search"
              prefix-icon="el-icon-search"
              style="width: 70%"
              clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple" style="text-align: center">
            <el-button type="primary" round plain @click="Query(search)">查询</el-button>
            <el-button round plain @click="Clear()">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <!--搜索（结束）-->
      <!--新建文章（开始）-->
      <el-row :gutter="20" class="top">
        <el-col :span="7" :offset="1">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-edit" @click="WriteArticle()">写文章</el-button>
          </div>
        </el-col>
      </el-row>
      <!--新建文章（结束）-->
      <!--表格（开始）-->
      <el-row :gutter="20" class="top">
        <el-col :span="21" :offset="1">
          <div class="grid-content bg-purple">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="标题"
                width="800">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.headline }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="地点"
                width="200">
                <template slot-scope="scope">
                  <el-tag type="success">{{ scope.row.site }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="TableEdit(scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="TableDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!--表格（结束）-->
      <!--分页-->
      <el-row :gutter="20" class="top">
        <el-col :span="21" :offset="1">
          <div class="grid-content bg-purple" style="text-align: center">
            <el-pagination
              @size-change="PaginationSizeChange"
              @current-change="PaginationCurrentChange"
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
  name: "NewsView",
  data() {
    return {
      search: '',
      tableData: [],
      page: {}
    }
  },
  methods:{
    /**
     * 查询按钮的操作
     *
     * @author HCY
     * @since 2021/1/22 下午9:00
     * @param data:
    */
    Query(data){
      this.paging(1,this.page.pageSize,data);
    },
    /**
     * 重置按钮的操作
     *
     * @author HCY
     * @since 2021/1/22 下午9:00
    */
    Clear(){
      this.search = '';
      this.paging(1,this.page.pageSize,this.search);
    },
    /**
     * 写文章的按钮
     *
     * @author HCY
     * @since 2021/1/22 下午1:06
     */
    WriteArticle(){
      this.$router.push("NewsAppend");
    },
    /**
     * 修改按钮
     *
     * @author HCY
     * @since 2021/1/22 下午1:08
     * @param data: 修改的
     */
    TableEdit(data){
      localStorage.setItem("newsId",data.id);
      this.$router.push("NewsModify");
    },
    /**
     * 删除操作
     * @author HCY
     * @since 2021/1/22 下午1:20
     * @param data:
     */
    TableDelete(data){
      this.$confirm('此操作将永久删除该文章('+ data.headline +'), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        this.$http.delete('admins/journalism', {
          params: {
            journalismId:data.id
          }
        }).then(function (response) {
          if (response.data.status === 200){
            that.$notify.success({
              title: '消息',
              message: response.data.message
            });
          }else {
            that.$notify.info({
              title: '消息',
              message: response.data.message
            });
          }
          that.paging(that.page.pageCurrent,that.page.pageSize,that.search)
        })

      }).catch(() => {
        this.$notify.info({
          title: '消息',
          message: '已取消删除'
        });
      });
    },
    /**
     * 修改条目数
     * @author HCY
     * @since 2021/1/23 下午6:12
     * @param val: 条目数
    */
    PaginationSizeChange(val){
      this.paging(1,val,this.search)
    },
    /**
     * 修改页数
     * @author HCY
     * @since 2021/1/23 下午6:13
     * @param val: 页数
    */
    PaginationCurrentChange(val){
      this.paging(val,this.page.pageSize,this.search)
    },
    /**
     * 分页
     * @author HCY
     * @since 2021/1/31 下午1:44
    */
    paging(current,size,name){
      let that = this;
      this.$http.get('admins/journalism', {
        params: {
          current:current,
          name:name,
          size:size
        }
      }).then(function (response) {
          that.tableData = response.data.message.information;
          that.page = response.data.message
      })
    },
    /**
     * 初始化
     * @author HCY
     * @since 2021/1/31 下午1:44
    */
    show(){
      this.paging(1,10,"");
    }
  },
  created() {
    this.show();
  }
}
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.top{
  margin-top: 10px;
}
</style>
