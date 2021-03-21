<template>
  <nuxt-link to="/" class="block flex justify-center">
    <img
      src="@/assets/imgs/logotapchi1.png"
      :class="!isSafari ? 'logo-rest' : 'logo-safari-navi-fixed'"
      alt
    />
    <!-- <img src="@/assets/imgs/logotapchi.png"  class="img-safari" alt /> -->
  </nuxt-link>
</template>

<script>
export default {
  data() {
    return {
      isSafari: false
    };
  },
  created() {
    if (process.client) {
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      this.isSafari = isSafari;
    }
  }
};
</script>
<style>
</style>
