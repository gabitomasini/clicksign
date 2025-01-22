<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import UploadFile from "./UploadFile.vue";
import Button from "./Button.vue";
import { Projeto } from "../interface/project";
import { getProjects, setProjects } from "../helpers/LocalStorage";

const router = useRouter();

const route = useRoute();

const savedProjects = computed(() => getProjects());

const projeto = reactive<Projeto>({
  id: Math.floor(Math.random() * 1000),
  nome: "",
  cliente: "",
  dataInicio: "",
  dataFinal: "",
  capa: "",
  favorito: false,
});

const projectId = Array.isArray(route.params.projectId)
  ? route.params.projectId[0]
  : route.params.projectId;

if (projectId) {
  const projetoExistente = savedProjects.value.find(
    (p) => p.id === parseInt(projectId)
  );

  if (projetoExistente) {
    Object.assign(projeto, projetoExistente);
  }
}

const saveProject = () => {
  if (
    projeto.nome &&
    projeto.cliente &&
    projeto.dataInicio &&
    projeto.dataFinal
  ) {
    const projetosSalvos = getProjects();
    if (projectId) {
      const index = projetosSalvos.findIndex(
        (p) => p.id === parseInt(projectId)
      );
      if (index !== -1) {
        projetosSalvos[index] = { ...projeto };
      }
    } else {
      projetosSalvos.push({ ...projeto });
    }
    setProjects(projetosSalvos);
    router.push("/");
  }
};

const handleFileUpload = (base64: string) => {
  console.log("handleFileUpload", base64);
  projeto.capa = base64;
};
</script>

<template>
  <div class="top-bar">
    <router-link to="/" class="voltar">← Voltar</router-link>
    <h1 class="section-title">
      {{ projeto.id ? "Editar projeto" : "Novo projeto" }}
    </h1>
  </div>
  <div class="container">
    <form @submit.prevent="saveProject">
      <div class="form-group">
        <div class="label-span-container">
          <label for="nome">Nome do projeto </label><span>(Obrigatório)</span>
        </div>
        <input type="text" id="nome" v-model="projeto.nome" required />
      </div>

      <div class="form-group">
        <div class="label-span-container">
          <label for="cliente">Cliente </label><span>(Obrigatório)</span>
        </div>
        <input type="text" id="cliente" v-model="projeto.cliente" required />
      </div>

      <div class="form-group datas">
        <div class="data-group">
          <div class="label-span-container">
            <label for="dataInicio">Data de Início </label
            ><span>(Obrigatório)</span>
          </div>
          <input
            class="input-date"
            type="date"
            id="dataInicio"
            v-model="projeto.dataInicio"
            required
          />
        </div>
        <div class="data-group">
          <div class="label-span-container">
            <label for="dataFinal">Data Final </label><span>(Obrigatório)</span>
          </div>
          <input
            class="input-date"
            type="date"
            id="dataFinal"
            v-model="projeto.dataFinal"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <div class="project-cover">
          <label>Capa do projeto</label>
          <UploadFile @file-uploaded="handleFileUpload" :capa="projeto.capa" />
        </div>
      </div>
      <Button
        buttonClass="btn-default-1"
        text="Salvar projeto"
        style="width: 100%"
        @button-click="saveProject"
      ></Button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 30px auto;
  background-color: #faf7ff;
  padding: 100px;
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  border: 1px solid #d3d3d3;
}

.label-span-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.top-bar {
  padding: 20px 0px 10px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.voltar {
  text-decoration: none;
  color: #6c63ff;
  font-weight: bold;
  margin-bottom: 20px;
  display: inline-block;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #4a4a4a;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  color: #695ccd;
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

span {
  font-size: 1rem;
  color: #919191;
  font-weight: 300;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #4a4a4a;
}

.input-date {
  max-width: 90%;
}

input[type="text"]:focus,
input[type="date"]:focus {
  outline: none;
  border-color: #6c63ff;
  box-shadow: 0 0 3px rgba(108, 99, 255, 0.5);
}

.datas {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.data-group {
  flex: 1;
}

.project-cover {
  text-align: start;
  margin-top: 20px;
}

.cover-preview {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-top: 10px;
}

.cover-preview img {
  max-width: 100%;
  border-radius: 8px;
}

.cover-preview p {
  color: #aaa;
  font-size: 0.9rem;
}

button.salvar {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.salvar:hover {
  background-color: #5945d6;
}

.section-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1f1283;
}
</style>
