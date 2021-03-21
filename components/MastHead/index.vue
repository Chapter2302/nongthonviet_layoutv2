<template>
  <div class="masthead-wrapper">
    <!-- <img src="@/assets/imgs/ads_ngang.jpg" style="height: 200px" class="sm:hidden xs:hidden w-full object-cover" alt />
    <img
      src="@/assets/imgs/ads_ngang.jpg"
      class="w-full object-cover md:hidden lg:hidden"
      alt
    /> -->
    <div class="w-full object-cover">
      <AdsBlock adsNameByProp="Masthead"/>
    </div>
    
  </div>
</template>
<script>
import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";
export default {
  components: {
    AdsBlock,
  }
}
</script>
<style scoped>
.masthead-wrapper {
  max-height: 300px;
  overflow: hidden;
}
@media (max-width: 768px) {
  .masthead-wrapper {
    max-height: 200px;
  }
}
</style>