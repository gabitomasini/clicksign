<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <div class="icon">
          <img src="../assets/trash-light.svg" alt="Ícone de lixeira" />
        </div>
        <h2>Remover projeto</h2>
        <hr class="modal-divider" />
      </div>
      <p>Essa ação removerá definitivamente o projeto:</p>
      <h3>{{ projectName }}</h3>
      <div class="modal-actions">
        <button class="cancel-button" @click="closeModal">Cancelar</button>
        <button class="confirm-button" @click="confirmRemoval">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  projectName: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm"]);

const closeModal = () => {
  emit("close");
};

const confirmRemoval = () => {
  emit("confirm");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 400px;
  text-align: center;
}

.modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header .icon {
  background-color: #5e5ce6;
  border-radius: 50%;
  padding: 10px;
  margin-bottom: 10px;
}

.modal-header img {
  width: 24px;
  height: 24px;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: bold;
  color: #5e5ce6;
}

p {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

button {
  font-size: 14px;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.cancel-button {
  background-color: white;
  color: #5e5ce6;
}

.modal-divider {
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0; /* Espaço acima e abaixo do hr */
}
</style>
