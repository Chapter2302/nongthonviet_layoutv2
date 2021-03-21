<template>
  <div class="modal" ref="content" @click="handleCloseModal">
    <div class="modal-content px-8 py-6">
      <i class="modal-close fas fa-times" @click="handleCloseClick"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["setActiveSignin", "SET_AUTH_ERROR"]),

    handleCloseModal(e) {
      if (e.target === this.$refs.content) {
        this.$emit('closeAuth');
        this.setActiveSignin(false);
        this.SET_AUTH_ERROR(null);
      }
    },
    handleCloseClick() {
        this.$emit('closeAuth');
        this.setActiveSignin(false);
        this.SET_AUTH_ERROR(null);
    }
  },
};
</script>

<style scoped>
/* my login */
.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .65);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  background-color: white;
  max-width: 100%;
  max-height: 100%;
  border-radius: 3px;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-header {
  text-align: center;
  position: relative;
}

.modal-close {
  position: absolute;
  /* background-color: gray; */
  color: gray;
  padding: 10px 12px;
  /* border-radius: 20%; */
  top: 0px;
  right: 0px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .modal-content {
    height: 100%;
    width: 100%;
    border-radius: 0px;
  }
}
</style>
