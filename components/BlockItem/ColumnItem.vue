<template>
  <div class="column-item">
    <div class="column-item-container">
      <div>
        <nuxt-link :to="postLink">
          <div class="img-32-container">
            <client-only>
              <img
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
      <div class="item-info">
        <div class="itemtitle line-clamp-title">
          <nuxt-link :to="postLink" v-if="realBlock == 'BlockC'">
            {{
            post.title
            }}
          </nuxt-link>
          <nuxt-link :to="postLink" v-else-if="realBlock != 'BlockC'">
            <!-- <template v-if="post.title.length >= 56">
              {{
                post.title.slice(0,50)
              }}
            </template>
            <template v-else>
              {{post.title}}
            </template>-->
            <template>{{post.title}}</template>
          </nuxt-link>
        </div>
        <div class="item-meta">
          <span class="item-author" v-if="post.penName">
            <a>{{ post.penName }}</a>
            <span>-</span>
          </span>
          <span class="item-date">
            {{
            post.publicationTime | datetime("DD/MM/YYYY")
            }}
          </span>
        </div>
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
    realBlock: {
      type: String,
      default: ""
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
