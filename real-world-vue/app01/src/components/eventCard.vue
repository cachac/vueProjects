<template>
  <router-link
    class="event-ling"
    :to="{ name: 'eventShow', params: { id: event.id } }"
  >
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <baseIcon name="users">{{ event.attendees.length }} attending</baseIcon>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    event: Object
  }
}
</script>
