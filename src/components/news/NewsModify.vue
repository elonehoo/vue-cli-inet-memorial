<template>
  <div>
    <el-row :gutter="20" class="top">
      <el-col :span="21" :offset="1">
        <div class="grid-content bg-purple">
          <el-input v-model="editData.headline" placeholder="请输入标题"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="top">
      <el-col :span="21" :offset="1">
        <div class="grid-content bg-purple">
          <mavon-editor  ref="md" @imgAdd="$imgAdd" :toolbars="toolbars" v-model="editData.content" style="height: 700px"></mavon-editor>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="top">
      <el-col :span="7" :offset="15">
        <div class="grid-content bg-purple" style="text-align: right">
          <el-button type="danger" @click="Clear()">取消</el-button>
          <el-button type="primary" @click="Determine()">确定</el-button>
        </div>

        <el-drawer
          title="发布文章"
          :visible.sync="dialog"
          direction="rtl"
          :before-close="DialogClose">
          <!--选择框（开始）-->
          <el-row :gutter="20">
            <el-col :span="18" :offset="3">
              <div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入新闻地点"
                  v-model="editData.site"
                  clearable>
                </el-input>
              </div>
            </el-col>
          </el-row>
          <!--选择框（结束）-->
          <!--图片（开始）-->
          <el-row :gutter="20">
            <el-col :span="18" :offset="3" style="margin-top: 10px">
              <div style="text-align: center">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:4949/memorial/admins/upload"
                  :show-file-list="false"
                  :on-success="ImagesSuccess">
                  <img v-if="editData.photograph" :src="editData.photograph" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-col>
          </el-row>
          <!--图片（结束）-->
          <!--图片输入框（开始）-->
          <el-row :gutter="20">
            <el-col :span="18" :offset="3" style="margin-top: 10px">
              <div style="text-align: center">
                <el-input v-model="editData.photograph" placeholder="请输入图片的URL"></el-input>
              </div>
            </el-col>
          </el-row>
          <!--图片输入框（结束）-->
          <!--按钮框（开始）-->
          <el-row :gutter="20">
            <el-col :span="18" :offset="3" style="margin-top: 10px">
              <div class="grid-content bg-purple" style="text-align: right">
                <el-button type="danger" @click="OnClear()">清空</el-button>
                <el-button type="primary" @click="OnRelease()">修改</el-button>
              </div>
            </el-col>
          </el-row>
          <!--按钮框（结束）-->
        </el-drawer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: "NewsAppend",
  data(){
    return{
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        // htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      dialog:false,
      editData:{
        headline:'',
        content:'',
        site:'',
        photograph:'',
      }
    }
  },
  components: {
    mavonEditor
  },
  methods:{
    /**
     * 取消按钮
     *
     * @author HCY
     * @since 2021/1/22 下午3:53
     */
    Clear(){
      this.$confirm('此操作将清空该文章内容和标题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify.success({
          title: '消息',
          message: '已经清空成功'
        });
        this.content = '';
        this.title = '';
      }).catch(() => {
        this.$notify.info({
          title: '消息',
          message: '已取消清空'
        });
      });
    },
    /**
     * 确定按钮
     *
     * @author HCY
     * @since 2021/1/22 下午3:57
     */
    Determine(){
      this.dialog = true
    },
    /**
     * 上传图片
     *
     * @author HCY
     * @since 2021/1/22 下午4:19
     * @param pos: 第几张图片
     * @param $file: 图片的具体信息
     */
    $imgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      let that = this;
      var formdata = new FormData();
      formdata.append('file', $file);
      this.$http({
        url: 'http://localhost:4949/memorial/admins/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        var url = response.data.message.url;
        this.$refs.md.$img2Url(pos, url);
      })
    },
    DialogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$notify.info({
            title: '消息',
            message: '关闭了文章上传'
          });
          this.imageUrl = '';
          this.typeId = '';
        })
        .catch(_ => {
          this.$notify.info({
            title: '消息',
            message: '继续发布文章'
          });
        });
    },
    /**
     * 图片上传成功的钩子
     * @author HCY
     * @since 2021/1/22 下午6:54
     */
    ImagesSuccess(res, file){
      this.editData.photograph = res.message.url
    },
    /**
     * 抽屉内的清空按钮
     * @author HCY
     * @since 2021/1/22 下午7:01
     */
    OnClear(){
      this.$confirm('此操作将清空该新闻的地点和图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify.success({
          title: '消息',
          message: '已经清空成功'
        });
        this.imageUrl = '';
        this.site = '';
      }).catch(() => {
        this.$notify.info({
          title: '消息',
          message: '已取消清空'
        });
      });

    },
    /**
     * 抽屉内的修改按钮
     * @author HCY
     * @since 2021/1/22 下午7:02
     */
    OnRelease(){
      let that = this;
      this.$http.put('admins/journalism', {
        id:that.editData.id,
        content:that.editData.content,
        headline:that.editData.headline,
        photograph:that.editData.photograph,
        site:that.editData.site
      }).then(function (response) {
          console.log(response);
          if (response.data.status === 200){
            that.$notify.success({
              title: '消息',
              message: response.data.message
            });
            that.$router.push("NewsView");
          }else {
            that.$notify.info({
              title: '消息',
              message: response.data.message
            });
          }
      })
    },
    show(){
      let that = this;
      this.$http.get('admins/newById', {
        params: {
          id: localStorage.getItem("newsId")
        }
      }).then(function (response) {
          that.editData = response.data.message
      })
    },
  },
  created() {
    this.show();
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
/*上传图片（开始）*/
.avatar-uploader{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 425px;
  height: 250px;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 425px;
  height: 250px;
  display: block;
}
/*上传图片（结束）*/
</style>
