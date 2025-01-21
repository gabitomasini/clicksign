<template>
  <div class="container">
    <router-link to="/" class="voltar">← Voltar</router-link>
    <h1>Novo projeto</h1>
    <form @submit.prevent="saveNewProject">
      <div class="form-group">
        <label for="nome">Nome do projeto <span>(Obrigatório)</span></label>
        <input type="text" id="nome" v-model="projeto.nome" required />
      </div>

      <div class="form-group">
        <label for="cliente">Cliente <span>(Obrigatório)</span></label>
        <input type="text" id="cliente" v-model="projeto.cliente" required />
      </div>

      <div class="form-group datas">
        <div class="data-group">
          <label for="dataInicio">Data de Início <span>(Obrigatório)</span></label>
          <input type="date" id="dataInicio" v-model="projeto.dataInicio" required />
        </div>
        <div class="data-group">
          <label for="dataFinal">Data Final <span>(Obrigatório)</span></label>
          <input type="date" id="dataFinal" v-model="projeto.dataFinal" required />
        </div>
      </div>

      <div class="form-group">
        <label>Capa do projeto</label>
        <div class="project-cover">
          <UploadFile />
          <div class="cover-preview">
            <img v-if="projeto.capa" :src="URL.createObjectURL(projeto.capa)" alt="Capa do projeto" />
            <p v-else>Preview da capa</p>
          </div>
        </div>
      </div>
      <button type="submit" class="salvar">Salvar projeto</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import UploadFile from "./UploadFile.vue";
import { Projeto } from "../interface/project";
import { getProjects, setProjects } from "../helpers/LocalStorage";

export default defineComponent({
  name: "NovoProjeto",
  components: {
    UploadFile,
  },
  setup() {
    const projeto = reactive<Projeto>({
      nome: "",
      cliente: "",
      dataInicio: "",
      dataFinal: "",
      capa: null as File | null,
    });

    const saveNewProject = () => {
      if (projeto.nome && projeto.cliente && projeto.dataInicio && projeto.dataFinal) {
        const projetosSalvo = getProjects();
        projetosSalvo.push({ ...projeto });
        setProjects(projetosSalvo);
        alert("Projeto salvo com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    };

    return { projeto, saveNewProject };
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  background-color: #faf7ff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif;
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
  color: #4a4a4a;
  font-weight: 600;
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
  text-align: center;
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
</style>
