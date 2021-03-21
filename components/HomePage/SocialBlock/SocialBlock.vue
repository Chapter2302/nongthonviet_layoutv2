<template>
  <Container1640>
    <div class="grid grid-cols-12 gap-4 xs:gap-1 sm:gap-1 md:gap-1">
      <div class="col-span-4 xs:col-span-12" style="max-height: 180px; height : 180px; overflow : hidden">
        <!--Ads-->
        <!-- <img src="@/assets/imgs/ads_ngang.jpg" style="width:100%; height: 180px" alt /> -->
        <!-- <AdsSocial :ads="ads" /> -->
        <AdsBlock adsNameByProp="Register"/>
      </div>
      <div class="col-span-4 xs:col-span-12" style="max-height: 180px; background : #f2f2f2">
        <Subcribe />
      </div>
      <div class="col-span-4 xs:col-span-12" style="max-height: 180px; background : #f2f2f2">
        <Social />
      </div>
    </div>
  </Container1640>
</template>

<script>
import Social from "@/components/HomePage/SocialBlock/Social";
import Subcribe from "@/components/HomePage/SocialBlock/Subcribe";
import AdsSocial from "@/components/Advertisement/AdsSocial";
import Container1640 from "@/components/containers/Container1640";
import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";

export default {
  components: {
    Container1640,
    AdsSocial,
    Subcribe,
    Social,
    AdsBlock
  },

  props: {
    ads: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>