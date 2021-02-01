<template>
  <div>
    <!--搜索（开始）-->
    <el-row :gutter="20" class="top">
      <el-col :span="7" :offset="1">
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
          选择类别：
          <el-select v-model="typeId" clearable placeholder="请选择">
            <el-option
              v-for="item in selectData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple" style="text-align: center">
          <el-button type="primary" round plain @click="Query(typeId,search)">查询</el-button>
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
              label="类别"
              width="200">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.categoryName }}</el-tag>
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
  name: "ArticleView",
  data(){
    return{
      search:'',
      typeId:'',
      selectData:[],
      tableData:[],
      page:{},
    }
  },
  methods:{
    /**
     * 查询按钮的操作
     *
     * @author HCY
     * @since 2021/1/22 下午12:59
     * @param typeId: 类别的序号
     * @param search: 查询的名字
    */
    Query(typeId,search){
      this.paging(1,this.page.pageSize,typeId,search);
    },
    /**
     * 重置按钮
     *
     * @author HCY
     * @since 2021/1/22 下午1:04
    */
    Clear(){
      this.typeId = '';
      this.search = '';
      this.paging(1,this.page.pageSize,this.typeId,this.search);
    },
    /**
     * 写文章的按钮
     *
     * @author HCY
     * @since 2021/1/22 下午1:06
    */
    WriteArticle(){
      this.$router.push("ArticleAppend")
    },
    /**
     * 修改按钮
     *
     * @author HCY
     * @since 2021/1/22 下午1:08
     * @param data: 修改的
    */
    TableEdit(data){
      localStorage.setItem("editId",data.id);
      this.$router.push("ArticleModify");
    },
    /**
     * 删除操作
     * @author HCY
     * @since 2021/1/22 下午1:20
     * @param data:
    */
    TableDelete(data){
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        this.$http.delete('admins/article', {
          params: {
            articleId:data.id
          }
        }).then(function (response) {
          if (response.data.status === 200){
            that.$notify.success({
              title: '消息',
              message:response.data.message
            });
            that.paging(that.page.pageCurrent,that.page.pageSize,that.typeId,that.search)
          }
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
     *
     * @author HCY
     * @since 2021/1/23 下午5:28
     * @param val: 条目数
    */
    PaginationSizeChange(val){
      this.paging(1,val,this.typeId,this.search);
    },
    /**
     * 修改页数
     *
     * @author HCY
     * @since 2021/1/23 下午5:29
     * @param val: 页数
    */
    PaginationCurrentChange(val){
      this.paging(val,this.page.pageSize,this.typeId,this.search);
    },
    /**
     * 查看所有的类别
     * @author HCY
     * @since 2021/1/30 下午1:34
    */
    showTypes(){
      let that = this;
      this.$http.get('admins/articleCategory', {
      }).then(function (response) {
        that.selectData = response.data.message;
      })
    },
    /**
     * 这是一个翻页的方法
     * @author HCY
     * @since 2021/1/30 下午1:24
    */
    paging(current,size,categoryId,name){
      let that = this;
      this.$http.get('admins/article', {
        params: {
          categoryId:categoryId,
          current:current,
          name:name,
          size:size
        }
      }).then(function (response) {
          that.tableData = response.data.message.information;
          that.page = response.data.message;
      })
    },
    show(){
      this.paging(1,10,"","");
      this.showTypes();
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
