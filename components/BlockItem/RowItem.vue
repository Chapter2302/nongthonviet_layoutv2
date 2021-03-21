<template>
  <div :class="$device.isMobile ? '' : 'row-item'" :style="index ==  ( length - 1 ) ? '' : 'margin-bottom: 20px; padding-bottom: 20px;'">
    <!--Desktop-->
    <div class="row-item-container" v-if="!$device.isMobile">
      <div class="item-image-container">
        <client-only>
          <nuxt-link
            :to="postLink"
            :class="$device.isMobile ? 'item-image-mobilee' : 'item-imagee'"
          >
            <div class="img-32-container">
              <img :src="post.featuredImage" class="img-32" style="width : 100%; height : 100%" alt="post-img" />
              <nuxt-link
                v-if="post.category"
                class="item-category absolute"
                style="bottom : 0px;"
                :to="`/category/${post.category.categoryAlias}-id=${post.category.categoryId}`"
              >{{ post.category.categoryName }}</nuxt-link>
            </div>
          </nuxt-link>
        </client-only>
      </div>

      <div :class="$device.isMobile ? 'item-info-mobile' : 'item-info'">
        <div class="item-title line-clamp-title">
          <nuxt-link :to="postLink">
            {{
            post.title
            }}
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
        <div
         
          class="item-excerpt"
          :class="$device.isMobile ? 'line-clamp-excerpt-mobile' : 'line-clamp-excerpt'"
        >{{ post.excerpt }}</div> 
        <!-- <div
          v-else-if="post.excerpt.length > 150"
          class="item-excerpt"
          :class="$device.isMobile ? 'line-clamp-excerpt-mobile' : 'line-clamp-excerpt'"
        >{{ post.excerpt.slice(0,100) }}...</div> -->
      </div>
    </div>

    <!--Mobile-->
    <div class="row-item-container" style="width : 100%" v-if="$device.isMobile">
      <div class="item-info-mobile">
        <div class="item-title line-clamp-title font-bold">
          <nuxt-link :to="postLink">
            {{
            post.title
            }}
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
        <div class="grid grid-cols-12 gap-4 flex mt-5">
          <div class="col-span-5 item-image-container-mobile">
            <client-only>
              <nuxt-link
                :to="postLink"
                :class="$device.isMobile ? 'item-image-mobilee' : 'item-imagee'"
              >
                <div class="img-32-container">
                  <img :src="post.featuredImage" class="img-32" style="width : 100%; height : 100%" alt="post-img" />
                  <nuxt-link
                    v-if="post.category"
                    class="item-category absolute"
                    style="bottom : 0px;"
                    :to="`/category/${post.category.categoryAlias}-id=${post.category.categoryId}`"
                  >{{ post.category.categoryName }}</nuxt-link>
                </div>
              </nuxt-link>
            </client-only>
          </div>
           <div
            class="item-excerpt col-span-7"
            :class="$device.isMobile ? 'line-clamp-excerpt-mobile' : 'line-clamp-excerpt'"
          >
            {{ post.excerpt}}
          </div>
          <!-- <div
            v-if="post.excerpt.length <= 197"
            class="item-excerpt col-span-7"
            :class="$device.isMobile ? 'line-clamp-excerpt-mobile' : 'line-clamp-excerpt'"
          >
            {{ post.excerpt}}...
          </div>
          <div
            v-else-if="post.excerpt.length > 197"
            class="item-excerpt col-span-7"
            :class="$device.isMobile ? 'line-clamp-excerpt-mobile' : 'line-clamp-excerpt'"
          >{{ post.excerpt.slice(0,197) }}...</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateInfo: {}
    };
  },
  props: {
    is1240: {
      type: Boolean,
      default: false
    },

    post: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      default: 0
    },

    length: {
      type: Number,
      default: 0
    }
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

  async mounted() {
    //Get CateInfo (2)
  }
};
</script>

<style scoped>
.main-item {
  /*padding-bottom: 20px;*/
  /*margin-bottom: 20px;*/
}

.main-item .main-item__container {
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*align-items: stretch;*/
}

.main-item .main-item__img {
  /*width: 40%;*/
  /*position: relative;*/
  /*max-height: 250px;*/
}

.main-item .main-item__category {
  /*position: absolute;*/
  /*z-index: 2;*/
  /*bottom: 0;*/
  /*padding: 3px 4px 2px;*/
  /*background-color: var(--maincolor);*/
  /*font-weight: 400;*/
  /*text-transform: uppercase;*/
  /*letter-spacing: 1px;*/
  /*color: #ffffff;*/
  /*font-size: 10px;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
  /*overflow: hidden;*/
  /*max-width: 100%;*/
}

