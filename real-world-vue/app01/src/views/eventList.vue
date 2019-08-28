<template>
  <div>
    <h1>List</h1>

    <eventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import eventCard from '@/components/eventCard.vue'
import eventService from '@/services/eventService.js'

export default {
  components: {
    eventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    eventService
      .getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log('There was an error: ' + error.response)
      })
  }
}
</script>
