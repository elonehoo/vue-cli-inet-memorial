<template>
  <div>
    <el-row type="flex">
      <el-col :span="1.5">
        <!--导航菜单侧栏（开始）-->
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-col :span="12">
              <el-menu
                class="el-menu-vertical-demo"
                :router="true"
                :collapse="isCollapse">
                <!--Log的存放地址(开始)-->
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">LOGO</span>
                </el-menu-item>
                <!--Log的存放地址(结束)-->
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1" route="/Main/User">查看新增用户</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-position"></i>
                    <span>权限管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1" route="/Main/Permissions">修改用户权限</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-chat-line-round"></i>
                    <span>留言管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">留言</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-discover"></i>
                    <span>类别管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="4-1">新增类别</el-menu-item>
                    <el-menu-item index="4-2">查看类别</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-medal"></i>
                    <span>缅怀英烈管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="5-1">增加缅怀英烈</el-menu-item>
                    <el-menu-item index="5-2">查看缅怀英烈</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                  <template slot="title">
                    <i class="el-icon-map-location"></i>
                    <span>网上祭奠管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="6-1">增加网上祭奠</el-menu-item>
                    <el-menu-item index="6-2">查看网上祭奠</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                  <template slot="title">
                    <i class="el-icon-service"></i>
                    <span>红色讲堂管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="7-1">增加红色讲堂</el-menu-item>
                    <el-menu-item index="7-2">查看红色讲堂</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="8">
                  <template slot="title">
                    <i class="el-icon-postcard"></i>
                    <span>烈士名单管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="8-1">增加烈士名单</el-menu-item>
                    <el-menu-item index="8-2">查看烈士名单</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="9">
                  <template slot="title">
                    <i class="el-icon-monitor"></i>
                    <span>视频特辑管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="9-1">增加视频特辑</el-menu-item>
                    <el-menu-item index="9-2">查看视频特辑</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="10">
                  <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>揭秘历史管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="10-1">增加揭秘历史</el-menu-item>
                    <el-menu-item index="10-2">查看揭秘历史</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="11">
                  <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span>揭秘历史管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="11-1">增加揭秘历史</el-menu-item>
                    <el-menu-item index="11-2">查看揭秘历史</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="12">
                  <template slot="title">
                    <i class="el-icon-collection"></i>
                    <span>国家记忆管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="12-1">增加国家记忆</el-menu-item>
                    <el-menu-item index="12-2">查看国家记忆</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="13">
                  <template slot="title">
                    <i class="el-icon-trophy"></i>
                    <span>致敬老兵管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="13-1">增加致敬老兵</el-menu-item>
                    <el-menu-item index="13-2">查看致敬老兵</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="14">
                  <template slot="title">
                    <i class="el-icon-brush"></i>
                    <span>新闻管理管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="14-1">增加新闻管理</el-menu-item>
                    <el-menu-item index="14-2">查看新闻管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
            <!--导航菜单侧栏（结束）-->
          </div>
        </el-col>
      </el-col>
      <el-col :span="23">
        <div class="topMenu">
          <!--导航菜单顶栏（开始）-->
          <div>
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item v-if="isCollapse" index="1">
                <i class="el-icon-s-unfold" v-on:click="reverse()"></i>
              </el-menu-item>
              <el-menu-item v-else index="1">
                <i class="el-icon-s-fold" v-on:click="reverse()"></i>
              </el-menu-item>
              <el-submenu class="rightPhoto" index="2">
                <template slot="title">
                  admin
                </template>
                <el-menu-item index="2-1">个人信息</el-menu-item>
                <el-menu-item index="2-2">退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <!--导航菜单顶栏（结束）-->
          <!--变换的内容(开始)-->
          <div>
            <router-view></router-view>
          </div>
          <!--变换的内容(结束)-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    reverse(){
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse){
  width: 200px;
  min-height: 380px;
}

.rightPhoto{
  float: right;
}
</style>
