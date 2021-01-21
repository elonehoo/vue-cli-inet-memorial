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
                v-model="form.typeName"
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
        typeName:''
        ,typeId:''
      },
      items:[
         {id:'1',name:'红色讲堂'}
        ,{id:'2',name:'视频特辑'}
        ,{id:'3',name:'文章'}
      ],
      tableData:[
         {id:'1',name:'致敬老兵',typeName:'文章',total:'5'}
        ,{id:'2',name:'红色讲堂',typeName:'红色讲堂',total:'4'}
        ,{id:'3',name:'烈士名单',typeName:'文章',total:'7'}
        ,{id:'4',name:'网上祭奠',typeName:'文章',total:'6'}
        ,{id:'5',name:'揭秘历史',typeName:'文章',total:'1'}
        ,{id:'6',name:'国家记忆',typeName:'文章',total:'3'}
        ,{id:'7',name:'视频特辑',typeName:'视频特辑',total:'2'}
      ],
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
      if (this.form.typeName == '' || this.form.typeId == ''){
        this.$notify.info({
          title: '消息',
          message: '创建失败，内容为空'
        });
      }else{
        this.$notify.success({
          title: '消息',
          message: '创建成功'
        });
      }
    },
    /**
     * 取消按钮的操作
     *
     * @author HCY
     * @since 2021/1/21 下午2:11
    */
    cancel(){
      this.form = {};
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
        this.form.typeName = data.name;
        this.form.typeId = data.typeName;
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

    },
    /**
     * 修改按钮的操作
     * @author HCY
     * @since 2021/1/21 下午2:25
    */
    modify(data){
      this.$notify.success({
        title: '信息',
        message: '修改成功'
      });
      this.form = {};
      this.titleTest = false;
    },
    /**
     * 返回按钮的操作
     *
     * @author HCY
     * @since 2021/1/21 下午2:23
    */
    goBack(data){
      this.$confirm('此操作将放弃修改该类别('+ data.typeName +'), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form = {};
        this.titleTest = false;
        this.$notify.info({
          title: '信息',
          message: '取消修改'
        });
      }).catch(() => {});
    }
  }
}
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