.main-item .main-item__img-wrapper {
  /*width: 100%;*/
  /*height: 100%;*/
  /*display: block;*/
}

.main-item .main-item__img-wrapper img {
  width: 100%;

  object-fit: cover;
  object-position: center;
  min-height: 150px;
  max-height: 250px;
  height: 100%;
}

.main-item .main-item__info {
  /*width: 56.5%;*/
  /*padding: 10px 0 0 0;*/
  /*border-top: 1px solid #eaeaea;*/
}

.main-item__info .main-item__info--title {
  /*color: #000000;*/

  /*font-size: 16px;*/
  /*font-weight: 700;*/
  /*margin-bottom: 6px;*/
  /*line-height: 22px;*/
}

.main-item__info .main-item__info--title a:hover {
  color: var(--hovercolor);
}

.main-item__info .main-item__date {
  /*font-size: 12px;*/
  /*line-height: 1;*/
  /*font-style: italic;*/
  /*font-weight: 400;*/
  /*margin-top: 5px;*/
  /*margin-bottom: 12px;*/
}

.main-item__info .main-item__text {
  color: #555555;
  column-count: 1;
  column-gap: 48px;
  font-size: 14px;
  line-height: 1.3;
}

/* mobile */
@media (max-width: 767px) {
  /* .line-clamp-excerpt-mobile {
    -webkit-line-clamp: 3;
  } */
  .main-item .main-item__container {
    align-items: stretch;
  }

  .main-item .main-item__img {
    width: 28%;
  }

  .main-item .main-item__info {
    width: 69%;
  }
  .item-info-mobile .grid .item-excerpt {
    max-height: 102px;
  }
  .main-item .main-item__info--title {
    /*font-size: 16px;*/
    /*line-height: 1.1;*/
  }

  .main-item .main-item__text {
    /* display: none; */
  }

  .main-item__date-author {
    /* display: none; */
  }
}

/* tablet */
@media (max-width: 1018px) and (min-width: 768px) {
  .line-clamp-excerpt-mobile {
    -webkit-line-clamp: 4;
  }
  .main-item {
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .main-item .main-item__container {
    align-items: stretch;
  }

  .main-item .main-item__img {
    width: 35%;
  }

  .main-item .main-item__info {
    width: 62%;
  }

  .main-item .main-item__info--title {
    font-size: 12px;
    line-height: 1.1;
  }

  .main-item .main-item__text {
    /* display: none; */
  }

  .main-item__date-author {
    /* display: none; */
  }

  /* big size */
  .main-item.bigSize .main-item__img {
    width: 40%;
  }

  .main-item.bigSize .main-item__info {
    width: 58%;
  }

  .main-item.bigSize .main-item__info--title {
    font-size: 18px;
  }

  .main-item.main-item.bigSize .main-item__date {
    font-size: 12px;
  }
  .main-item.main-item.bigSize .main-item__date-author {
    display: inline-block;
  }
  /*  */
}
@media (min-width: 1141px) {
  .line-clamp-excerpt {
    -webkit-line-clamp: 3;
  }
}
/* desktop */
@media (max-width: 1140px) and (min-width: 1019px) {
  .row-item-container .item-image-container a .img-32-container {
    /* min-height: 173px; */
  }
  .line-clamp-title {
    -webkit-line-clamp: 2;
  }
  .line-clamp-excerpt {
    -webkit-line-clamp: 3;
  }
  .item-info .item-excerpt {
    /* max-height: 80px; 
    overflow: hidden */
  }
  .item-info .item-title {
    max-height: 60px; 
  }
  .row-item {
    max-height: 220px;
  }
  .item-info-mobile .item-excerpt { 
    max-height: 60px; 
  }
  /*.main-item .main-item__container {*/
  /*  align-items: stretch;*/
  /*}*/

  /*.main-item .main-item__info--title {*/
  /*  font-size: 16px;*/
  /*  line-height: normal;*/
  /*}*/

  /*.main-item .main-item__text {*/
  /*  !* display: none; *!*/
  /*}*/

  /*.main-item__date-author {*/
  /*  !* display: none; *!*/
  /*}*/

  /*!* big size *!*/
  /*.main-item.bigSize .main-item__img {*/
  /*  width: 40%;*/
  /*}*/

  /*.main-item.bigSize .main-item__info {*/
  /*  width: 58%;*/
  /*}*/

  /*.main-item.bigSize .main-item__info--title {*/
  /*  font-size: 14px;*/
  /*  line-height: normal;*/
  /*}*/

  /*.main-item.main-item.bigSize .main-item__date {*/
  /*  font-size: 12px;*/
  /*}*/
  /*.main-item.main-item.bigSize .main-item__date-author {*/
  /*  display: inline-block;*/
  /*}*/
  /*  */
  
}
</style>
