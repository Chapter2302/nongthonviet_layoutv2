<template>
  <div class="ads">
    <img
      @click="handleAdsClick"
      v-if="ads.typeMedia === 'image'"
      :src="ads.media"
      class="cursor-pointer w-full h-full object-cover"
      :alt="ads.title"
    />

    <video
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

<style scoped>
.ads .ads-title {
  display: block;
  text-align: center;
  color: #bbb;
  font-size: 10px;
  line-height: 21px;
}

.ads {
  margin-bottom: 30px;
}

.ads img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
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

.ads video {
  object-fit: cover;
  width: 100%;
  max-height: 200px;
}
</style>
