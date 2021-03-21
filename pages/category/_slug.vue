<template>
  <div>
    <AdsBlock adsNameByProp="TopBanner" />
    <div id="content"></div>
    <!-- <TopBanner /> -->
    <Crumbs
      class="container mt-8"
      :class="$device.isMobile ? 'pl-2' : ''"
      :links="$device.isMobile ? linksMobile : links"
    />

    <!--First List-->
    <BlockADetailPage :list="firstList" v-if="firstList && firstList.length" />

    <!--Featured List-->
    <FeaturedList
      :style="!$device.isMobile ? 'padding-left : 3rem; padding-right : 3rem' : ''"
      :posts="featuredList"
      v-if="featuredList && featuredList.length"
    />
    <MainBlock
      @changePage="changePage"
      :currentPage="currentPage"
      class="mt-10"
      :posts="secondList"
      :totalNews="total"
      :limit="limit"
      :ads="adsSecondList"
      :isHaveChildCate="isHaveChildCate"
      :category="category"
    />

    <!--Newest List-->
    <FeaturedList
      :posts="newestList"
      v-if="newestList && newestList.length"
      :name="'Tin Mới Nhất'"
    />

    <SocialBlock class="mt-10" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// components
import AdsBlock from "../../components/CategoryPage/AdsBlock/AdsBlock.vue";
import CategoryBlock from "../../components/CategoryPage/CategoryBlock/CategoryBlock.vue";
import MainBlock from "../../components/CategoryPage/MainBlock/MainBlock.vue";
import BlockADetailPage from "@/components/DetailPage/BlockADetailPage";
import FeaturedList from "@/components/DetailPage/FeaturedList";
import Crumbs from "../../components/Crumbs/Crumbs.vue";
import SocialBlock from "@/components/HomePage/SocialBlock/SocialBlock";
import TopBanner from "@/components/HomePage/TopBanner/index.vue";
export default {
  components: {
    AdsBlock,
    CategoryBlock,
    MainBlock,
    Crumbs,
    BlockADetailPage,
    FeaturedList,
    SocialBlock,
    TopBanner
  },
  data() {
    return {
      skip: 0,
      limit: 20, //news per page,
      currentPage: 1
    };
  },
  created() {
    if (this.$route.query.p && this.$route.query.p != 1) {
      this.changePage(this.$route.query.p);
      this.currentPage = this.$route.query.p;
    }
  },
  computed: {
    adsA() {
      return this.ads ? this.ads.find(e => e.section === "CateAds1") : {};
    },
    adsB() {
      return this.ads ? this.ads.find(e => e.section === "CateAds2") : {};
    },
    firstList() {
      return this.posts.slice(0, 5);
    },
    secondList() {
      return this.posts.slice(5);
    }
  },
  async asyncData(context) {
    const id = context.route.params.slug.slice(
      context.route.params.slug.indexOf("=") + 1
    );
    let posts;
    let total;
    await context.store.dispatch("getArticleListing", {
      skip: 0,
      limit: 10,
      data: {
        categoryId: id
      },
      nextActions: res => {
        posts = res.result;
        total = res.total;
      },
      errorActions: err => {
        console.log(err);
      }
    });
    let category;
    await context.store.dispatch("getDetailCategory", {
      id,
      nextActions: data => {
        category = data.result;
      },
      errorActions: err => {}
    });

    let subLinks = [];
    let isHaveChildCate = false;
    if (category && category.subCates && category.subCates.length) {
      isHaveChildCate = true;
      const subCates = category.subCates;
      subCates.forEach(e => {
        subLinks.push({
          name: "/ " + e.name,
          to: `/category/${e.alias}-id=${e.id}`,
          last: true
        });
      });
      subLinks[subLinks.length - 1].last = true;
    }
    // const childCates =
    const links = [
      {
        name: category.name,
        to: context.route.path,
        last: true
      },
      ...subLinks.slice(0, 5)
    ];
    const linksMobile = [
      {
        name: category.name,
        to: context.route.path,
        last: true
      }
    ];
    let ads;
    await context.store.dispatch(
      "getAds",
      {
        creativeSlot: "CatePage",
        nextActions: res => {
          ads = [...res.result];
        },
        errorActions: err => {
          console.log(err);
        }
      }
      // {
      //   page: "catePage",

      //   nextActions: res => {
      //     ads = [...res.result];
      //   }
      // }
    );

    // Featured List
    let featuredList = [];
    await context.store.dispatch("getArticleListing", {
      skip: 0,
      limit: 4,
      data: {
        categoryId: category.id
      },
      nextActions: res => {
        featuredList = [...res.result];
      },
      errorActions: err => {
        console.log(err);
      }
    });

    // Newest List
    let newestList = [];
    await context.store.dispatch("getArticleListing", {
      skip: 0,
      limit: 8,
      data: {
        categoryId: ""
      },
      nextActions: res => {
        newestList = [...res.result];
      },
      errorActions: err => {
        console.log(err);
      }
    });
    return {
      featuredList,
      newestList,
      posts,
      category,
      total,
      adsSecondList: {},
      links,
      linksMobile,
      isHaveChildCate
    };

    // link
  },

  methods: {
    async changePage(p) {
      console.log(p);
      this.$router.push({ query: { p } });
      this.skip = this.limit * (p - 1);
      const id = this.$route.params.slug.slice(
        this.$route.params.slug.indexOf("=") + 1
      );
      await this.$store.dispatch("getArticleListing", {
        skip: this.skip,
        limit: this.limit,
        data: {
          categoryId: id
        },
        nextActions: res => {
          this.posts = res.result;
          this.total = res.total;
        },
        errorActions: err => {
          console.log(err);
        }
      });
      if (process.client && window && window.pageYOffset > 0) {
        let elmnt = document.getElementById("content");
        elmnt.scrollIntoView();
      }
    }
  },
  head() {
    return {
      titleTemplate: this.category ? this.category.name : process.env.Webname,
      title: this.category ? this.category.name : process.env.Webname,
      meta: [
        {
          hid: "apple-mobile-web-app-title",
          name: "apple-mobile-web-app-title",
          content: process.env.Webname
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          property: "og:site_name",
          content: process.env.Webname
        },
        {
          hid: "og:url",
          property: "og:url",
          name: "og:url",
          content: process.env.BASE_URL + this.$route.fullPath
        },
        {
          hid: "og:type",
          property: "og:type",
          name: "og:type",
          content: "article"
        },
        {
          hid: "og:title",
          property: "og:title",
          name: "og:title",
          content: this.category.name
        },
        {
          hid: "description",
          property: "description",
          name: "description",
          content: this.category.name
        },
        {
          hid: "og:description",
          property: "og:description",
          name: "og:description",
          content: this.category.name
        },
        {
          hid: "og:image",
          property: "og:image",
          name: "og:image",
          content: this.category.name
        }
      ]
    };
  }
};
</script>

<style></style>
