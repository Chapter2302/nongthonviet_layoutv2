<template>
  <div v-if="!isNoLayout">
    <!--Block A-->
    <BlockA id="blockA" :HomeA_Slide="HomeA_Slide" :HomeA_Main="HomeA_Main" />
    <Container1440 class="mt-4">
      <hr class="border-t-black-600 border-2" />
    </Container1440>
    <!--Block B-->
    <ArticleListing :HomeB_Main="HomeB_Main" />
    <!--Ads-->
    <div style="background : #F2F2F2" class="py-4 mt-4">
      <Container1440>
        <AdsBlock adsNameByProp="HomeB_Main" maxHeight="300px" />
      </Container1440>
    </div>
    <!--BlockC-->
    <BlokC :HomeC_Main="HomeC_Main" :HomeC_Right="HomeC_Right" />

    <!-------------------------------------------------------------->
    <!--Block B-->
    <!-- <BlockB
      class="mt-4"
      realBlock="HomeB"
      :HomeB_Main="HomeB_Main"
      :titleHomeB_Main="titleHomeB_Main"
      :viewAllHomeB_Main="viewAllHomeB_Main"
      :HomeB_Right="HomeB_Right"
      :titleHomeB_Right="titleHomeB_Right"
      :viewAllHomeB_Right="viewAllHomeB_Right"
      :ads="HomeAds_B"
    />-->
    <!--Block C-->
    <div class="mt-48"></div>
    <BlockC
      realBlock="HomeC"
      :HomeC_Main="HomeC_Main"
      :titleHomeC_Main="titleHomeC_Main"
      :ads="HomeAds_C"
    />
    <AdsHomeMiddle class="mt-8" :ads="homeAdsThree" />
    <!--Block D-->
    <BlockB
      realBlock="HomeD"
      :HomeB_Main="HomeD_Main"
      :titleHomeB_Main="titleHomeD_Main"
      :viewAllHomeB_Main="viewAllHomeD_Main"
      :HomeB_Right="HomeD_Right"
      :titleHomeB_Right="titleHomeD_Right"
      :viewAllHomeB_Right="viewAllHomeD_Right"
      :ads="HomeAds_D"
    />
    <!--Block E-->
    <BlockC
      realBlock="HomeE"
      :HomeC_Main="HomeE_Main"
      :titleHomeC_Main="titleHomeE_Main"
      :ads="HomeAds_E"
    />
    <!--Block F-->
    <BlockB
      id="blockF"
      realBlock="HomeF"
      :HomeB_Main="HomeF_Main"
      :titleHomeB_Main="titleHomeF_Main"
      :viewAllHomeB_Main="viewAllHomeF_Main"
      :HomeB_Right="HomeF_Right"
      :titleHomeB_Right="titleHomeF_Right"
      :viewAllHomeB_Right="viewAllHomeF_Right"
      :ads="HomeAds_F"
    />
    <AdsHomeMiddle :ads="homeAdsThree" />

    <!--Block G-->
    <BlockC
      realBlock="HomeG"
      :HomeC_Main="HomeG_Main"
      :titleHomeC_Main="titleHomeG_Main"
      :ads="HomeAds_G"
    />
    <!--Block H-->
    <BlockC
      realBlock="HomeH"
      :HomeC_Main="HomeH_Main"
      :titleHomeC_Main="titleHomeH_Main"
      :ads="HomeAds_H"
    />
    <SocialBlock class="mt-8" :ads="homeAdsOne" />
  </div>
</template>

<script>
import BlockA from "@/components/HomePage/BlockA/BlockA";
import SocialBlock from "@/components/HomePage/SocialBlock/SocialBlock";
import BlockB from "@/components/HomePage/BlockB/BlockB";
import BlockC from "@/components/HomePage/BlockC/BlockC.vue";
import BlokC from "@/components/HomePage/BlockC/BlokC.vue";
import AdsHomeMiddle from "@/components/Advertisement/AdsHomeMiddle";
import AdsHomeBottom from "@/components/Advertisement/AdsHomeBottom";
import TopBanner from "@/components/HomePage/TopBanner";
import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";
import Container1440 from "@/components/containers/Container1440";
import ArticleListing from "@/components/Listing/ArticleListing";

