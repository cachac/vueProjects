<template>
  <div>
    <h1>Lista de Usuarios</h1>
    {{ users }}
    <router-link :to="{ name: 'home' }">Home</router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  /*computed: mapState({
    users: state => state.userStore
  }),*/
  computed: {
    columns() {
      return ["id", "nombre"];
    },
    ...mapState({
      users: state => state.userStore
    })
  },
  created() {
    this.$store.dispatch("userStore/fetch");
  }
};
</script>

<style scoped></style>
