<template>
  <el-row :gutter="20">
    <el-col :span="4" :offset="2">
      <div class="grid-content bg-purple">
        <div v-if="titleTest == false">
          <h3>添加类别</h3>
        </div>
        <div v-else>
          <h3>修改类别</h3>
        </div>
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类别名称" label-width="80px">
              <el-input
                placeholder="请输入内容"
                v-model="form.name"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="类别所属">
              <el-select v-model="form.typeId" placeholder="请选择">
                <el-option
                  v-for="item in items"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="titleTest == false">
              <el-button type="primary" @click="establish(form)">立即创建</el-button>
              <el-button @click="cancel()">取消</el-button>
            </el-form-item>
            <el-form-item v-else>
              <el-button type="primary" @click="modify(form)">立即修改</el-button>
              <el-button @click="goBack(form)">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
    <el-col :span="16" :offset="1">
      <div class="grid-content bg-purple">
        <div>
          <h3>列别列表</h3>
        </div>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="类别名字"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="类别所属"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="数目"
              width="180">
              <template slot-scope="scope">
                <el-tag>{{scope.row.total}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Type",
  data(){
    return{
      form:{
         id:''
        ,name:''
        ,typeId:''
      },
      items:[],
      tableData:[],
      titleTest:false
    }
  },
  methods:{
    /**
     * 立即创建按钮的操作
     *
     * @author HCY
     * @since 2021/1/21 下午1:40
     * @param data: 注册的内容
    */
    establish(data){
      if (this.form.name == '' || this.form.typeId == ''){
        this.$notify.info({
          title: '消息',
          message: '创建失败，内容为空'
        });
      }else{
        let that = this;
        this.$http.post('admins/category', {
            name: data.name,
            type_id:data.typeId
        })
          .then(function (response) {
            console.log(response);
            if (response.data.status === 200){
              that.$notify.success({
                title: '消息',
                message: response.data.message
              });
              that.show();
              that.form={
                   id:''
                  ,name:''
                  ,typeId:''
              }
            }
          })

      }
    },
    /**
     * 取消按钮的操作
     *
     * @author HCY
     * @since 2021/1/21 下午2:11
    */
    cancel(){
      this.form = {
        id:''
        ,name:''
        ,typeId:''
      };
    },
    /**
     * 修改按钮的操作
     *
     * @author HCY
     * @since 2021/1/21 下午2:16
     * @param data: 数据
    */
    handleEdit(data){
      if (this.titleTest ==true){
        this.$notify.info({
          title: '消息',
          message: '本次修改还未结束哦'
        });
      }else {
        this.titleTest = true;
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.typeId = data.type_id;
      }
    },
    /**
     * 删除按钮的操作
     *
     * @author HCY
     * @since 2021/1/21 下午2:16
     * @param data:
    */
    handleDelete(data){
      this.$confirm('此操作将删除该类别('+ data.name +'), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        this.$http.delete('admins/category', {
          params: {
            categoryId: data.id
          }
        })
          .then(function (response) {
            if (response.data.status === 200){
              that.$notify.success({
                title: '信息',
                message: response.data.message
              });
              that.show();
            }
          })

      }).catch(() => {
        this.$notify.info({
          title: '信息',
          message: '放弃删除'
        });
      });
    },
    /**
     * 修改按钮的操作
     * @author HCY
     * @since 2021/1/21 下午2:25
    */
    modify(data){
      let that = this;
      this.$http.put('admins/category', {
          id:data.id,
          type_id:data.typeId,
          name:data.name
      })
        .then(function (response) {
          if (response.data.status === 200){
            that.$notify.success({
              title: '信息',
              message: response.data.message,
            });
            that.show();
            that.titleTest = false;
            that.form = {
               id:''
              ,name:''
              ,typeId:''
            };
          }
          console.log(response);
        })
    },
    /**
     * 返回按钮的操作
     *
     * @author HCY
     * @since 2021/1/21 下午2:23
    */
    goBack(data){
      this.$confirm('此操作将放弃修改该类别('+ data.name +'), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form = {
           id:''
          ,name:''
          ,typeId:''
        };
        this.titleTest = false;
        this.$notify.info({
          title: '信息',
          message: '取消修改'
        });
      }).catch(() => {});
    },
    show(){
      let that = this;
      this.$http.get('admins/category')
        .then(function (response) {
          that.tableData = response.data.message;
        })
      this.$http.get('admins/type')
        .then(function (response) {
          that.items = response.data.message;
        })
    }
  },
  created() {
    this.show()
  }
}
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
