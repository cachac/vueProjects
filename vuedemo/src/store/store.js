import Vue from "vue";
import Vuex from "vuex";
import * as userStore from "@/store/modules/userStore.js";
import * as bitacoraStore from "@/store/modules/bitacoraStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    bitacoraStore
  },
  state: {},
  mutations: {},
  actions: {}
});
