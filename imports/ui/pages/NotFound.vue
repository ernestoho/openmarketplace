<template>
  <div class="not-found">
    <div>
      This is not the page you are looking for. <router-link :to="{name:'home'}">Return home</router-link>
    </div>
  </div>
</template>

<style scoped>
  .not-found {
    margin-top: 84px;
    text-align: center;
  }
</style>
