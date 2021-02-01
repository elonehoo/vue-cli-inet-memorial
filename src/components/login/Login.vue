<template>
  <div class="container">
    <div class="dialog">
      <p class="landing">登陆</p>
      <el-form ref="form" :model="form" label-width="80px" label-position="right">
        <el-form-item label="账号">
          <el-input v-model="form.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.cipher" clearable show-password></el-input>
        </el-form-item>
        <el-button class="landingButton" type="primary" v-on:click="login(form)">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      form:{
        account:"",
        cipher:""
      }
    }
  },
  methods:{
    /**
     * 登陆按钮的事件
     * @author HCY
     * @since 2021/7/17 20:27:40
     */
    login(form){
      //存储this
      let  that = this;
      //进行登陆的post请求
      this.$http.post("users/loginUser",{
          //设置账号
          email:form.account,
          //设置密码
          password:form.cipher
      }).then(function (response) {
        //判断是否登陆成功
        if (response.data.status === 200){
          //判断权限是否是admin
          if (response.data.message.roleName === "admin"){
            //前端存储token
            localStorage.setItem("token",response.data.message.token);
            //弹出提示层
            that.$message.success(response.data.message.info);
            //进行路由的转换
            that.$router.push("/Main/Logo")
          }else{
            //权限错误
            that.$message.info("您没有管理员的权限")
          }
        }else {
          //账号或者密码错误
          that.$message.info(response.data.message)
        }
      });
    }
  }
}
</script>

<style scoped>
    /**
     * 定义绝对居中的CSS样式
     * @author HCY
     * @since 2021/7/17 19:58:58
     */
    .container {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      text-align: center;
      font-size: 0;
      white-space: nowrap;
      overflow: auto;
    }

    .container:after {
      content: '';
      display: inline-block;
      height: 75%;
      vertical-align: middle;
    }

    .dialog {
      display: inline-block;
      vertical-align: middle;
      text-align: left;
      font-size: 14px;
      white-space: normal;
    }
    /**
     * 定义按钮的居中
     * @author HCY
     * @since 2021/7/17 19:59:50
     */
    .landingButton{
      margin-left: 130px;
    }
    /**
     * 定义文本的居中
     * @author HCY
     * @since 2021/7/17 20:01:27
     */
    .landing{
      margin-left: 150px;
    }
</style>
