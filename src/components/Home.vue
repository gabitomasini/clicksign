<script setup lang="ts">
import { ref } from 'vue'
import Button from './Button.vue'

defineProps<{ msg: string }>()

const count = ref(0)
const isAtHome = ref(true)
</script>

<template>
  <main class="main-content">
    <section class="empty-state">
      <h1>Nenhum projeto</h1>
      <p>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
      <Button></Button>
    </section>
  </main>

</template>

<style scoped>
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
}

.empty-state {
  text-align: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.empty-state h1 {
  font-size: 1.5rem;
  color: var(--text-color);
}

.empty-state p {
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}
</style>
