<template>
  <div :style="`max-height : ${maxHeight}; overflow : hidden`">
    <img
      class="cursor-pointer"
      @click="handleAdsClick"
      v-if="imageContent"
      :src="imageContent"
      :alt="ads.title"
    />
    <video
      v-if="(adsInRender.type === 'video') || (adsInRender.type === 'Video')"
      playsinline
      autoplay
      muted
      loop
    >
      <source :src="videoContent" type="video/webm" />
      <source :src="videoContent" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  props: {
    adsNameByProp: {
      type: String
    },
    ads: {
      type: Object,
      default: () => ({
        typeMedia: "image",
        media: require(`~/assets/imgs/leaf.jpg`),
        title: "default img",
        link: "/"
      })
    },
    maxHeight: {
      type: String,
      default: "100%"
    }
  },
  created() {
    this.fetchAdByName();
  },
  data() {
    return {
      adsInRender: {},
      adsName: this.adsNameByProp,
      videoContent: "",
      imageContent: ""
    };
  },
  methods: {
    handleAdsClick() {
      window.location.href = this.adsInRender.value;
    },
    async fetchAdByName() {
      //console.log(this.adsName);
      await this.$store.dispatch("getAds", {
        creativeSlot: this.adsName,
        nextActions: res => {
          this.adsInRender = res.result;
          if (
            this.adsInRender.type == "video" ||
            this.adsInRender.type == "Video"
          ) {
            this.videoContent = this.adsInRender.value;
          } else if (
            this.adsInRender.type == "image" ||
            this.adsInRender.type == "Image"
          ) {
            this.imageContent = this.adsInRender.value;
          }
        },
        errorAction: err => {
          console.log(err);
        }
      });
    }
  },
};
</script>

<style scoped>
img {
  width: 100%;
  object-fit: cover;
  object-position: center;
}

video {
  object-fit: cover;
  width: 100%;
  max-height: 200px;
}
</style>
