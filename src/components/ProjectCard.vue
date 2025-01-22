<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import DisplayFile from "./DisplayFile.vue";
import { getProjects, setProjects } from "../helpers/LocalStorage";

export default defineComponent({
  name: "ProjectCard",
  components: {
    DisplayFile, // Registre o componente aqui
  },
  props: {
    projeto: {
      type: Object as () => {
        id: number;
        nome: string;
        cliente: string;
        dataInicio: string;
        dataFinal: string;
        capa: string;
        favorito: boolean;
      },
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const isDropdownOpen = ref(false);

    const toggleFavorito = (): void => {
      props.projeto.favorito = !props.projeto.favorito;

      // Obter todos os projetos do LocalStorage
      const projetos = getProjects();

      // Atualizar o projeto específico na lista
      const projetosAtualizados = projetos.map((p) =>
        p.id === props.projeto.id ? props.projeto : p
      );

      // Salvar os projetos atualizados no LocalStorage
      setProjects(projetosAtualizados);
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
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

    const formatedIndex = computed(() => {
      return props.index <= 9 ? "0" + (props.index + 1) : props.index + 1;
    });

    return {
      toggleFavorito,
      toggleDropdown,
      isDropdownOpen,
      formatarData,
      formatedIndex,
    };
  },
});
</script>

<template>
  <div class="card">
    <div class="card-header">
      <DisplayFile :filePreview="projeto.capa"></DisplayFile>
      <button class="favoritar" @click="toggleFavorito()">
        <img
          src="../assets/star.svg"
          :class="projeto.favorito ? 'favorito' : 'nao-favorito'"
        />
      </button>
      <button class="menu-button" @click="toggleDropdown">...</button>
      <div class="dropdown-menu" v-if="isDropdownOpen">
        <a href="#">Editar</a>
        <a href="#">Remover</a>
      </div>
    </div>
    <div class="card-body">
      <h3>Projeto {{ formatedIndex }}</h3>
      <p>Cliente: {{ projeto.cliente }}</p>
      <div class="card-dates">
        <hr />
        <div>
          <p>{{ formatarData(projeto.dataInicio) }}</p>
        </div>
        <div>
          <p>{{ formatarData(projeto.dataFinal) }}</p>
        </div>
      </div>
    </div>
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
  top: 137px;
  right: 42px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.favorito {
  color: gold !important;
}

.nao-favorito {
  color: transparent !important;
}

img {
  width: 20px;
}

.menu-button {
  position: absolute;
  top: 130px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: gray;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 10px;
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
  padding: 15px;
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
