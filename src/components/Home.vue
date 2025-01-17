<script setup lang="ts">
import Button from './Button.vue'
import ProjectCard from './ProjectCard.vue'

import { computed } from 'vue'

const projectsInProgress = computed(() => {
  console.log('aqui =>', JSON.parse(localStorage.getItem("projetos") || "[]"))
  return JSON.parse(localStorage.getItem("projetos") || "[]")
})
</script>

<template>
  <main class="main-content">
    <section class="empty-state" v-if="!projectsInProgress">
      <h1>Nenhum projeto</h1>
      <p>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
      <Button></Button>
    </section>
    <section v-else class="cards-container">
      <ProjectCard v-for="project in projectsInProgress" :key="project.nome" :projeto="project"></ProjectCard>
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

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}
</style>
