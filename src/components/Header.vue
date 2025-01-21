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
      <img src="../assets/gerenciadorx.svg" alt="Teste">
    </div>
    <div class="header-search" v-if="shouldDisplaySearchInput">
      <input type="search" placeholder="Buscar..." />
    </div>
  </header>
</template>

<style scoped>
.header {
 display: flex;
  justify-content: space-between; /* Espaça os elementos à esquerda e à direita */
  align-items: center; /* Alinha os itens verticalmente */
  padding: 1.5rem 2rem;
  background-color: #1c1930;
  color: #fff;
}

.header-logo {
  display: flex;
  justify-content: center; /* Centraliza o logo dentro do espaço disponível */
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* Centraliza o logo na tela */
}

.header-logo img {
    height: 70px;
  margin-right: 1rem;
}

.header-search {
  margin-left: auto; /* Move a barra de pesquisa para o canto direito */
}

.header-search input {
   padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #fff;
}
</style>
