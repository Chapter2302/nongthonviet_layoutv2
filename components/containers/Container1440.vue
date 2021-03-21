<template>
  <div class="container-max-1440">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container-max-1440 {
  max-width: 1440px;
  width: auto !important;
  padding-left: 100px;
  padding-right: 100px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 1018px) {
  .container-max-1440 {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
