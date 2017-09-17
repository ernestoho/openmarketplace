<template>

  <div id="app">
    <navbar></navbar>

    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>

</template>

<script>
  import Navbar from '/imports/ui/components/Navbar.vue';

  export default {
    components: {
      Navbar
    }
  }
</script>

<style>
  html, body {
    background-color: #f2f2f2;
    overflow-x: initial;
  }
</style>
