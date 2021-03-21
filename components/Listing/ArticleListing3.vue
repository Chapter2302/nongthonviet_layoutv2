<template>
  <div>
    <div v-for="(post,i) in posts" :key="i">
      <div v-if="!$device.isMobile" class="mb-4">
        <Article2
          :post="post"
          :articleImgWidth="{xs : '100px', sm : '200px', md : '300px'}"
          :options="{
      image: true,
      title: true,
      penName: true,
      excerpt: true,
      publicationTime: true
      }"
        />
      </div>
      <div v-if="$device.isMobile" class="mb-4">
        <Article
          :post="post"
          isFull
          :options="{
      image: true,
      title: true,
      penName: true,
      excerpt: true,
      publicationTime: true
      }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Article2 from "@/components/Article/Article2";
import Article from "@/components/Article";

export default {
  components: {
    Article2,
    Article
  },
  props: {
    posts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>