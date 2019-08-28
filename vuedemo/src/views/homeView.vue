<template>
  <div>
    <h1>Hola, Bienvenido</h1>
    <router-link :to="{ name: 'bitacoraList' }">Bitacora</router-link> |
    <router-link :to="{ name: 'userList' }">Usuarios</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
