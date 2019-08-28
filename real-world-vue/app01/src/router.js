import Vue from 'vue'
import Router from 'vue-router'
import eventCreate from './views/eventCreate.vue'
import eventList from './views/eventList.vue'
import eventShow from './views/eventShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'eventList',
      component: eventList
    },
    {
      path: '/event/:id',
      name: 'eventShow',
      component: eventShow,
      props: true
    },
    {
      path: '/event/create',
      name: 'eventCreate',
      component: eventCreate
    }
  ]
})
