<template>
  <div class="form-group card-upload">
    <img class="upload-icon" src="../assets/upload.svg" alt="Upload" />
    <p>Escolha uma imagem .jpg ou .png no seu dispositivo</p>
    <button class="select-button">
      <input
        type="file"
        id="capa"
        accept=".jpg, .png"
        @change="handleFileUpload"
      />
      <span>Selecionar</span>
    </button>
    <div v-if="filePreview">
      <img :src="filePreview" alt="Miniatura do arquivo" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filePreview = ref(null);

const emit = defineEmits(["file-uploaded"]);

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const base64String = await toBase64(file);
      filePreview.value = base64String;
      emit("file-uploaded", base64String);
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error);
    }
  }
};
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
}

.card-upload {
  border: 2px dashed #cccccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
}

.upload-icon {
  margin-bottom: 10px;
}

.select-button {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 7px 15px;
  border-radius: 30px;
  cursor: pointer;
  transition: opacity 0.2s;
  border: 1px solid #695ccd;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  background: #ffffff;
  color: #695ccd;
  position: relative;

  &:hover {
    opacity: 0.9;
  }
}

/* Esconde o input de upload */
.select-button input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
