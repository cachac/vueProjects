import service from "@/services/bitacoraService.js";

export const namespaced = true;

export const state = {
  bitacora: []
};

export const mutations = {
  SET_BITACORA(state, bitacora) {
    state.bitacora = bitacora;
  }
};

export const actions = {
  fetch({ commit }) {
    service.getAll().then(response => {
      commit("SET_BITACORA", response.data);
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
