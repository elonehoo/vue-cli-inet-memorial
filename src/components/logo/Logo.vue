<template>
  <div>
    <el-row :gutter="20" class="top">
      <!--文章数目（开始）-->
      <el-col :span="6" :offset="3">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center">
              <span>文章数目</span>
            </div>
            <div class="text item" style="text-align: center">
              {{cardValue.articleTotal}}
            </div>
          </el-card>
        </div>
      </el-col>
      <!--文章数目（结束）-->
      <!--新闻资讯（开始）-->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center">
              <span>新闻资讯</span>
            </div>
            <div class="text item" style="text-align: center">
              {{cardValue.newsTotal}}
            </div>
          </el-card>
        </div>
      </el-col>
      <!--新闻资讯（结束）-->
      <!--缅怀英烈（开始）-->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center">
              <span>缅怀英烈</span>
            </div>
            <div class="text item" style="text-align: center">
              {{cardValue.heroesTotal}}
            </div>
          </el-card>
        </div>
      </el-col>
      <!--缅怀英烈（结束）-->
    </el-row>
    <el-row :gutter="20" class="top">
      <!--红色讲堂（开始）-->
      <el-col :span="6" :offset="3">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center">
              <span>红色讲堂</span>
            </div>
            <div class="text item" style="text-align: center">
              {{cardValue.classroomTotal}}
            </div>
          </el-card>
        </div>
      </el-col>
      <!--红色讲堂（结束）-->
      <!--视频特辑（结束）-->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center">
              <span>视频特辑</span>
            </div>
            <div class="text item" style="text-align: center">
              {{cardValue.videoTotal}}
            </div>
          </el-card>
        </div>
      </el-col>
      <!--视频特辑（结束）-->
      <!--评论（结束）-->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center">
              <span>评论</span>
            </div>
            <div class="text item" style="text-align: center">
              {{cardValue.commentsTotal}}
            </div>
          </el-card>
        </div>
      </el-col>
      <!--评论（结束）-->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Logo",
  data(){
    return{
      cardValue:{
        articleTotal:'1',
        newsTotal:'2',
        heroesTotal:'3',
        classroomTotal:'4',
        videoTotal:'5',
        commentsTotal:'6',
      }
    }
  }
}
</script>

<style scoped>
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.top{
  margin-top: 20px;
}
</style>
