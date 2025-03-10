<script setup lang="ts">
import Button from "./Button.vue";
import ProjectCard from "./ProjectCard.vue";

import { useRouter } from "vue-router";
import { computed, inject, onMounted, Ref, ref } from "vue";
import { Projeto } from "../interface/project";
import { getProjects, setProjects } from "../helpers/LocalStorage";

const router = useRouter();

const isFavorite = ref(false);

const searchQuery = inject("searchQuery") as Ref<string>;

const sortOption = ref("alphabetical");

const projectsInProgress = ref(getProjects() || []);

const sortedAndFilteredProjects = computed(() => {
  let filtered = [...projectsInProgress.value];

  if (isFavorite.value) {
    filtered = filtered.filter((project) => project.favorito);
  }

  if (searchQuery.value && searchQuery.value.length >= 3) {
    filtered = filtered.filter((project) =>
      project.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  switch (sortOption.value) {
    case "alphabetical":
      filtered.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case "recent":
      filtered.sort(
        (a, b) =>
          new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
      );
      break;
    case "due-date":
      filtered.sort(
        (a, b) =>
          new Date(b.dataFinal).getTime() - new Date(a.dataFinal).getTime()
      );
      break;
  }

  return filtered;
});

const goToNewProject = () => {
  router.push("/new-project");
};

const updateProject = (projetosAtualizados: Projeto[]) => {
  projectsInProgress.value = projetosAtualizados;
  setProjects(projetosAtualizados);
};
</script>

<template>
  <main>
    <section class="empty-state" v-if="projectsInProgress.length === 0">
      <h1>Nenhum projeto</h1>
      <p>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
      <Button
        buttonClass="new-project-button"
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
          v-for="(project, index) in sortedAndFilteredProjects"
          :key="project.nome"
          :projeto="project"
          :index="index"
          @remove-project="updateProject"
          @toggle-favorite="updateProject"
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
