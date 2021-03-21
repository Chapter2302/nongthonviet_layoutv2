<template>
  <Container1440>
    <div class="blockb flex xs:block">
      <!-- left -->
      <div class="blockb-left xs:static sticky top-fiftyfive">
        <!--Ads-->
        <!-- <div style="width: 50%; height: 390px">
          <AdsBlock adsNameByProp="HomeB_Left1"/>
        </div>
        <div style="width: 50%; height: 390px">
          <AdsBlock adsNameByProp="HomeB_Left2"/>
        </div>-->
        <div>
          <AdsBlock :adsNameByProp="realBlock + '_Left1'" />
          <AdsBlock :adsNameByProp="realBlock + '_Left2'" />
        </div>
        <!-- <div>
          <img src="@/assets/imgs/ads_doc.jpg" style="width : 100%; height: 390px" alt />
        </div>
        <div>
          <img src="@/assets/imgs/ads_doc.jpg" style="width : 100%; height: 390px" alt />
        </div>-->
      </div>

      <!-- main block -->
      <div :class="$device.isMobile ? 'flex-grow' :  'flex-grow main-block'">
        <div class="mx-4 xs:mx-0">
          <h2 class="main-block__title">
            <span>{{ titleHomeB_Main }}</span>
            <div class="main-block__title-sub"></div>
          </h2>

          <MainBlockItem
            v-for="(post, index) in HomeB_Main"
            :key="index"
            :post="post"
            :index="index"
            :length="HomeB_Main.length"
          />
          <div class="text-center" v-if="viewAllHomeB_Main !== '/'">
            <nuxt-link :to="viewAllHomeB_Main">
              <div class="main-view-all-button">
                Xem tất cả
                <i class="fas fa-bars"></i>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- right -->
      <div class="blockb-right xs:mt-4">
        <div class="blockb-right__block" v-if="HomeB_Right.length">
          <h3 class="block-title">{{ titleHomeB_Right }}</h3>

          <SideBlockItem
            v-for="(post, index) in HomeB_Right"
            :key="index"
            :post="post"
            :isBorder="true"
            :indexOfItem="index"
            :length="HomeB_Right.length"
          />
          <nuxt-link v-if="viewAllHomeB_Right !== '/'" :to="viewAllHomeB_Right">
            <div class="blockb__button small">
              Xem tất cả
              <i class="fas fa-bars"></i>
            </div>
          </nuxt-link>
        </div>

        <div class="blockb-right__block">
          <!--Ads-->
          <div style="max-width: 100%;">
            <AdsBlock :adsNameByProp="realBlock + '_Right1'" />
            <AdsBlock :adsNameByProp="realBlock + '_Right2'" />
          </div>
          <!-- <div v-if="realBlock == 'blockD'" style="max-width: 100%;">
            <AdsBlock adsNameByProp="HomeD_Right1"/>
            <AdsBlock adsNameByProp="HomeD_Right2"/>
          </div>
          <div v-if="realBlock == 'blockF'" style="max-width: 100%;">
            <AdsBlock adsNameByProp="HomeF_Right1"/>
            <AdsBlock adsNameByProp="HomeF_Right2"/>
          </div>-->
          <!-- <div>
            <img src="@/assets/imgs/ads_doc.jpg" style="width : 100%; height: 355px"  alt />
          </div>
          <div>
            <img src="@/assets/imgs/ads_doc.jpg" style="width : 100%; height: 355px" alt />
          </div>-->
        </div>
      </div>
    </div>
  </Container1440>
</template>

