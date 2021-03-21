<template>
  <Container1440 class="mt-4">
    <div
      class="hide-scroll flex whitespace-no-wrap"
      ref="scrollable"
      @mousewheel="onMousewheel"
      @mousedown="onMousedown"
      @mouseleave="onMouseleave"
      @mouseup="onMouseup"
      @mousemove="onMousemove"
    >
      <div v-for="(post,i) in HomeB_Main" :key="i" class="mr-4">
        <Article :post="post" :options="{penName: false, publicationTime: false, image: true,
          title: true,excerpt: false}"/>
      </div>
    </div>
  </Container1440>
</template>
<script>
import Container1440 from "@/components/containers/Container1440";
import mouseEvent from "@/mixins/mouseEvent";
import Article from "@/components/Article";
//For Dev
import { articles } from "@/static/staticData";

export default {
  mixins: [mouseEvent],
  components: {
    Container1440,
    Article
  },
  props: {
    HomeB_Main: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      articles: articles
    };
  }
};
</script>

<style scoped>
.hide-scroll::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scroll {
  overflow-x: scroll;
}
</style>
