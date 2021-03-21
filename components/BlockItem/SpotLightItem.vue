<template>
  <div
    class="xs:col-span-12 sm:col-span-6 col-span-6 flex flex-col main-height spotlight-item"
  >
    <div class="h-full relative flex-grow item-image-container" v-if="post">
      <nuxt-link
        v-if="post.category"
        :to="`/category/${post.category.categoryAlias}-id=${post.category.categoryId}`"
        class="item-category absolute zero_bottom"
      >
        {{ post.category.categoryName }}
      </nuxt-link>
      <nuxt-link :to="postLink" class="item-image">
        <img :src="post.featuredImage" alt="post-img" style="width : 100%;" />
      </nuxt-link>
    </div>
    <div class="item-info">
      <h3 class="item-title line-clamp-title">
        <nuxt-link :to="postLink">{{ post.title }}</nuxt-link>
      </h3>

      <div class="item-meta">
        <span class="item-author">
          <nuxt-link to="/author" v-if="post.penName">{{ post.penName }}</nuxt-link>
          <span v-if="post.penName">-</span>
        </span>
        <span class="item-date">{{
          post.publicationTime | datetime("DD/MM/YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateInfo: {},
    };
  },
  computed: {
    postLink() {
      if (!this.post.type)
        return "/post/" + this.post.alias + `-id=${this.post.id}`;

      return this.post.type === "LongForm"
        ? "/longform/" + this.post.alias + `-id=${this.post.id}`
        : "/post/" + this.post.alias + `-id=${this.post.id}`;
    },
  },
  props: {
    post: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>


<style scoped>
.main-height {
  height: calc(100% + 70px);
}
.block-item__category {
  /* display: inline-block;
  padding: 3px 4px 2px;
  background-color: var(--maincolor);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #fff;
  bottom: 0;
  font-size: 10px; */
}

/* img */
.block-item__img-container {
  width: 100%;
  height: 175px;
}

.block-item__img {
  width: 100%;
  height: 100%;
}

.block-item__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* title */
.block-item__title {
  margin-top: 13px;
  line-height: 1.1;
  font-weight: 700;
  text-transform: capitalize;
  margin-bottom: 6px;
}

.block-item__title a:hover {
  color: var(--hovercolor);
}

/* date  */

.block-item__date {
  font-size: 12px;
  line-height: 1;
  font-style: italic;
  font-weight: 400;
  margin-top: 5px;
  margin-bottom: 14px;
}

@media (min-width: 767px) {
  .block-item__title {
    font-size: 20px;
  }

  /* img */
  .block-item__img-container {
    height: 150px;
  }
}
/*tablet */
@media (max-width: 1018px) and (min-width: 768px) {
  .block-item__title {
    font-size: 20px;
  }
  .block-item {
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  /* img */
  .block-item__img-container {
    height: 120px;
  }
  .spotlight-item {
    max-height: 488px;
  }
  .spotlight-item div img{
    max-height: 369px;
  }
  .item-image img {
    /* min-height: 371px;
    max-height: 371px;  */
  }
  .column-item {
    padding-bottom: 6px;
  }
  .item-info {
    min-height: 119px;
  }
  .spotlight-item .item-info .item-title{
    /*Added min-height */
    min-height: 78px;
    max-height: 78px;
  }
  .col-span-6 .column-item .column-item-container .item-info .item-title {
    /* min-height: 84px; */
  }
  /* .item-info .item-title{
    min-height: 84px;
  } */
  /* author */

  .block-item__date-author {
    display: none;
  }
}
/*laptop */
@media (max-width: 1140px) and (min-width: 1019px) {
  /* img */
  .block-item__img-container {
    height: 150px;
  }
  /* title */
  .block-item__title {
    font-size: 14px;
  }
  .spotlight-item {
    max-height: 580px;
  }
  .main-height {
    max-height: 580px;
  }
  .item-image img {
    min-height: 435px;
    max-height: 465px; 
  }
  .column-item {
    padding-bottom: 6px;
  }
}
/*laptop L */
@media ( max-width:1440px ) and ( min-width: 1141px ) {
  .block-item__img-container {
    height: 170px;
  }
  .main-height {
    max-height: 670px;
  }
  /* title */
  .block-item__title {
    font-size: 16px;
  }
  .item-image img {
    min-height: 550px;
    max-height: 550px;
  }
  .column-item {
    padding-bottom: 9px;
  }
}
/*laptop xl */
@media ( min-width: 1441px ) {
  .block-item__img-container {
    height: 170px;
  }
  .main-height {
    max-height: 630px;
  }
  /* title */
  .block-item__title {
    font-size: 16px;
  }
  .item-image img {
    min-height: 572px;
    max-height: 572px;
  }
  .column-item {
    padding-bottom: 9px;
  }
}
</style>
