<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectCard",
  props: {
    projeto: {
      type: Object as () => {
        nome: string;
        cliente: string;
        dataInicio: string;
        dataFinal: string;
        imagem: string;
        favorito: boolean;
      },
      required: true
    }
  },
  setup(props) {
    const toggleFavorito = () => {
      props.projeto.favorito = !props.projeto.favorito;
      // Atualize o localStorage ou outras ações necessárias aqui
    };

    const formatarData = (data: string): string => {
      const opcoes = { year: "numeric", month: "long", day: "numeric" } as const;
      return new Date(data).toLocaleDateString("pt-BR", opcoes);
    };

    return { toggleFavorito, formatarData };
  }
});
</script>


<template>
  <div class="card">
    <div class="card-header">
      <img :src="projeto.imagem" alt="Capa do projeto" class="card-image" />
      <div class="card-overlay">
        <h2>{{ projeto.nome }}</h2>
      </div>
      <button class="favoritar" @click="toggleFavorito">
        <span :class="projeto.favorito ? 'favorito' : 'nao-favorito'">★</span>
      </button>
    </div>
    <div class="card-body">
      <h3>{{ projeto.nome }}</h3>
      <p>Cliente: <strong>{{ projeto.cliente }}</strong></p>
      <div class="card-dates">
        <div>
          <span>📅</span>
          <p>{{ formatarData(projeto.dataInicio) }}</p>
        </div>
        <div>
          <span>📅</span>
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

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
}

.card-overlay h2 {
  font-size: 1.2rem;
  margin: 0;
}

.card-overlay p {
  margin: 0;
  font-size: 0.9rem;
}

.favoritar {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: gold;
}

.favorito {
  color: gold;
}

.nao-favorito {
  color: gray;
}

.card-body {
  padding: 15px;
}

.card-body h3 {
  font-size: 1.2rem;
  margin: 0 0 5px;
}

.card-body p {
  margin: 5px 0;
  color: #555;
}

.card-dates {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.card-dates div {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

.card-dates span {
  font-size: 1.2rem;
}
</style>
