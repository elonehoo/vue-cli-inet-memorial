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
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="分类"
              width="200">
              <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.typeName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="标签"
              width="200">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.className }}</el-tag>
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
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
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
      selectData:[
         {id:'1',name:'致敬老兵',typeName:'文章',total:'5'}
        ,{id:'3',name:'烈士名单',typeName:'文章',total:'7'}
        ,{id:'4',name:'网上祭奠',typeName:'文章',total:'6'}
        ,{id:'5',name:'揭秘历史',typeName:'文章',total:'1'}
        ,{id:'6',name:'国家记忆',typeName:'文章',total:'3'}
      ],
      tableData:[
         {id:'1',name:"文章1",typeName:'文章',className:'致敬老兵'}
        ,{id:'2',name:"文章2",typeName:'文章',className:'烈士名单'}
        ,{id:'3',name:"文章3",typeName:'文章',className:'网上祭奠'}
        ,{id:'4',name:"文章4",typeName:'文章',className:'揭秘历史'}
        ,{id:'5',name:"文章5",typeName:'文章',className:'国家记忆'}
        ,{id:'6',name:"文章6",typeName:'文章',className:'致敬老兵'}
        ,{id:'7',name:"文章7",typeName:'文章',className:'烈士名单'}
        ,{id:'8',name:"文章8",typeName:'文章',className:'网上祭奠'}
        ,{id:'9',name:"文章9",typeName:'文章',className:'揭秘历史'}
        ,{id:'10',name:"文章10",typeName:'文章',className:'国家记忆'}
      ],
      currentPage:1
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
      console.log(typeId);
      console.log(search);
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
    },
    /**
     * 写文章的按钮
     *
     * @author HCY
     * @since 2021/1/22 下午1:06
    */
    WriteArticle(){

    },
    /**
     * 修改按钮
     *
     * @author HCY
     * @since 2021/1/22 下午1:08
     * @param data: 修改的
    */
    TableEdit(data){
      console.log(data)
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
        this.$notify.success({
          title: '消息',
          message: '删除成功'
        });
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
      console.log(`每页 ${val} 条`);
    },
    /**
     * 修改页数
     *
     * @author HCY
     * @since 2021/1/23 下午5:29
     * @param val: 页数
    */
    PaginationCurrentChange(val){
      console.log(`当前页: ${val}`);
    }
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
