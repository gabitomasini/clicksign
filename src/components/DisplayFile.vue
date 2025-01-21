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

onMounted(() => {
  console.log("File preview:", props.filePreview);
});
</script>

<style scoped>
.image-container {
  /* Garantir que o contêiner ocupe o máximo do pai */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.resizable-image {
  /* A imagem vai ocupar no máximo 100% da largura e altura do contêiner */
  max-width: 40%;
  max-height: 40%;
  object-fit: contain; /* Isso mantém a proporção da imagem */
}
</style>
