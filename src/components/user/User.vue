<template>
  <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="用户名"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="TableEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="TableDelete()">删除</el-button>
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
      },]
    }
  },
  methods:{
    TableEdit(id){
      console.log(id)
    },
    TableDelete(){

    }
  }
}
</script>

<style scoped>

</style>
