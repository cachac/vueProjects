<template>
  <div>
    <h1>Bitacora</h1>
    {{ bitacora }}
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
      bitacora: state => state.bitacoraStore
    })
  },
  created() {
    this.$store.dispatch("bitacoraStore/fetch");
  }
};
</script>

<style scoped></style>
