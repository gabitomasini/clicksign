<template>
  <div class="form-group">
    <label for="capa">Capa do projeto</label>
    <input type="file" id="capa" @change="handleFileUpload" />
    <button type="button" @click="triggerFileUpload">Selecionar</button>
    <div v-if="filePreview">
      <h3>Miniatura</h3>
      <img :src="filePreview" alt="Miniatura do arquivo" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const filePreview = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    filePreview.value = URL.createObjectURL(file);
    localStorage.setItem("filePreview", filePreview.value);
  }
};

const triggerFileUpload = () => {
  const fileInput = document.getElementById("capa");
  fileInput?.click();
};

watch(filePreview, (newValue) => {
  if (!newValue) {
    filePreview.value = localStorage.getItem("filePreview");
  }
});
</script>

<style scoped>
</style>
