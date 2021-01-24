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
      this.$router.push("/Main/Logo")
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
