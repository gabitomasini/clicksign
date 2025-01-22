<template>
  <div>
    <div
      class="image-container"
      v-if="filePreview"
      :style="{ height: containerHeight }"
    >
      <img
        :src="filePreview"
        alt="Miniatura do Arquivo"
        class="resizable-image"
      />
    </div>
    <div v-else class="image-container" :style="{ height: containerHeight }">
      <img
        src="../assets/capadefault.png"
        alt="Miniatura do Arquivo"
        class="resizable-image"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filePreview: String,
  containerHeight: {
    type: String,
    default: "170px",
  },
});
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  position: relative;
}

.resizable-image {
  object-fit: cover !important;
  width: 100%;
  height: 100%;
}
</style>
