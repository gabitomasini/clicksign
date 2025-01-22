<script setup lang="ts">
import { provide, ref } from "vue";
import Header from "./components/Header.vue";

const searchQuery = ref("");

provide("searchQuery", searchQuery);
</script>

<template>
  <div id="app">
    <Header></Header>

    <router-view />
  </div>
</template>

<style scoped>
#app {
  text-align: center;
}
</style>
