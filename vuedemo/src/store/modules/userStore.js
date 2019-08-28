import service from "@/services/userService.js";

export const namespaced = true;

export const state = {
  users: []
};

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  }
};

export const actions = {
  fetch({ commit }) {
    service.getAll().then(response => {
      commit("SET_USERS", response.data);
    });
    /*.catch(error => {
        console.log("DB Conn FAILED");
        /*const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message
        };
        dispatch("notification/add", notification, { root: true });
    });*/
  }
};
