<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "NovoProjeto",
  setup() {
    const projeto = reactive({
      nome: "",
      cliente: "",
      dataInicio: "",
      dataFinal: "",
      capa: null as File | null,
    });

    const saveNewProject = () => {
      if (projeto.nome && projeto.cliente && projeto.dataInicio && projeto.dataFinal) {
        const projetosSalvos = JSON.parse(localStorage.getItem("projetos") || "[]");
        projetosSalvos.push({ ...projeto });
        localStorage.setItem("projetos", JSON.stringify(projetosSalvos));
        alert("Projeto salvo com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    };

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        projeto.capa = target.files[0];
      }
    };

    const triggerFileUpload = () => {
      const fileInput = document.getElementById("capa") as HTMLInputElement;
      fileInput?.click();
    };

    return { projeto, saveNewProject, handleFileUpload, triggerFileUpload };
  },
});
</script>


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
        <div>
          <label for="dataInicio">Data de Início <span>(Obrigatório)</span></label>
          <input type="date" id="dataInicio" v-model="projeto.dataInicio" required />
        </div>
        <div>
          <label for="dataFinal">Data Final <span>(Obrigatório)</span></label>
          <input type="date" id="dataFinal" v-model="projeto.dataFinal" required />
        </div>
      </div>

      <div class="form-group">
        <label for="capa">Capa do projeto</label>
        <input type="file" id="capa" @change="handleFileUpload" />
        <button type="button" @click="triggerFileUpload">Selecionar</button>
      </div>

      <button type="submit" class="salvar">Salvar projeto</button>
    </form>
  </div>
</template>


<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  background-color: #f7f5ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.voltar {
  text-decoration: none;
  color: #6c63ff;
  font-weight: bold;
  margin-bottom: 10px;
  display: inline-block;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button.salvar {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.salvar:hover {
  background-color: #5945d6;
}
</style>
