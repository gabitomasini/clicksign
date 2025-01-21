<template>
  <button class="new-project-button">
    <img class="add-icon" src="../assets/add.svg" alt="icon"/>
    <router-link to="/new-project" class="link-text">Novo Projeto</router-link>
  </button>
</template>

<script>
</script>

<style scoped>
.new-project-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 35px;
  border-radius: 30px;
  cursor: pointer;
  transition: opacity 0.2s;
  border: none;
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
  background: #695ccd;
    color: #ffffff;

  &:hover {
    opacity: 0.9;
  }
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

.add-icon {
  width: 30px;
  height: 30px;
}
</style>