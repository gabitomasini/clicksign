<script setup lang="ts">
import Button from "./Button.vue";
import ProjectCard from "./ProjectCard.vue";

import { useRouter } from "vue-router";
import { computed, ref } from "vue";

const router = useRouter();

const isFavorite = ref(false);

const sortOption = ref("alphabetical");

const projectsInProgress = computed(() => {
  return JSON.parse(localStorage.getItem("projetos") || "[]");
});

const sortedProjects = computed(() => {
  let sorted = [...projectsInProgress.value];

  switch (sortOption.value) {
    case "alphabetical":
      sorted.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case "recent":
      sorted.sort(
        (a, b) =>
          new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
      );
      break;
    case "due-date":
      sorted.sort(
        (a, b) =>
          new Date(b.dataFinal).getTime() - new Date(a.dataFinal).getTime()
      );
      break;
  }
  return sorted;
});

function goToNewProject() {
  router.push("/new-project");
}
</script>

<template>
  <main>
    <section class="empty-state" v-if="projectsInProgress.length === 0">
      <h1>Nenhum projeto</h1>
      <p>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
      <Button
        buttonClass="add-new-project"
        text="Novo projeto"
        @button-click="goToNewProject"
      ></Button>
    </section>
    <section v-else class="cards-container">
      <div class="top-information">
        <h1 class="section-title">
          Projetos ({{ projectsInProgress.length }})
        </h1>
        <div class="project-control">
          <div class="toggle-container">
            <input
              type="checkbox"
              id="favorite-toggle"
              v-model="isFavorite"
              class="toggle"
            />
            <label for="favorite-toggle" class="toggle-label"></label>
            <label for="favorite-toggle" class="toggle-text"
              >Apenas Favoritos</label
            >
          </div>
          <div class="sort-dropdown">
            <select v-model="sortOption" id="sort-order">
              <option value="alphabetical">Ordem alfabética</option>
              <option value="recent">Iniciados mais recentes</option>
              <option value="due-date">Prazo mais próximo</option>
            </select>
          </div>
          <Button
            buttonClass="new-project-button"
            text="Novo projeto"
            @button-click="goToNewProject"
          ></Button>
        </div>
      </div>

      <div class="cards-wrapper">
        <ProjectCard
          v-for="(project, index) in sortedProjects"
          :key="project.nome"
          :projeto="project"
          :index="index"
        />
      </div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.new-project-button {
  display: flex;
  justify-content: center;
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

.top-information {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 5px 10px;
  margin: 30px 0px 10px 20px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1f1283;
}

.project-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cards-container {
  display: flex;
  flex-direction: column;
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  margin: 0px 0px 10px 20px;
}

.toggle-container {
  display: flex;
  align-items: center;
}

.toggle {
  display: none;
}

.favorite-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-label {
  width: 50px;
  height: 25px;
  background-color: #ccc;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;
}

.toggle-text {
  margin: 5px;
}

.toggle-label::before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  transition: left 0.3s;
}

.toggle:checked + .toggle-label {
  background-color: yellow;
}

.toggle:checked + .toggle-label::before {
  left: 25px;
}

.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-dropdown label {
  font-size: 1rem;
  color: #fff;
}

select {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #1f1283;
}
</style>
