<template>
  <Container1440 class="mt-4">
    <div class="w-full h-48">
      <AdsBlock adsNameByProp="HomeA_Main"/>
    </div>
  </Container1440>
</template>

<script>
import Container1440 from "@/components/containers/Container1440";
import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";
export default {
  components: {
    Container1440,
    AdsBlock
  },
  props: {
    ads: {
      type: Object,
      default: () => ({
        typeMedia: "image",
        media: require(`~/assets/imgs/ads_ngang.jpg`),
        title: "default img",
        link: "/",
      }),
    },
  },

  methods: {
    handleAdsClick() {
      window.location.href = this.ads.link;
    },
  },
};
</script>

<style scoped>
img {
  position: relative;
}

img:before {
  content: " ";
  display: block;

  position: absolute;
  top: -10px;
  left: 0;
  height: calc(100% + 10px);
  width: 100%;
  background-color: rgb(230, 230, 230);
  border: 2px dotted rgb(200, 200, 200);
  border-radius: 5px;
}

img:after {
  content: "\f127"" Broken Image of " attr(alt);
  display: block;
  font-size: 16px;
  font-style: normal;
  font-family: FontAwesome;
  color: rgb(100, 100, 100);

  position: absolute;
  top: 5px;
  left: 0;
  width: 100%;
  text-align: center;
}

video {
  object-fit: cover;
  width: 100%;
}
</style>
