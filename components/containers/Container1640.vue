<template>
  <div class="container-max-1640">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container-max-1640 {
  max-width: 1640px;
  width: auto !important;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 1018px){
  .container-max-1640 {
    padding-left: 10px;
    padding-right: 10px;
  }
}
@media (max-width: 1140px) and (min-width: 1019px) {
  
}
@media (min-width: 1141px) {
  
}
</style>
