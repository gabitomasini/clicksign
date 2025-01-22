<template>
  <div>
    <div class="image-container" v-if="filePreview">
      <img
        :src="filePreview"
        alt="Miniatura do Arquivo"
        class="resizable-image"
      />
    </div>
    <div v-else>
      <p>Nenhum arquivo selecionado.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  filePreview: String,
});
</script>

<style scoped>
.image-container {
  height: 170px;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.resizable-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
