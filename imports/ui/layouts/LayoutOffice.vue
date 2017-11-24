<template>
  <div id="app">
    <navbar-office></navbar-office>

    <router-view></router-view>
  </div>
</template>

<script>
  import NavbarOffice from '/imports/ui/components/NavbarOffice.vue';

  export default {
    components: {
      NavbarOffice
    }
  }
</script>

<style>
  html, body {
    background-color: #f2f2f2;
    overflow-x: initial;
  }
</style>
