<template>
  <div id="app">
    <navbar-store></navbar-store>

    <router-view></router-view>
  </div>
</template>

<script>
  import NavbarStore from '/imports/ui/components/NavbarStore.vue';

  export default {
    components: {
      NavbarStore
    }
  }
</script>

<style>
  html, body {
    background-color: #f2f2f2;
    overflow-x: initial;
  }
</style>
