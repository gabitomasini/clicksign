<!-- DisplayFile.vue -->
<template>
  <div>
    <h2>Miniatura do Arquivo</h2>
    <div v-if="storedFilePreview">
      <img :src="storedFilePreview" alt="Miniatura do Arquivo" />
    </div>
    <div v-else>
      <p>Nenhum arquivo selecionado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const storedFilePreview = ref(null);

onMounted(() => {
  storedFilePreview.value = localStorage.getItem("filePreview");
});
</script>

<style scoped>
  img {
    max-width: 100%;
    height: auto;
  }
</style>
