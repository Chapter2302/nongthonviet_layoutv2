<template>
  <div class="w-full" style="overflow : hidden">
    <div class="item-info w-full" style="padding-top : 0px;">
      <div
        class="w-full"
        v-swiper:imagesSwiper="swiperImagesOption"
        ref="imagesSwiper"
        @slideChange="clickNavigationBtn"
        style="position: relative"
      >
        <div class="swiper-wrapper w-full">
          <div class="swiper-slide w-full" v-for="(item, i) in HomeA_Slide" :key="i">
            <nuxt-link :to="postLink(item)">
              <div class="img-32-container overflow-hidden w-full">
                <img
                  :src="item.featuredImage"
                  class="img-32 w-full"
                  style="width : 100%; height : 100%"
                  alt="post-img"
                />
              </div>
            </nuxt-link>
          </div>
        </div>
        <div v-if="options.navigator" class="swiper-button-prev" slot="button-prev" style="z-index: 1"></div>
        <div v-if="options.navigator" class="swiper-button-next" slot="button-next" style="z-index: 1"></div>
      </div>
      <div
        class="w-full"
        v-swiper:contentSwiper="swiperContentOption"
        ref="contentSwiper"
        style="position: relative"
      >
        <div class="swiper-wrapper w-full">
          <div class="swiper-slide w-full" v-for="(item, i) in HomeA_Slide" :key="i">
            <h3 class="line-clamp-title item-title w-full">
              <nuxt-link :to="postLink(item)" v-if="options.title">{{ item.title }}</nuxt-link>
            </h3>
            <div class="line-clamp-excerpt item-excerpt w-full" v-if="options.excerpt">{{ item.excerpt }}</div>
            <div class="item-meta">
              <div class="item-author" v-if="item.penName && options.penName">
                <span>{{ item.penName }}</span>
                <span>-</span>
              </div>
              <div class="item-date" v-if="options.publicationTime">{{ item.publicationTime | datetime("DD/MM/YYYY") }}</div>
            </div>
          </div>
        </div>
        <!-- (<div class="swiper-pagination" slot="pagination"></div>) -->
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: {
    HomeA_Slide: {
      type: Array,
      default: () => {
        return [];
      }
    },
    options: {
      type: Object,
      default: () => {
        return {
          title: true,
          penName: true,
          excerpt: true,
          publicationTime: true,
          navigator: true
        };
      }
    }
  },
  data() {
    return {
      swiperImagesOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: true
        }
      },
      swiperContentOption: {}
    };
  },
  methods: {
    clickNavigationBtn() {
      this.$refs.contentSwiper.swiper.slideTo(
        this.$refs.imagesSwiper.swiper.activeIndex
      );
    },
    postLink(slide) {
      if (!slide.type) return "/post/" + slide.alias + `-id=${slide.id}`;
      return slide.type === "LongForm"
        ? "/longform/" + slide.alias + `-id=${slide.id}`
        : "/post/" + slide.alias + `-id=${slide.id}`;
    }
  }
};
</script>

<style>
</style>
