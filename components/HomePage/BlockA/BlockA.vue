<template>
  <Container1440 class="mt-4" :v-if="HomeA_Block">
    <div class="flex xs:block">
      <div class="grid grid-cols-12 gap-4 flex-grow">
        <!--Slide-->
        <!-- <div class="col-span-6 xs:col-span-12"> -->
        <div :class="HomeA_Slide.grids">
          <div class="flex justify-center items-center">
            <SlideSwiper :HomeA_Slide="HomeA_Slide.items"/>
          </div>
        </div>
        <!--Slide-->

        <!--Main-->
        <!-- <div class="col-span-3 xs:col-span-12"> -->
        <div :class="HomeA_Main.grids">
          <div>
            <Article :post="HomeA_Main.items[0]" isFull :options="{penName: false, publicationTime: false, image: true,
          title: true,excerpt: false}"/>
          </div>
          <div class="mt-4">
            <ArticleListing2 :posts="HomeA_Main.items.slice(1,7)"/>
          </div>
        </div>
        <!--Main-->
      </div>
    </div>

    <!---------------------------------------------------------------------------------------------------->
    <!-- main post -->
    <!-- <div class="col-span-9 xs:col-span-12" v-if="HomeA_Slide.length">
          <div class="w-full" style="overflow : hidden">
            <h3 class="section-title">{{titleHomeA_Slide}}</h3>

            <div class="item-info" style="padding-top : 0px;">
              <div v-swiper:mySwiper="swiperOption" style="position : relative">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item, i) in HomeA_Slide" :key="i">
                    <nuxt-link :to="postLink">
                      <div class="img-32-container overflow-hidden">
                        <img
                          :src="item.featuredImage"
                          class="img-32"
                          style="width : 100%; height : 100%"
                          alt="post-img"
                        />
                      </div>
                    </nuxt-link>
                    <h3 class="line-clamp-title item-title">
                      <nuxt-link :to="postLink">{{ item.title }}</nuxt-link>
                    </h3>

                    <div class="item-meta">
                      <span class="item-author" v-if="item.penName">
                        <span>{{ item.penName }}</span>
                        <span>-</span>
                      </span>
                      <span class="item-date">{{ item.publicationTime | datetime("DD/MM/YYYY") }}</span>
                    </div>
                    <div
                      class="line-clamp-excerpt item-excerpt"
                      style="max-width : inherit"
                    >{{ item.excerpt }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>-->
    <!-- <div class="col-span-3 xs:col-span-12 other-post">
      <h3 class="section-title">{{titleHomeA_Main}}</h3>
      <ColumnItem realBlock="BlockA" v-for="(post, index) in HomeA_Main" :key="index" :post="post" />
    </div>-->

    <!-- <div class="blocka-right" style="width: 100%">
      <div class="blocka-right">
        <AdsSide />

        <div class="gold-wrapper" style="margin-bottom: 20px">
          <iframe
            id="fr33"
            style="border: none"
            src="//tygia.com/api2.php?auto=1&amp;change=0&amp;flag=1&amp;column=2&amp;titlecolor=333333&amp;upcolor=008800&amp;downcolor=aa0000&amp;textcolor=333333&amp;gbcolor=ffffff&amp;title=0&amp;chart=0&amp;gold=1&amp;rate=1&amp;ngoaite=USD,JPY,EUR,GBP,AUD&amp;expand=0&amp;color=B4D0D0&amp;nganhang=VIETCOM&amp;fontsize=80&amp;css=%23SJC_N_ng{display:%20table-row%20!important;}%23wgold{display:none}"
            width="100%"
            height="310"
          ></iframe>
        </div>

        <div class="gold-wrapper" style="margin-bottom: 20px;">
          <AdsBlock adsNameByProp="HomeA_Right" />
          <img src="@/assets/imgs/ads_doc.jpg" style="width : 100%; height: 320px" alt />
        </div>

        <div class="blocka-right__section" v-if="HomeA_Right.length">
          <h3 class="section-title">{{titleHomeA_Right}}</h3>
          <SideBlockItem
            v-for="(post, index) in HomeA_Right.slice(0, 6)"
            :post="post"
            :key="index"
            :isBorder="true"
          />
        </div>
      </div>
    </div>-->
  </Container1440>
</template>

<script>
import Container1440 from "@/components/containers/Container1440";
import ColumnItem from "../../BlockItem/ColumnItem.vue";
import SideBlockItem from "../../SideBlockItem/SideBlockItem.vue";
import AdsSide from "../../Advertisement/AdsSide.vue";
import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";
import SlideSwiper from "@/components/HomePage/SlideSwiper";
import Article from "@/components/Article";
import ArticleListing2 from "@/components/Listing/ArticleListing2"
//For Dev
import { articles } from "@/static/staticData";

export default {
  components: {
    Container1440,
    ColumnItem,
    SideBlockItem,
    AdsSide,
    AdsBlock,
    SlideSwiper,
    Article,
    ArticleListing2
  },
  props: {
    HomeA_Slide: {
      type: Object,
      default: () => {
        return {};
      }
    },
    HomeA_Main: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    clickNavigationBtn() {
      // this.$refs.contentSwiper.swiper.slideTo(
      //   this.$refs.imagesSwiper.swiper.activeIndex
      // );
    },
    postLink(slide) {
      if (!slide.type) return "/post/" + slide.alias + `-id=${slide.id}`;
      return slide.type === "LongForm"
        ? "/longform/" + slide.alias + `-id=${slide.id}`
        : "/post/" + slide.alias + `-id=${slide.id}`;
    }
  },
  computed: {},
  mounted() {
    // if (this.mySwiper) {
    //   this.mySwiper.slideTo(3, 1000, false);
    // }
    console.log('xx: ', this.HomeA_Slide)
  },
};
</script>

<style scoped>
/* common style */
.blocka-right {
  /*min-width: 200px !important;*/
}

.other-post {
}

.blocka {
  margin-top: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--maincolor);
}

