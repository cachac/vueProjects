import EventService from '@/services/EventService.js';
export const namespaced = true;
export const state = {
  events: []
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  }
};
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'success',
          message: 'Your event has been created: '
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an error creating your event: ' + error.message
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data);
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an error fetching events: ' + error.message
        };
        dispatch('notification/add', notification, { root: true });
      });
  }
};
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
