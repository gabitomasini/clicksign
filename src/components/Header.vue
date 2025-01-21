<script setup lang="ts">
import { computed } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();
const shouldDisplaySearchInput = computed(() => {
  return !route.path.includes("new-project");
});
</script>

<template>
  <header class="header">
    <div class="header-logo">
      <img src="../assets/gerenciadorx.svg" alt="Teste" />
    </div>
    <div class="header-search" v-if="shouldDisplaySearchInput">
      <input type="search" placeholder="Buscar..." />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #1c1930;
  color: #fff;
}

.header-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header-logo img {
  height: 70px;
  margin-right: 1rem;
}

.header-search {
  margin-left: auto;
}

.header-search input {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #fff;
}
</style>
