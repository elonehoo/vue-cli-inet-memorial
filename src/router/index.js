import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/login/Login";
import Main from "../components/main/Main";
import User from "../components/user/User";
Vue.use(Router)

export default new Router({
  routes: [
      { path: '/', name: 'Login', component: Login}
    , { path: '/Login', name: 'Login', component: Login}
    , { path: '/Main', name: 'Main', component: Main,
        children:[
          {path:"User",component:User}
        ]
      }
  ]
})
