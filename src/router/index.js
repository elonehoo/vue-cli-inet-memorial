import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/login/Login";
import Main from "../components/main/Main";
import User from "../components/user/User";
import Permissions from "../components/permissions/Permissions";
import Type from "../components/type/Type";
import ArticleView from "../components/article/ArticleView";
import ArticleAppend from "../components/article/ArticleAppend";
import NewsView from "../components/news/NewsView";
import NewsAppend from "../components/news/NewsAppend";
Vue.use(Router)

export default new Router({
  routes: [
      { path: '/', name: 'Login', component: Login}
    , { path: '/Login', name: 'Login', component: Login}
    , { path: '/Main', name: 'Main', component: Main,
        children:[
           {path:"User",component:User}
          ,{path: "Permissions",component: Permissions}
          ,{path: "Type",component: Type}
          ,{path: "ArticleView",component: ArticleView}
          ,{path: "ArticleAppend",component: ArticleAppend}
          ,{path: "NewsView",component: NewsView}
          ,{path: "NewsAppend",component: NewsAppend}
        ]
      }
  ]
})
