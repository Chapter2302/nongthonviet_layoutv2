<template>
  <Container1240>
    <div class="blocka flex xs:block px-8 xs:px-0">
      <div class="grid grid-cols-12 gap-4 flex-grow">
        <!-- main post -->
        <div class="col-span-6 xs:col-span-12">
          <div class="spotlight-item" style="overflow : hidden">
            <div class="item-info" style="padding-top : 0px;">
              
              <nuxt-link :to="postLink">
                <div class="img-32-container">
                  <img
                    :src="mainNew.featuredImage"
                    class="img-32"
                    style="width : 100%; height : 100%"
                    alt="post-img"
                  />
                </div>
              </nuxt-link>
              
              <h3 class="line-clamp-title item-title">
                <nuxt-link :to="postLink" class="title-font">{{mainNew.title}}</nuxt-link>
              </h3>

              <div class="item-meta">
                <span class="item-author" v-if="mainNew.penName">
                  <span>{{mainNew.penName}}</span>
                  <span>-</span>
                </span>
                <span class="item-date">{{ mainNew.publicationTime | datetime("DD/MM/YYYY") }}</span>
              </div>
    
              <div class="line-clamp-excerpt item-excerpt">{{mainNew.excerpt}}</div>
            </div>
          </div>
        </div>

        <!-- other post -->
        <div class="col-span-3 xs:col-span-12 other-post">
          <ColumnItem v-for="(post, index) in columnNewsLeft" :key="index" :post="post" />
        </div>
        <div class="col-span-3 xs:col-span-12 other-post">
          <ColumnItem v-for="(post, index) in columnNewsRight" :key="index" :post="post" />
        </div>
      </div>
    </div>
  </Container1240>
</template>

<script>
import Container1440 from "@/components/containers/Container1440";
import ColumnItem from "@/components/BlockItem/ColumnItem.vue";
import Container1240 from "@/components/containers/Container1240.vue";

export default {
  components: {
    Container1440,
    ColumnItem,
    Container1240
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    mainNew() {
      return this.list[0];
    },
    columnNewsLeft() {
      return this.list.slice(1, 3);
    },
    columnNewsRight() {
      return this.list.slice(3, 5);
    },
    postLink() {
      if (this.mainNew) {
        if (!this.mainNew.type)
          return (
            "/post/" + this.mainNew.alias + `-id=${this.HomeA_Slide[0].id}`
          );
        return this.mainNew.type === "LongForm"
          ? "/longform/" + this.mainNew.alias + `-id=${this.mainNew.id}`
          : "/post/" + this.mainNew.alias + `-id=${this.mainNew.id}`;
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
/* common style */
.blocka-right {
  /*min-width: 200px !important;*/
}

.other-post {
}

.blocka {
  margin-top: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 16px;
  color: var(--maincolor);
}

/* main */
.blocka__main {
  margin-bottom: 32px;
}

.blocka__main .blocka__main--category {
  /*display: inline-block;*/
  /*padding: 3px 4px 2px;*/
  /*background-color: var(--maincolor);*/
  /*font-weight: 400;*/
  /*text-transform: uppercase;*/
  /*letter-spacing: 1px;*/
  /*font-size: 10px;*/
  /*color: #fff;*/
}

/* title */
.blocka__main .blocka__main--title {
  /*font-size: 32px;*/
  /*line-height: 1.1;*/
  /*font-weight: 500;*/
  /*margin: 6px 0 2px;*/
}

.blocka__main .blocka__main--title a:hover {
  color: var(--hovercolor);
}

/* date */
.blocka__main .blocka__main--date {
  font-size: 12px;
  line-height: 1;
  font-style: italic;
  font-weight: 400;
  margin-top: 5px;
  margin-bottom: 14px;
}

/* img */
.blocka__main .blocka__main--img {
  width: 100%;
  height: 300px;
}

.blocka__main .blocka__main--img a {
  width: 100%;
  height: 100%;
  position: relative;
}

.blocka__main .blocka__main--img a img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* description */

.blocka__main .blocka__main-description {
  display: block;
  margin-top: 13px;
  color: #555555;
  font-size: 14px;
  line-height: 1.3;
}
.margin-top-position {
  position: absolute;
}

@media (max-width: 767px) {
  .margin-top-position {
    top: 80%;
  }
  .blocka-right {
    margin-top: 16px;
  }
}

@media (min-width: 768px) {
  .margin-top-position {
    top: 85%;
  }
  .blocka {
    margin-top: 20px;
  }
  /* img */
  .blocka__main .blocka__main--img {
    height: 550px;
  }

  /* title */
  .blocka__main .blocka__main--title {
    font-size: 36x;
  }

  .section-title {
    font-size: 16px;
  }
}
@media (max-width: 1018px) and (min-width: 768px) {
  .margin-top-position {
    top: 80%;
  }
  .blocka-right {
    width: 200px;
    min-width: 200px;

    margin-left: 16px;
  }

  /* img */
  .blocka__main .blocka__main--img {
    height: 450px;
  }

  /* title */
  .blocka__main .blocka__main--title {
    font-size: 20px;
  }

  .section-title {
    font-size: 16px;
  }
}
@media (max-width: 1140px) and (min-width: 1019px) {
  .margin-top-position {
    top: 80%;
  }
  .blocka-right {
    width: 250px;
    min-width: 250px;

    margin-left: 16px;
  }

  .blocka__main .blocka__main--img {
    height: 500px;
  }

  .blocka__main .blocka__main--title {
    font-size: 36px;
  }

  .section-title {
    font-size: 20px;
  }
}
@media (min-width: 1141px) {
  .blocka-right {
    /*width: 300px;*/
    min-width: 250px;

    margin-left: 16px;
  }

  .blocka__main .blocka__main--title {
    font-size: 36px;
  }

  .section-title {
    font-size: 20px;
  }
}
</style>
