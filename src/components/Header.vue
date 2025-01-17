<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';

const currentUrl = computed(() => {
  return window.location.href
})

const shouldDisplaySearchInput = computed(() => {
  return !currentUrl.value.includes('new-project')
})

</script>

<template>
  <header class="header">
    <div class="header-logo">
      <h1>Gerenciador de Projetos</h1>
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
  padding: 1rem 2rem;
  background-color: #1a1a3f;
  color: #fff;
}

.header-logo {
  display: flex;
  align-items: center;
}

.header-logo img {
  height: 30px;
  margin-right: 1rem;
}

.header-search input {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #fff;
}
</style>
