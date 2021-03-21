<template>
  <container1240>
    <div class="main-block flex xs:block mb-5">
      <!-- main block -->
      <div class="main-block__main flex-grow">
        <MainBlockItem
          v-for="post in posts.slice(0, posts.length / 2)"
          :key="post.id"
          :post="post"
          :is1240="true"
        />
        <div class="my-5">
          <!-- <img src="@/assets/imgs/ads_ngang.jpg" style="width : 100%" alt /> -->
          <AdsBlock adsNameByProp="Listing_Main" />
        </div>

        <MainBlockItem
          v-for="post in posts.slice(posts.length /2, posts.length)"
          :key="post.id"
          :post="post"
          :is1240="true"
        />
        <p
          class="text-center text-lg bold"
          v-if="posts && !posts.length"
        >Chưa cập nhật bài viết phù hợp</p>

        <Pagination
          v-if="totalNews > 0"
          :totalNews="totalNews"
          :limit="limit"
          @changePage="changePage"
          :currentPageProp="currentPage"
        />
      </div>

      <!-- right block -->
      <div class="main-block__right top-fiftyfive sticky xs:static xs:mt-5">
        <div v-for="(section,i) in sectionsArr" :key="i">
          <div class="mb-5">
            <AdsBlock v-if="i % 2 === 0 && i <= 4" :adsNameByProp="'Listing_Right' + (i/2 + 1)" />
          </div>
          <div class="main-block__right-block mb-5" v-if="section[section.keyname].length">
            <h4 class="block-title">{{section.name}}</h4>
            <SideBlockItem
              v-for="(post, index) in section[section.keyname]"
              :post="post"
              :class="{ 'mb-0': index === section[section.keyname].length - 1 }"
              :key="index"
              :isBorder="true"
            />
            <nuxt-link :to="`/category/${section.alias}-id=${section.id}`">
              <div class="blockb__button small mt-5">
                Xem tất cả
                <i class="fas fa-bars"></i>
              </div>
            </nuxt-link>
          </div>
        </div>
        <!--The rest of creativeSlots-->
        <div class="mb-5" v-if="countCreativeSlots <= 3">
          <div v-for="(ads ,i) in restAdsBlocksArr" :key="i">
            <AdsBlock :adsNameByProp="'Listing_Right' + ( ads )" />
          </div>
        </div>
      </div>
    </div>
  </container1240>
</template>