<script>
import data from "../../../assets/data/data.json";
// components
import Container1440 from "@/components/containers/Container1440";
import SideBlockItem from "../../SideBlockItem/SideBlockItem.vue";
import AdsSide from "../../Advertisement/AdsSide.vue";
import MainBlockItem from "../../BlockItem/RowItem.vue";
import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";
export default {
  components: {
    Container1440,
    SideBlockItem,
    AdsSide,
    MainBlockItem,
    AdsBlock
  },
  data() {
    return {
      items: null
    };
  },
  props: {
    realBlock: {
      type: String,
      default: "blockB"
    },
    HomeB_Main: {
      type: Array,
      default: () => {
        return [];
      }
    },
    titleHomeB_Main: {
      type: String,
      default: "Thời Sự"
    },
    viewAllHomeB_Main: {
      type: String,
      default: ""
    },
    HomeB_Right: {
      type: Array,
      default: () => {
        return [];
      }
    },
    titleHomeB_Right: {
      type: String,
      default: "Thời Sự"
    },
    viewAllHomeB_Right: {
      type: String,
      default: "/"
    },
    ads: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
/* block b custom css */

.blockb {
  align-items: flex-start;
}

.blockb .blockb__button.small {
  display: block;
  width: 50%;
  font-size: 15px;
  line-height: 35px;
  letter-spacing: 1px;
  border-radius: 8px;
}

.blockb .blockb__button {
  background: #09334c;
  width: 100%;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-size: 15px;
  line-height: 35px;
  letter-spacing: 1px;
  border-radius: 8px;
  transition: 0.3s ease;
}
.main-view-all-button {
  margin-top: 20px;
  background: var(--maincolor);
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-size: 15px;
  line-height: 35px;
  letter-spacing: 1px;
  border-radius: 8px;
  transition: 0.3s ease;
}
.main-view-all-button {
  background: var(--hovercolor);
}

.blockb .blockb__button:hover {
  background: var(--hovercolor);
}

/* end */

/* main block */

.main-block {
  padding-left: 15px;
  padding-right: 15px;
}

.main-block__title {
  font-family: SourceSansProSemiBold;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 26px;
  line-height: 26px;
  padding: 0;
  letter-spacing: -0.6px;
  margin-top: 36px;
  text-align: left;
  position: relative;
}

.main-block__title span {
  font-family: SourceSansProBlack;
  font-size: 53px;
  font-weight: 900;
  color: #97b640;
  margin-left: 12px;
}
@media (max-width: 767px) {
  .main-block__title span {
    font-size: 36px;
  }
}
.main-block__title-sub {
  font-size: 90px;
  text-transform: uppercase;
  position: absolute;
  left: -4px;
  z-index: -1;
  bottom: -20px;
  white-space: nowrap;
  color: #f3f3f3;
  line-height: 1;
  letter-spacing: -7px;
}

/* end main block */

/* block b-right */

/* .blockb-right__block {
  width: auto;

  margin-bottom: 40px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;

  border: 1px solid #eaeaea;
} */

/* endblock-b right */

/* block B left*/

.blockb-left {
  min-width: 250px;

  width: auto;
  border: 1px solid #eaeaea;
  padding-right: 8px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 0px;
}

/* end block B left*/

/* mobile */
@media (max-width: 767px) {
  .blockb-right {
    width: auto;
  }
  .main-block {
    margin-top: 45px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .main-block__title {
    margin-top: 26px;
    margin-bottom: 16px;
  }

  .main-block__title span {
    margin-left: 12px;
  }

  .main-block__title .main-block__title-sub {
    font-size: 60px;
    bottom: -12px;
  }

  .blockb-left {
    width: 100%;
    margin-top: 16px;
  }
  .blockb .blockb__button.small {
    margin: auto;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    line-height: 35px;
    letter-spacing: 1px;
    border-radius: 8px;
  }
}

/* tablet */
@media (max-width: 1018px) and (min-width: 768px) {
  .blockb-left {
    width: 40%;
    min-width: 200px;
    padding-right: 10px;
    padding-left: 10px;
  }
  .blockb-right {
    min-width: 200px;
    max-width: 210px;
  }

  .main-block {
    padding-right: 10px;
    padding-left: 10px;
  }

  .blockb .blockb__button.small {
    width: 75%;
  }

  .main-block__title {
    font-size: 22px;
    margin-bottom: 16px;
    margin-top: 26px;
  }

  .main-block__title span {
    font-size: 18px;
  }

  .main-block__title-sub {
    font-size: 70px;
    bottom: -15px;
  }
}

/* other */
@media (max-width: 1140px) and (min-width: 1019px) {
  .blockb-left {
    width: 50%;
    min-width: 230px;
  }
  .blockb-right {
    width: 50%;
    min-width: 290px;
  }
}
@media (min-width: 1141px) {
  .blockb-left {
    width: 40%;
    min-width: 250px;
    max-width: 260px;
  }
  .blockb-right {
    width: 40%;
    max-width: 320px;
  }
}
</style>
