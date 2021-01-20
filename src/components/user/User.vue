<template>
  <div style="width: 900px; margin-left: 50px">
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
          width="180">
          <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.telephone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.gmt_create }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="TableEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="删除" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="TableDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      }]
    }
  },
  methods:{
    TableEdit(id){
      console.log(id)
    },
    TableDelete(id){
      console.log(id);
    }
  }
}
</script>

<style scoped>

</style>