<script>
// components
import SideBlockItem from "../../SideBlockItem/SideBlockItem.vue";
import Container1240 from "../../containers/Container1240.vue";
import AdsSide from "../../Advertisement/AdsSide.vue";
import MainBlockItem from "../../BlockItem/RowItem.vue";
import Pagination from "../../Pagination/Pagination.vue";
import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";
export default {
  components: {
    Container1240,
    SideBlockItem,
    MainBlockItem,
    AdsSide,
    Pagination,
    AdsBlock
  },
  props: {
    currentPage: {
      default: 1
    },
    posts: {
      type: Array
    },
    totalNews: {
      type: Number
    },
    limit: {
      type: Number
    },
    ads: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isHaveChildCate: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      listSections: [],
      sectionsArr: [],
      countCreativeSlots: 0,
      restAdsBlocksArr: []
    };
  },
  methods: {
    changePage(p) {
      this.$emit("changePage", p);
    },
    async findSections() {
      //get categories list
      let categories;
      let list = [];
      await this.$store
        .dispatch("getCategories", {
          nextActions: res => {
            categories = res.result;
          }
        })
        .then(() => {
          if (this.isHaveChildCate) {
            this.category.subCates.forEach(e => {
              list.push({ id: e.id, name: e.name, alias: e.alias });
            });
          }
          if (!this.isHaveChildCate) {
            let temp = categories.filter(e => {
              return (
                e.parentId === this.category.parentId &&
                e.id !== this.category.id
              );
            });
            temp.forEach(e => {
              list.push({ id: e.id, name: e.name, alias: e.alias });
            });
          }
          this.listSections = list;
        });
    }
  },

  async created() {
    if (process.client) {
      // Get id to call API section dynamic follow have/ no have child cate
      // If no have get same level, if have get childCates
      await this.findSections();
      let temp = this.listSections;
      let tempArr = [];
      const forLoop = async _ => {
        for (let i = 0; i < temp.length; i++) {
          await this.$store.dispatch("getArticleListing", {
            skip: 0,
            limit: 5,
            data: {
              categoryId: temp[i].id
            },
            nextActions: res => {
              if (res.result.length) {
                tempArr = [
                  ...tempArr,
                  {
                    ["sort" + (i + 1)]: res.result,
                    name: temp[i].name,
                    alias: temp[i].alias,
                    id: temp[i].id,
                    keyname: "sort" + (i + 1)
                  }
                ];
              }
            },
            errorActions: err => {
              console.log(err);
            }
          });
        }
      };
      await forLoop();
      this.sectionsArr = tempArr;

      // Render Ads Logic
      // count creativeSlots with the quantity of sections above (follow rule 1 22 1 22 1)
      // 1 : creativeSlot
      // 2 : section
      // section is not require but creativeSlot always =  3
      let countCreativeSlots;
      if (!this.sectionsArr.length) {
        countCreativeSlots = 0;
      } else {
        countCreativeSlots =
          this.sectionsArr.length / 2 >= 1
            ? Math.ceil(this.sectionsArr.length / 2)
            : 1;
      }
      this.countCreativeSlots = countCreativeSlots;

      // The rest of creativeSlots
      let restAdsBlocks = 3 - this.countCreativeSlots;
      let restAdsBlocksArr = [];
      if (restAdsBlocks === 0) {
      }
      if (restAdsBlocks === 1) {
        restAdsBlocksArr.push(3);
      }
      if (restAdsBlocks === 2) {
        restAdsBlocksArr.push(2);
        restAdsBlocksArr.push(3);
      }
      if (restAdsBlocks === 3) {
        restAdsBlocksArr.push(1);
        restAdsBlocksArr.push(2);
        restAdsBlocksArr.push(3);
      }
      this.restAdsBlocksArr = restAdsBlocksArr;
    }
  },
  computed: {
    console: () => console
  }
};
</script>

<style scoped>
/* main block */
.main-block {
  align-items: flex-start;
}

/* end main block */

/* main block main content */

.main-block__main {
  padding-right: 24px;
  padding-left: 24px;
}

/* end main block main */

/* main block right */

.main-block__right {
  padding-right: 24px;
  padding-left: 24px;
}

.main-block__right-block {
  width: auto;
  border: 1px solid #eaeaea;
  padding-right: 19px;
  padding-left: 19px;
  padding-top: 15px;
  padding-bottom: 20px;
}

/* end main block right */

/* responsive */
@media (max-width: 768px) {
  .main-block__main {
    padding-right: 14px;
    padding-left: 14px;
  }
  .main-block__right {
    padding-right: 0px;
    padding-left: 0px;
  }
}
/* tablet */

@media (max-width: 1018px) and (min-width: 768px) {
  .main-block__right {
    min-width: 250px;
    padding-right: 14px;
    padding-left: 14px;
  }

  /* main block */
  .main-block__main {
    padding-right: 14px;
    padding-left: 14px;
  }
}

/* mobile */

/* other */

@media (max-width: 1140px) and (min-width: 1019px) {
  .main-block__right {
    min-width: 250px;
    max-width: 290px;
    padding-right: 20px;
    padding-left: 20px;
  }

  .main-block__main {
    padding-right: 20px;
    padding-left: 20px;
  }
}

@media (min-width: 1141px) {
  .main-block__right {
    min-width: 350px;
    max-width: 370px;
  }
}
</style>
