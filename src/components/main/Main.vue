<template>
  <div>
    <el-row :gutter="20">
      <!--Log的存放地址(开始)-->
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <h1>LOG</h1>
        </div>
      </el-col>
      <!--Log的存放地址(结束)-->
      <!--导航菜单顶栏（开始）-->
      <el-col :span="21">
        <div class="grid-content bg-purple">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <!--导航菜单顶栏（结束）-->
    </el-row>
    <el-row :gutter="20">
      <!--导航菜单侧栏（开始）-->
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-col :span="12">
            <el-menu
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">查看新增用户</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">修改用户权限</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>留言管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">留言</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>缅怀英烈管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">增加缅怀英烈</el-menu-item>
                  <el-menu-item index="3-2">查看缅怀英烈</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
      </el-col>
      <!--导航菜单侧栏（结束）-->
      <!--内容变换（开始）-->
      <el-col :span="21">
        <div class="grid-content bg-purple">

        </div>
      </el-col>
      <!--内容变换（结束）-->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      isCollapse: true,
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo{
  width: 200px;
  min-height: 400px;
}
</style>