/* main */
.blocka__main {
  margin-bottom: 32px;
}

.blocka__main .blocka__main--category {
  /*display: inline-block;*/
  /*padding: 3px 4px 2px;*/
  /*background-color: var(--maincolor);*/
  /*font-weight: 400;*/
  /*text-transform: uppercase;*/
  /*letter-spacing: 1px;*/
  /*font-size: 10px;*/
  /*color: #fff;*/
}

/* title */
.blocka__main .blocka__main--title {
  /*font-size: 32px;*/
  /*line-height: 1.1;*/
  /*font-weight: 500;*/
  /*margin: 6px 0 2px;*/
}

.blocka__main .blocka__main--title a:hover {
  color: var(--hovercolor);
}

/* date */
.blocka__main .blocka__main--date {
  font-size: 12px;
  line-height: 1;
  font-style: italic;
  font-weight: 400;
  margin-top: 5px;
  margin-bottom: 14px;
}

/* img */
.blocka__main .blocka__main--img {
  width: 100%;
  height: 300px;
}

.blocka__main .blocka__main--img a {
  width: 100%;
  height: 100%;
  position: relative;
}

.blocka__main .blocka__main--img a img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* description */

.blocka__main .blocka__main-description {
  display: block;
  margin-top: 13px;
  color: #555555;
  font-size: 14px;
  line-height: 1.3;
}
.margin-top-position {
  position: absolute;
}

@media (max-width: 767px) {
  .margin-top-position {
    top: 80%;
  }
  .blocka-right {
    margin-top: 16px;
  }
  .swiper-slide .item-excerpt {
    max-height: 85px;
  }
  .section-title {
    font-size: 27px;
    color: #97b640;
    margin-bottom: 10px;
  }
  .side-item {
    padding-bottom: 10px;
  }
  .side-item .side-item__info h3 {
    font-size: 19px;
  }
}

@media (min-width: 768px) {
  .margin-top-position {
    top: 85%;
  }
  .blocka {
    margin-top: 20px;
  }
  /* img */
  .blocka__main .blocka__main--img {
    height: 550px;
  }

  /* title */
  .blocka__main .blocka__main--title {
    font-size: 36px;
  }

  .section-title {
    font-size: 18px;
  }
}
@media (max-width: 1018px) and (min-width: 768px) {
  .margin-top-position {
    top: 80%;
  }
  .blocka-right {
    width: 95%;
    width: 200px;
    min-width: 200px;

    margin-left: 16px;
  }

  /* img */
  .blocka__main .blocka__main--img {
    height: 450px;
  }

  /* title */
  .blocka__main .blocka__main--title {
    font-size: 20px;
  }

  .section-title {
    font-size: 20px;
  }
}
@media (max-width: 1140px) and (min-width: 1019px) {
  .margin-top-position {
    top: 80%;
  }
  .blocka-right {
    width: 85%;
    /* width: 250px; */
    /* min-width: 250px; */

    margin-left: 16px;
  }

  .blocka__main .blocka__main--img {
    height: 500px;
  }

  .blocka__main .blocka__main--title {
    font-size: 36px;
  }

  .section-title {
    font-size: 22px;
  }
}
@media (min-width: 1141px) {
  .blocka-right {
    /* width: 142%; */
    width: 300px;
    min-width: 250px;

    margin-left: 16px;
  }

  .blocka__main .blocka__main--title {
    font-size: 36px;
  }

  .section-title {
    font-size: 25px;
  }
}
</style>
