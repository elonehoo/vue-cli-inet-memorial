<template>
  <div>
    <!--搜索（开始）-->
    <el-row :gutter="20" class="top">
      <el-col :span="7" :offset="1">
        <div class="grid-content bg-purple" style="text-align: center">
          视频的标题：
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
          <el-button type="primary" icon="el-icon-upload" @click="WriteArticle()">上传视频</el-button>
        </div>
        <el-drawer
          title="上传视频"
          :visible.sync="dialog"
          :before-close="DialogClose">
          <el-row :gutter="20" class="top">
            <el-col :span="16" :offset="4">
              <div class="grid-content bg-purple">
                <el-input v-model="title" placeholder="请输入视频标题"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="top">
            <el-col :span="16" :offset="4">
              <div class="grid-content bg-purple">
                <el-tag effect="plain"> 选择添加的类别 </el-tag>
                <el-select v-model="searchTypeId" clearable placeholder="请选择">
                  <el-option
                    v-for="item in selectData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="top">
            <el-col :span="16" :offset="4">
              <div class="grid-content bg-purple"  style="text-align: center">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-success="imageSuccess"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="top">
            <el-col :span="16" :offset="4">
              <div class="grid-content bg-purple"  style="text-align: right">
                <el-button type="danger" icon="el-icon-circle-close" plain @click="Clearing()">取消</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="Uploading()">上传</el-button>
              </div>
            </el-col>
          </el-row>
        </el-drawer>
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
  name: "VideoView",
  data(){
    return{
      title:'',
      search:'',
      searchTypeId:'',
      typeId:'',
      tableData:[
        {id:'1',name:"视频1",typeName:'视频',className:'视频特辑'}
        ,{id:'2',name:"视频2",typeName:'视频',className:'红色讲堂'}
        ,{id:'3',name:"视频3",typeName:'视频',className:'视频特辑'}
        ,{id:'4',name:"视频4",typeName:'视频',className:'红色讲堂'}
        ,{id:'5',name:"视频5",typeName:'视频',className:'视频特辑'}
        ,{id:'6',name:"视频6",typeName:'视频',className:'红色讲堂'}
        ,{id:'7',name:"视频7",typeName:'视频',className:'视频特辑'}
        ,{id:'8',name:"视频8",typeName:'视频',className:'红色讲堂'}
        ,{id:'9',name:"视频9",typeName:'视频',className:'视频特辑'}
        ,{id:'10',name:"视频10",typeName:'视频',className:'红色讲堂'}
      ],
      selectData:[
         {id:'1',name:'红色讲堂',typeName:'视频'}
        ,{id:'2',name:'视频特辑',typeName:'视频'}
      ],
      currentPage:1,
      dialog:false,
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
     * 上传视频的按钮
     *
     * @author HCY
     * @since 2021/1/22 下午1:06
     */
    WriteArticle(){
      this.dialog = true;
    },
    /**
     * 关闭抽屉
     * @author HCY
     * @since 2021/1/23 上午11:55
    */
    DialogClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.$notify.info({
              title: '消息',
              message: '已取消上传'
            });
          })
          .catch(_ => {});
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
     * 抽屉内的上传按钮
     * @author HCY
     * @since 2021/1/23 下午5:38
    */
    Uploading(){

    },
    /**
     * 抽屉内的取消按钮
     * @author HCY
     * @since 2021/1/23 下午5:40
    */
    Clearing(){

    },
    /**
     * 删除操作
     * @author HCY
     * @since 2021/1/22 下午1:20
     * @param data:
     */
    TableDelete(data){
      this.$confirm('此操作将永久删除该视频（' + data.name + '）,是否继续?', '提示', {
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
     * @author HCY
     * @since 2021/1/23 上午11:54
     * @param val: 修改的条目数
    */
    PaginationSizeChange(val){
      console.log(`每页 ${val} 条`);
    },
    /**
     * 修改页数
     * @author HCY
     * @since 2021/1/23 上午11:54
     * @param val: 页数
     */
    PaginationCurrentChange(val){
      console.log(`当前页: ${val}`);
    },
    /**
     * 文件上传成功
     *
     * @author HCY
     * @since 2021/1/23 下午1:13
     * @param response:返回的信息
     * @param file:文件的信息
    */
    imageSuccess(response, file,){

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
