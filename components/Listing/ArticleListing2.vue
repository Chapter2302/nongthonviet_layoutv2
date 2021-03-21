<template>
  <div>
    <div v-for="(post,i) in posts" :key="i">
      <hr class="border-t-black-600 border-1" />
      <div class="flex items-center">
        <span>
          <i class="fas fa-circle" style="font-size : 8px; margin-right : 10px;"></i>
        </span>
        <Article
          :post="post"
          isFull
          :options="{
      image: false,
      title: true,
      penName: false,
      excerpt: false,
      publicationTime: false
      }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Article from "@/components/Article";
export default {
  components: {
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