export default {
  components: {
    BlockA,
    SocialBlock,
    BlockB,
    BlokC,
    BlockC,
    AdsHomeMiddle,
    AdsHomeBottom,
    TopBanner,
    AdsBlock,
    Container1440,
    ArticleListing
  },

  computed: {
    homeAdsOne() {
      if (this.ads) {
        return this.ads.find(el => el.section === "HomeAds1");
      }
    },
    homeAdsTwo() {
      if (this.ads) {
        return this.ads.find(el => el.section === "HomeAds2");
      }
    },
    homeAdsThree() {
      if (this.ads) {
        return this.ads.find(el => el.section === "HomeAds3");
      }
    },
    homeAdsFour() {
      if (this.ads) {
        return this.ads.find(el => el.section === "HomeAds4");
      }
    },
    homeAdsFive() {
      if (this.ads) {
        return this.ads.find(el => el.section === "HomeAds5");
      }
    },
    homeAdsSix() {
      if (this.ads) {
        return this.ads.find(el => el.section === "HomeAds6");
      }
    }
  },
  data() {
    return {
      firstLoad: false,
      secondLoad: false
    };
  },
  mounted() {
    window.onscroll = () => {
      let firstLoadPos;
      let secondLoadPos;
      if (this.$device.isMobile) {
        firstLoadPos = 5000;
        secondLoadPos = 10000;
      } else {
        firstLoadPos = 700;
        secondLoadPos = 5000;
      }
      const setSortParams = listType => {
        let sortParams = {};
        switch (listType) {
          case "Tin nổi bật":
            sortParams = {
              isFeatured: true,
              sort: "isFeatured=desc,sortFeatured=desc,publicationTime=desc"
            };
            break;
          case "Xem nhiều nhất":
            sortParams = {
              isMostView: true,
              sort: "viewCount=desc,publicationTime=desc"
            };
            break;
          case "Tương tác nhiều nhất":
            sortParams = {
              isMostInteract: true,
              sort: "commentCount=desc,publicationTime=desc"
            };
            break;
          default:
            sortParams = {
              sort: "publicationTime=desc"
            };
        }
        return sortParams;
      };
      if (
        document.body.scrollTop > firstLoadPos ||
        document.documentElement.scrollTop > firstLoadPos
      ) {
        //Load Block C,D,E
        if (!this.firstLoad) {
          console.log("first load");
          this.firstLoad = true;
          //Block C
          this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              ...setSortParams(
                this.HomeCMainObj ? this.HomeCMainObj.listType : ""
              ),
              categoryId: this.HomeCMainObj ? this.HomeCMainObj.cateId : ""
            },
            nextActions: res => {
              console.log('result of homec_main ' ,  this.HomeCMainObj)
              this.HomeC_Main = [...res.result];
            },
            errorActions: err => {
              console.log(err);
            }
          });
          this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              ...setSortParams(
                this.HomeCRightObj ? this.HomeCRightObj.listType : ""
              ),
              categoryId: this.HomeCRightObj ? this.HomeCRightObj.cateId : ""
            },
            nextActions: res => {
              console.log('result of homec_right ' , this.HomeCRightObj)
              this.HomeC_Right = [...res.result];
            },
            errorActions: err => {
              console.log(err);
            }
          });
          //Block D
          this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              ...setSortParams(
                this.HomeDMainObj ? this.HomeDMainObj.listType : ""
              ),
              categoryId: this.HomeDMainObj ? this.HomeDMainObj.cateId : ""
            },
            nextActions: res => {
              this.HomeD_Main = [...res.result];
            },
            errorActions: err => {
              console.log(err);
            }
          });
          this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              ...setSortParams(
                this.HomeDRightObj ? this.HomeDRightObj.listType : ""
              ),
              categoryId: this.HomeDRightObj ? this.HomeDRightObj.cateId : ""
            },
            nextActions: res => {
              this.HomeD_Right = [...res.result];
            },
            errorActions: err => {
              console.log(err);
            }
          });
          //Block E
          this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              ...setSortParams(
                this.HomeEMainObj ? this.HomeEMainObj.listType : ""
              ),
              categoryId: this.HomeEMainObj ? this.HomeEMainObj.cateId : ""
            },
            nextActions: res => {
              this.HomeE_Main = [...res.result];
            },
            errorActions: err => {
              console.log(err);
            }
          });
        }
      }
      if (
        document.body.scrollTop > secondLoadPos ||
        document.documentElement.scrollTop > secondLoadPos
      ) {
        //Load Block F,G,H
        if (!this.secondLoad) {
          console.log("second load");
          this.secondLoad = true;
          //Block F
          this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              ...setSortParams(
                this.HomeFMainObj ? this.HomeFMainObj.listType : ""
              ),
              categoryId: this.HomeFMainObj ? this.HomeFMainObj.cateId : ""
            },
            nextActions: res => {
              this.HomeF_Main = [...res.result];
            },
            errorActions: err => {
              console.log(err);
            }
          });
          this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              ...setSortParams(
                this.HomeFRightObj ? this.HomeFRightObj.listType : ""
              ),
              categoryId: this.HomeFRightObj ? this.HomeFRightObj.cateId : ""
            },
            nextActions: res => {
              this.HomeF_Right = [...res.result];
            },
            errorActions: err => {
              console.log(err);
            }
          });
          this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              ...setSortParams(
                this.HomeGMainObj ? this.HomeGMainObj.listType : ""
              ),
              categoryId: this.HomeGMainObj ? this.HomeGMainObj.cateId : ""
            },
            nextActions: res => {
              this.HomeG_Main = [...res.result];
            },
            errorActions: err => {
              console.log(err);
            }
          }),
            this.$store.dispatch("getArticleListing", {
              skip: 0,
              limit: 5,
              data: {
                ...setSortParams(
                  this.HomeHMainObj ? this.HomeHMainObj.listType : ""
                ),
                categoryId: this.HomeHMainObj ? this.HomeHMainObj.cateId : ""
              },
              nextActions: res => {
                this.HomeH_Main = [...res.result];
              },
              errorActions: err => {
                console.log(err);
              }
            });
        }
      }
    };
  },
  async asyncData(context) {
    // get layout
    let layout = [];
    await context.store.dispatch("getLayout", {
      page: "HomePage",
      nextActions: res => {
        layout = res.result;
      },
      errorActions: err => {
        console.log(err);
      }
    });
    // call API options follow type of list
    //Featured, MostView, MostInteract, Default
    const setSortParams = listType => {
      let sortParams = {};
      switch (listType) {
        case "Tin nổi bật":
          sortParams = {
            isFeatured: true,
            sort: "isFeatured=desc,sortFeatured=desc,publicationTime=desc"
          };
          break;
        case "Xem nhiều nhất":
          sortParams = {
            isMostView: true,
            sort: "viewCount=desc,publicationTime=desc"
          };
          break;
        case "Tương tác nhiều nhất":
          sortParams = {
            isMostInteract: true,
            sort: "commentCount=desc,publicationTime=desc"
          };
          break;
        default:
          sortParams = {
            sort: "publicationTime=desc"
          };
      }
      return sortParams;
    };

    if (layout && layout.blocks && layout.blocks.length > 0) {
      const findBlockByName = blockName => {
        return layout.blocks.find(e => {
          return e.name === blockName;
        });
      };
      const findSectionByName = (block, sectionName) => {
        return block.sections.find(e => {
          return e.name === sectionName;
        });
      };

      //HomeABlock
      let HomeABlock = findBlockByName("HomeA");
      let HomeA_Slide = [];
      let HomeA_Main = [];
      let HomeA_Right = [];

      //HomeA_Slide
      let HomeASlideObj = findSectionByName(HomeABlock, "HomeA_Slide");
      const titleHomeA_Slide = HomeASlideObj ? HomeASlideObj.title : "";

      //HomeA_Main
      let HomeAMainObj = findSectionByName(HomeABlock, "HomeA_Main");
      const titleHomeA_Main = HomeAMainObj ? HomeAMainObj.title : "";

      //HomeA_Right
      let HomeARightObj = findSectionByName(HomeABlock, "HomeA_Right");
      const titleHomeA_Right = HomeARightObj ? HomeARightObj.title : "";

      //HomeBBlock
      let HomeBBlock = findBlockByName("HomeB");
      let HomeB_Main = [];
      let HomeB_Right = [];

      //HomeB_Main
      let HomeBMainObj = findSectionByName(HomeBBlock, "HomeB_Main");
      const titleHomeB_Main = HomeBMainObj ? HomeBMainObj.title : "";
      const viewAllHomeB_Main =
        HomeBMainObj && HomeBMainObj.cateAlias && HomeBMainObj.cateId
          ? `/category/${HomeBMainObj.cateAlias}-id=${HomeBMainObj.cateId}`
          : "/";

      //HomeB_Right
      let HomeBRightObj = findSectionByName(HomeBBlock, "HomeB_Right");
      const titleHomeB_Right = HomeBRightObj ? HomeBRightObj.title : "";
      const viewAllHomeB_Right =
        HomeBRightObj && HomeBRightObj.cateAlias && HomeBRightObj.cateId
          ? `/category/${HomeBRightObj.cateAlias}-id=${HomeBRightObj.cateId}`
          : "/";

      //HomeCBlock
      let HomeCBlock = findBlockByName("HomeC");
      let HomeC_Main = [];
      let HomeC_Right = [];
      //HomeC_Main
      let HomeCMainObj = findSectionByName(HomeCBlock, "HomeC_Main");
      const titleHomeC_Main = HomeCMainObj ? HomeCMainObj.title : "";
      //HomeC_Right
      let HomeCRightObj = findSectionByName(HomeCBlock, "HomeC_Right")
      //HomeDBlock
      let HomeDBlock = findBlockByName("HomeD");
      let HomeD_Main = [];
      let HomeD_Right = [];

      //HomeD_Main
      let HomeDMainObj = findSectionByName(HomeDBlock, "HomeD_Main");
      const titleHomeD_Main = HomeDMainObj ? HomeDMainObj.title : "";
      const viewAllHomeD_Main =
        HomeDMainObj && HomeDMainObj.cateAlias && HomeDMainObj.cateId
          ? `/category/${HomeDMainObj.cateAlias}-id=${HomeDMainObj.cateId}`
          : "/";

      //HomeD_Right
      let HomeDRightObj = findSectionByName(HomeDBlock, "HomeD_Right");
      const titleHomeD_Right = HomeDRightObj ? HomeDRightObj.title : "";
      const viewAllHomeD_Right =
        HomeDRightObj && HomeDRightObj.cateAlias && HomeDRightObj.cateId
          ? `/category/${HomeDRightObj.cateAlias}-id=${HomeDRightObj.cateId}`
          : "/";

      //HomeEBlock
      let HomeEBlock = findBlockByName("HomeE");
      let HomeE_Main = [];
      let HomeE_Right = [];

      //HomeE_Main
      let HomeEMainObj = findSectionByName(HomeEBlock, "HomeE_Main");
      const titleHomeE_Main = HomeEMainObj ? HomeEMainObj.title : "";

      //HomeFBlock
      let HomeFBlock = findBlockByName("HomeF");
      let HomeF_Main = [];
      let HomeF_Right = [];

      //HomeF_Main
      let HomeFMainObj = findSectionByName(HomeFBlock, "HomeF_Main");
      const titleHomeF_Main = HomeFMainObj ? HomeFMainObj.title : "";
      const viewAllHomeF_Main =
        HomeFMainObj && HomeFMainObj.cateAlias && HomeFMainObj.cateId
          ? `/category/${HomeFMainObj.cateAlias}-id=${HomeFMainObj.cateId}`
          : "/";

      //HomeF_Right
      let HomeFRightObj = findSectionByName(HomeFBlock, "HomeF_Right");
      const titleHomeF_Right = HomeFRightObj ? HomeFRightObj.title : "";
      const viewAllHomeF_Right =
        HomeFRightObj && HomeFRightObj.cateAlias && HomeFRightObj.cateId
          ? `/category/${HomeFRightObj.cateAlias}-id=${HomeFRightObj.cateId}`
          : "/";

      //HomeGBlock
      let HomeGBlock = findBlockByName("HomeG");
      let HomeG_Main = [];
      //HomeG_Main
      let HomeGMainObj = findSectionByName(HomeGBlock, "HomeG_Main");
      const titleHomeG_Main = HomeGMainObj ? HomeGMainObj.title : "";

      //HomeHBlock
      let HomeHBlock = findBlockByName("HomeH");
      let HomeH_Main = [];
      //HomeH_Main
      let HomeHMainObj = findSectionByName(HomeHBlock, "HomeH_Main");
      const titleHomeH_Main = HomeHMainObj ? HomeHMainObj.title : "";

      //  ========= //
      // ads

      let ads = [];
      // Call API for Block A and B, the rest load onscroll//
      await Promise.all([
        context.store.dispatch("getArticleListing", {
          skip: 0,
          limit: 4,
          data: {
            ...setSortParams(HomeASlideObj ? HomeASlideObj.listType : ""),
            categoryId: HomeASlideObj ? HomeASlideObj.cateId : ""
          },
          nextActions: res => {
            //console.log('hey ' , res.result)
            console.log('slide subtype: ', HomeASlideObj.listType)
            console.log('slide cateId: ', HomeASlideObj.cateId)
            HomeA_Slide = [...res.result];
          },
          errorActions: err => {
            console.log(err);
          }
        }),

        context.store.dispatch("getArticleListing", {
          skip: 0,
          limit: 3,
          data: {
            ...setSortParams(HomeAMainObj ? HomeAMainObj.listType : ""),
            categoryId: HomeAMainObj ? HomeAMainObj.cateId : ""
          },
          nextActions: res => {
            console.log('main subtype: ', HomeAMainObj.listType)
            console.log('main cateId: ', HomeAMainObj.cateId)
            HomeA_Main = [...res.result];
          },
          errorActions: err => {
            console.log(err);
          }
        }),

        context.store.dispatch("getArticleListing", {
          skip: 0,
          limit: 5,
          data: {
            ...setSortParams(HomeARightObj ? HomeARightObj.listType : ""),
            categoryId: HomeARightObj ? HomeARightObj.cateId : ""
          },
          nextActions: res => {
            HomeA_Right = [...res.result];
          },
          errorActions: err => {
            console.log(err);
          }
        }),

        context.store.dispatch("getArticleListing", {
          skip: 0,
          limit: 5,
          data: {
            ...setSortParams(HomeBMainObj ? HomeBMainObj.listType : ""),
            categoryId: HomeBMainObj ? HomeBMainObj.cateId : ""
          },
          nextActions: res => {
            HomeB_Main = [...res.result];
          },
          errorActions: err => {
            console.log(err);
          }
        }),
        context.store.dispatch("getArticleListing", {
          skip: 0,
          limit: 5,
          data: {
            ...setSortParams(HomeBRightObj ? HomeBRightObj.listType : ""),
            categoryId: HomeBRightObj ? HomeBRightObj.cateId : ""
          },
          nextActions: res => {
            HomeB_Right = [...res.result];
          },
          errorActions: err => {
            console.log(err);
          }
        })
      ]);

      return {
        isNoLayout: false,

        HomeA_Slide,
        titleHomeA_Slide,
        HomeA_Main,
        titleHomeA_Main,
        HomeA_Right,
        titleHomeA_Right,
        HomeAds_A: { name: "todo APIAds" },

        HomeB_Main,
        titleHomeB_Main,
        viewAllHomeB_Main,
        HomeB_Right,
        titleHomeB_Right,
        viewAllHomeB_Right,
        HomeAds_B: { name: "todo APIAds" },

        HomeC_Main,
        HomeC_Right,
        HomeCMainObj,
        HomeCRightObj,
        titleHomeC_Main,
        HomeAds_C: { name: "todo APIAds" },

        HomeD_Main,
        HomeDMainObj,
        HomeDRightObj,
        titleHomeD_Main,
        viewAllHomeD_Main,
        HomeD_Right,
        titleHomeD_Right,
        viewAllHomeD_Right,
        HomeAds_D: { name: "todo APIAds" },

        HomeE_Main,
        HomeEMainObj,
        titleHomeE_Main,
        HomeAds_E: { name: "todo APIAds" },

        HomeF_Main,
        HomeFMainObj,
        titleHomeF_Main,
        viewAllHomeF_Main,
        HomeF_Right,
        HomeFRightObj,
        titleHomeF_Right,
        viewAllHomeF_Right,
        HomeAds_F: { name: "todo APIAds" },

        HomeG_Main,
        HomeGMainObj,
        titleHomeG_Main,
        HomeAds_G: { name: "todo APIAds" },

        HomeH_Main,
        HomeHMainObj,
        titleHomeH_Main,
        HomeAds_H: { name: "todo APIAds" }
        // ads
      };
    } else {
      return {
        isNoLayout: true
      };
    }
  }
};
</script>

<style></style>
