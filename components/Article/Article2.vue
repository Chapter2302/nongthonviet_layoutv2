<template>
  <div class="flex">
    <div
      :style="$device.isMobile ? `min-width : ${articleImgWidth.xs}; max-width : ${articleImgWidth.xs}` : ($device.isTablet ? `min-width : ${articleImgWidth.sm}; max-width : ${articleImgWidth.sm}` : `min-width : ${articleImgWidth.md}; max-width : ${articleImgWidth.md}`) "
    >
      <nuxt-link :to="postLink" v-if="options.image">
        <div class="img-32-container">
          <client-only>
            <img
              v-if="options.image"
              class="img-32"
              :src="post.featuredImage"
              style="width : 100%; height : 100%"
              alt="post-img"
            />
            <nuxt-link
              v-if="post.category.categoryName && post.category.categoryAlias && post.category.categoryId"
              :to="`/category/${post.category.categoryAlias}-id=${post.category.categoryId}`"
              class="item-category absolute zero_bottom"
            >{{ post.category.categoryName }}</nuxt-link>
          </client-only>
        </div>
      </nuxt-link>
    </div>

    <div class="ml-4">
      <hr class="border-t-black-600 border-1 pl-4" />
      <div class="itemtitle line-clamp-title whitespace-normal mt-4">
        <nuxt-link :to="postLink" v-if="options.title">
          {{
          post.title
          }}
        </nuxt-link>
      </div>
      <div class="item-meta">
        <span class="item-author" v-if="post.penName && options.penName">
          <a>{{ post.penName }}</a>
          <span>-</span>
        </span>
        <span class="item-date" v-if="options.publicationTime">
          {{
          post.publicationTime | datetime("DD/MM/YYYY")
          }}
        </span>
      </div>
      <div class="whitespace-normal line-clamp-excerpt mt-2" v-if="options.excerpt">
        <span>{{post.excerpt}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: 0
    };
  },
  beforeMount() {
    this.screenWidth = screen.width;
  },
  computed: {
    console: () => console,
    postLink() {
      if (!this.post.type)
        return "/post/" + this.post.alias + `-id=${this.post.id}`;

      return this.post.type === "LongForm"
        ? "/longform/" + this.post.alias + `-id=${this.post.id}`
        : "/post/" + this.post.alias + `-id=${this.post.id}`;
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {
          image: true,
          title: true,
          penName: true,
          excerpt: false,
          publicationTime: false
        };
      }
    },
    articleImgWidth: {
      type: Object,
      default: () => {
        return {
          xs: "250px",
          md: "300px"
        };
      }
    }
  }
};
</script>

<style scoped>
.column-item .item-title {
  -webkit-line-clamp: 2;
}
.itemtitle {
  font-family: SourceSansProSemiBold;
}

@media (max-width: 767px) {
}

@media (max-width: 1018px) and (min-width: 768px) {
}

@media (max-width: 1140px) and (min-width: 1019px) {
}

@media (min-width: 1141px) {
}
</style>
