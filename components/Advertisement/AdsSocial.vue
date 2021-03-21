<template>
  <div class="w-full h-full">
    <img
      @click="handleAdsClick"
      v-if="ads.typeMedia === 'image'"
      :src="ads.media"
      :alt="ads.title"
      class="cursor-pointer w-full h-full object-cover"
    />

    <video
      width="100%"
      height="100%"
      v-if="ads.typeMedia === 'video'"
      controls
      playsinline
      autoplay
      muted
      loop
    >
      <source :src="ads.media" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  props: {
    ads: {
      type: Object,
      default: () => ({
        typeMedia: "image",
        media: require(`~/assets/imgs/leaf.jpg`),
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

<style>
img {
  position: relative;
}

img:before {
  content: " ";
  display: block;

  position: absolute;
  top: 0;
  left: 0;
  height: calc(100%);
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
</style>