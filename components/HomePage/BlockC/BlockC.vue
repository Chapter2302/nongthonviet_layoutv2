<template>
  <Container1640 class="wrapper">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-10 xs:col-span-12 sm:col-span-12">
        <div class="mb-5">
          <div class="title-bar" style="background-color:#09334c" v-if="mainNew">
            <Container1440>
              <!-- <h1
                class="text-white sm:mt-3 xs:mt-3 font-extrabold mt-5"
                :style="$device.isMobile ? 'font-size : 30px; ':'font-size : 50px;'"
              >{{titleHomeC_Main}}</h1> -->
              <h1
                class="text-white sm:mt-3 xs:mt-3 font-extrabold mt-4"

              >{{titleHomeC_Main}}</h1>
            </Container1440>
          </div>
        </div>

        <Container1440 class="wrapper1440">
          <div class="grid grid-cols-12 gap-4">
            <!--Main News-->
            <SpotLightItem class="main-new" :post="mainNew" />
            <!--Rest News-->
            <div class="xs:col-span-12 sm:col-span-6 col-span-6 rest-new">
              <div class="grid grid-cols-12 gap-4">
                <div v-for="(post,i) in restNew" :key="i" class="col-span-6">
                  <ColumnItem :post="post" realBlock="BlockC"/>
                </div>
              </div>
            </div>
          </div>
        </Container1440>
      </div>
      <div class="col-span-2 xs:col-span-12 sm:col-span-12 xs:p-2 sm:p-2">
        <!--Ads-->
        <AdsBlock :adsNameByProp="realBlock + '_Right'" />
        <!-- <div>
          <img src="@/assets/imgs/ads_doc.jpg" style="width : 100%; height: 695px" alt />
        </div>-->
      </div>
    </div>
  </Container1640>
</template>

<script>
  import Container1640 from "@/components/containers/Container1640";
  import Container1440 from "@/components/containers/Container1440";
  import ColumnItem from "@/components/BlockItem/ColumnItem";
  import SpotLightItem from "@/components/BlockItem/SpotLightItem";
  import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";
  export default {
    components: {
      Container1640,
      Container1440,
      ColumnItem,
      SpotLightItem,
      AdsBlock
    },
    props: {
      realBlock: {
        type: String,
        default: "HomeC"
      },
      HomeC_Main: {
        type: Array,
        default: () => {
          return [];
        }
      },
      titleHomeC_Main: {
        type: String,
        default: "Nông nghiệp 365"
      },

      ads: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    computed: {
      mainNew() {
        if (this.HomeC_Main) {
          return this.HomeC_Main[0];
        }
      },
      restNew() {
        if (this.HomeC_Main) {
          return this.HomeC_Main.slice(1, 5);
        }
      }
    },
    created() {
      //console.log(this.HomeC_Main)
    }
  };
</script>
<style scoped>
  .wrapper1440 {
    padding-left: 0px;
    padding-right: 0px;
  }
  @media (max-width: 767px) {
    .text-white {
      font-size: 36px
    }
    .lastest {
      top: -20px;
      z-index: -1;
    }
    .wrapper {
      padding-left: 0px;
      padding-right: 0px;
    }
    .wrapper1440 {
      padding-left: 10px;
      padding-right: 10px;
    }
    .main-new {
      margin-top: -70px;
    }
    .title-bar {
      height: 130px;
      max-height: 160px;
      padding-top: 10px;
      padding-bottom: 50px;
    }
  }
  @media (max-width: 1018px) and (min-width: 768px) {
    .rest-new {
      margin-top: -50px;
      height: calc(100% + 50px);
    }
    .main-new {
      margin-top: -50px;
    }
    .title-bar {
      height: 130px;
      max-height: 130px;
      padding-top: 20px;
      padding-bottom: 50px;
    }
  }
  @media (max-width: 1140px) and (min-width: 1019px) {
    .main-new {
      margin-top: -70px;
    }
    .wrapper {
      padding-left: 0px;
      padding-right: 0px;
    }
    .wrapper1440 {
      padding-left: 20px;
      padding-right: 20px;
    }
    .title-bar {
      height: 200px;
      max-height: 200px;
      padding-top: 20px;
      padding-bottom: 50px;
    }
  }
  @media (min-width: 1141px) {
    .main-new {
      margin-top: -70px;
    }
    .wrapper {
      padding-left: 20px;
      padding-right: 20px;
    }
    /* .wrapper1440 {
      padding-left: 20px;
      padding-right: 20px;
    } */
    .title-bar {
      height: 140px;
      max-height: 160px;
      padding-top: 2px;
      padding-bottom: 50px;
    }
  }
</style>
