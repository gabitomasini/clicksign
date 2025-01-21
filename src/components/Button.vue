<template>
  <button class="new-project-button">
    <span class="button-icon">➕</span>
    <router-link to="/new-project" class="link-text">Novo Projeto</router-link>
  </button>
</template>

<script>
</script>

<style scoped>
.new-project-button {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background-color: #695CCD;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.new-project-button .button-icon {
  margin-right: 0.5rem;
}

.new-project-button:hover {
  background-color: #3b3bce;
}

.link-text {
  color: inherit;
  text-decoration: none;
}

.link-text:hover {
  color: inherit;
}
</style>