<template>
  <button class="new-project-button" @click="handleClick">
    <p class="add" v-if="buttonClass === 'new-project-button'">+</p>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonClass: {
      type: String,
      default: "btn-default",
    },
    text: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      required: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit("button-click");
    },
  },
};
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

.add {
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
  background-color: transparent;
  cursor: pointer;
}
</style>
