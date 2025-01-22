<script setup lang="ts">
import { computed, onUpdated, Ref } from "vue";

import { useRoute } from "vue-router";

import { inject, ref } from "vue";

const route = useRoute();

const searchQuery = inject("searchQuery") as Ref<string>;

const inputRef = ref<HTMLInputElement | null>(null);

const shouldDisplaySearchInput = computed(() => {
  return !route.path.includes("new-project");
});

const isSearchActive = ref(false);

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value;
};

const resetSearchQuery = () => {
  searchQuery.value = "";
  isSearchActive.value = false;
};

onUpdated(() => {
  if (isSearchActive.value && inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <header class="header">
    <div class="header-logo">
      <img
        src="../assets/gerenciadorx.svg"
        alt="Teste"
        v-if="!isSearchActive"
      />
    </div>
    <div class="header-search" v-if="shouldDisplaySearchInput">
      <div v-if="!isSearchActive" class="search-icon-container">
        <img
          src="../assets/search.svg"
          alt="Buscar"
          class="lupa"
          @click="toggleSearch"
        />
      </div>
      <div v-else>
        <input
          ref="inputRef"
          type="text"
          v-model="searchQuery"
          placeholder="Buscar..."
          class="search-input"
          @blur="resetSearchQuery"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.2rem 2rem;
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
  position: relative;
  flex: 1;
}

.header-search img {
  width: 20px;
  cursor: pointer;
}

.header-search .full-width-search {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 1;
}

.header-search input {
  padding: 0.5rem 1rem;
  margin: -15px;
  border-radius: 4px;
  border: none;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
}

.search-icon-container {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
