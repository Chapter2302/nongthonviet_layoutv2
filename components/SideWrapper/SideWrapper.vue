<template>
  <div class="side-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.side-wrapper {
  margin-bottom: 30px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 0;
  padding-left: 10px;
  border: 1px solid #eaeaea;
  position: relative;
}

/* desktop */
@media (max-width: 1018px) and (min-width: 768px) {
  .side-wrapper {
    margin-bottom: 5px;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
}
</style>