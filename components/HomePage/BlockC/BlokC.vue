<template>
  <Container1440 class="mt-4">
    <div class="mt-8 mb-4 flex items-center">
      <span class="cate-parent">Thời Sự</span>
      <span style="color : #97b640" class="mx-4">
        <i class="fas fa-chevron-right"></i>
      </span>
      <span class="sub-cate">Tin tức</span>
      <span style="color : #97b640; font-size : 5px;" class="mx-4">
        <i class="fas fa-circle"></i>
      </span>
      <span class="sub-cate">Thời luận</span>
    </div>

    <div class="grid grid-cols-12 gap-4 flex-grow" style="border-bottom : #e2e8f0 solid 2px">
      <div class="col-span-8 xs:col-span-12">
        <div :style="$device.isMobile ? '' : 'border-right : #e2e8f0 solid 2px; padding-right : 1rem'">
          <ArticleListing3 :posts="HomeC_Main.slice(1,8)" />
        </div>
      </div>
      <div class="col-span-4 xs:col-span-12">
        <div>
          <Article
            :post="HomeC_Right[0]"
            isFull
            :options="{penName: false, publicationTime: false, image: true,
          title: true,excerpt: false}"
          />
        </div>
        <div class="mt-4">
          <ArticleListing2 :posts="HomeC_Right.slice(1,8)" />
        </div>
      </div>
    </div>
  </Container1440>
</template>
<script>
import Container1440 from "@/components/containers/Container1440";
import Article from "@/components/Article";
import ArticleListing2 from "@/components/Listing/ArticleListing2";
import ArticleListing3 from "@/components/Listing/ArticleListing3";
export default {
  components: {
    Container1440,
    Article,
    ArticleListing2,
    ArticleListing3
  },
  props: {
    HomeC_Main: {
      type: Array,
      default: () => {
        return [];
      }
    },
    HomeC_Right: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
};
</script>

<style scoped>
.cate-parent {
  color: #97b640;
  font-weight: 900;
  font-size: 36px;
}
.sub-cate {
  font-weight: 500;
  font-size: 22px;
  color: #97b640;
}
</style>
