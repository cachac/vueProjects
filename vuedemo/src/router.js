import Vue from "vue";
import Router from "vue-router";
import homeView from "./views/homeView.vue";
import userList from "./views/userView.vue";
import bitacoraList from "./views/bitacoraView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: homeView
    },
    {
      path: "/users",
      name: "userList",
      component: userList
    },
    {
      path: "/bitacora",
      name: "bitacoraList",
      component: bitacoraList
    }
  ]
});
