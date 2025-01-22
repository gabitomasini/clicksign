<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import DisplayFile from "./DisplayFile.vue";
import Modal from "./Modal.vue";
import { getProjects, setProjects } from "../helpers/LocalStorage";
import { Projeto } from "../interface/project";
import favoriteFilled from "../assets/favorite-filled.png";
import favorite from "../assets/favorite.png";

const emit = defineEmits<{
  (e: "remove-project", projetosAtualizados: Projeto[]): void;
  (e: "toggle-favorite", projetosAtualizados: Projeto[]): void;
}>();

const props = defineProps<{
  projeto: {
    id: number;
    nome: string;
    cliente: string;
    dataInicio: string;
    dataFinal: string;
    capa: string;
    favorito: boolean;
  };
  index: number;
}>();

const router = useRouter();

const isDropdownOpen = ref(false);

const isFavorite = ref(props.projeto.favorito);

const isModalVisible = ref(false);

const imageSrc = computed(() => (isFavorite.value ? favoriteFilled : favorite));

const toggleFavorite = (): void => {
  const projetos = getProjects() || [];
  const projetosAtualizados = projetos.map((p) =>
    p.id === props.projeto.id ? { ...p, favorito: !p.favorito } : p
  );
  isFavorite.value = !isFavorite.value;
  emit("toggle-favorite", projetosAtualizados);
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const removeProject = () => {
  const projetos = getProjects();
  const projetosAtualizados = projetos.filter((p) => p.id !== props.projeto.id);
  setProjects(projetosAtualizados);
  emit("remove-project", projetosAtualizados);
};

const formatarData = (data: string): string => {
  const dataLocal = new Date(data + "T00:00:00");
  const opcoes = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return dataLocal.toLocaleDateString("pt-BR", opcoes);
};

const editProject = () => {
  router.push(`/edit-project/${props.projeto.id}`);
  toggleDropdown();
};

const confirmRemove = () => {
  isModalVisible.value = true;
  toggleDropdown();
};

const handleCancel = () => {
  isModalVisible.value = false;
};

const handleConfirm = () => {
  isModalVisible.value = false;
  removeProject();
};
</script>

<template>
  <div class="card">
    <div class="card-header">
      <DisplayFile :filePreview="projeto.capa"></DisplayFile>
      <button class="favoritar" @click="toggleFavorite()">
        <img :src="imageSrc" />
      </button>
      <button class="menu-button" @click="toggleDropdown"></button>
      <div class="dropdown-menu" v-if="isDropdownOpen">
        <a @click="editProject">Editar</a>
        <a @click="confirmRemove">Remover</a>
      </div>
    </div>
    <div class="card-body">
      <h3>{{ projeto.nome }}</h3>
      <p>Cliente: {{ projeto.cliente }}</p>
      <div class="card-dates">
        <hr />
        <div>
          <img src="../assets/calendar_1.svg" class="calendar-icon" />
          <p>{{ formatarData(projeto.dataInicio) }}</p>
        </div>
        <div>
          <img src="../assets/calendar_2.svg" class="calendar-icon" />
          <p>{{ formatarData(projeto.dataFinal) }}</p>
        </div>
      </div>
    </div>
    <Modal
      :isVisible="isModalVisible"
      title="Remover Projeto"
      :projectName="projeto.nome"
      @close="handleCancel"
      @confirm="handleConfirm"
    />
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  flex: 0 1 300px;
  margin: 0;
}

.card-header {
  position: relative;
  height: 150px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay h2 {
  font-size: 1.2rem;
  margin: 0;
}

.favoritar {
  position: absolute;
  top: 127px;
  right: 42px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.favoritar img {
  width: 25px;
}

.calendar-icon {
  width: 25px;
  margin-right: 10px;
}

.menu-button {
  position: absolute;
  top: 124px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.menu-button:hover {
  background-color: #f9f9f9;
}

.menu-button::before {
  content: "•••";
  font-size: 16px;
  color: #7e57c2;
}

.dropdown-menu {
  position: absolute;
  top: 150px;
  right: 35px;
  background-color: white;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dropdown-menu a {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.dropdown-menu a:hover {
  background-color: #f1f1f1;
}

.card-body {
  padding: 30px 15px 10px 15px;
  display: block;
}

h3 {
  color: #1f1283;
}

.card-body h3,
.card-body p {
  width: 100%;
  text-align: left;
  margin: 10px 0;
}

.card-dates {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
}

.card-dates div {
  display: flex;
  align-items: center;
  color: #666;
}

hr {
  border: none;
  height: 1px;
  background-color: #e9e9e9;
  margin: 10px 0;
}
</style>
