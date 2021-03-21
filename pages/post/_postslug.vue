<template>
  <div>
    <Container1440 class="mt-5 mb-5" v-if="post">
      <div style="max-width : 1120px" class="mx-auto">
        <!-- <TopBanner /> -->
        <AdsBlock adsNameByProp="TopBanner" />
        <div class="post grid grid-cols-12 gap-4 relative mt-5">
          <!--Main-->
          <div class="col-span-12 xs:col-span-12 xs:mt-6 xs:pl-0 sm:pl-0 pl-5 pt-0 pb-0">
            <Crumbs :links="links" />
          </div>
          <div class="col-span-8 xs:col-span-12 xs:mt-6 xs:pl-0 sm:pl-0 pl-5 pt-0 pb-5">
            <div class="mb-2 item-category" v-if="post.category.categoryName">
              <nuxt-link
                :key="post.category.categoryId"
                :to="`/category/${post.category.categoryName}-id=${post.category.categoryId}`"
              >{{ post.category.categoryName }}</nuxt-link>
            </div>
            <h1 class="post__main--title col-span-12">{{ post.title }}</h1>
            <div class="post__main">
              <div class="post__main--info article-info mt-2 mb-5">
                <!-- info -->
                <div class="article-info-wrapper">
                  <div v-if="post.penName">
                    <span>Tác giả</span>
                    <a style="font-weight: bold">{{ post.penName }}</a>
                  </div>

                  <span
                    class="ml-6"
                    v-if="post.penName"
                  >{{ post.publicationTime | datetime("DD/MM/YYYY") }}</span>
                  <span class v-else>{{ post.publicationTime | datetime("DD/MM/YYYY") }}</span>

                  <div class="ml-6" v-if="post.commentCount">
                    <i class="far fa-comment-alt"></i>
                    <span>{{post.commentCount}}</span>
                  </div>
                  <div class="ml-6" v-if="post.viewCount">
                    <i class="fas fa-eye"></i>
                    <span>{{post.viewCount}}</span>
                  </div>
                </div>
                <div class="post__main--social-wrapper xs:mt-6 ml-auto">
                  <div class="post__main--info-social">
                    <ShareFacebook :link="link" />
                  </div>
                </div>
              </div>
              <div class="my-5 font-black article-excerpt">{{post.excerpt}}</div>

              <!-- <div class="img-32-container">
                <img
                  class="img-32"
                  style="width : 100%"
                  :src="post.featuredImage || ''"
                  alt="post-img"
                />
              </div>-->

              <!-- content -->
              <div class="post__main--content grid grid-cols-12 gap-4 relative mt-6">
                <div class="col-span-12 xs:col-span-12 sm:col-span-12">
                  <div class="post__main--content-main">
                    <!-- post content -->
                    <div class="post__content mb-5">
                      <div v-html="post.postContent || ''" class="parenthtml formatted ck-content"></div>
                    </div>
                    <!--Các bài liên quan-->
                    <div class="bg-gray-100 p-5 mb-5" v-if="relatedList.length">
                      <div class="text-2xl">Tin Liên Quan</div>
                      <div v-for="(article,i) in relatedList" :key="i" class="py-1 text-blue-500">
                        <nuxt-link
                          :to="`/${article.type === 'LongForm' ? 'longform' : 'post'}/${article.alias}-id=${article.id}`"
                        >
                          <div>{{article.title}}</div>
                        </nuxt-link>
                      </div>
                    </div>
                    <!-- <div class="post__other mt-5">Tin Liên Quan Block</div> -->
                    <div class="post__share">
                      <ShareFacebook :link="link" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--ADS-->
          <div class="col-span-4 xs:col-span-12 pl-6 xs:pl-0 sm:pl-0">
            <div class="post__side">
              <AdsBlock adsNameByProp="Detail_Rigth1" />
            </div>
            <!--DetailA_Right1-->
            <div class="blockb-right__block mt-8" v-if="DetailA_Right1.length">
              <h4 class="block-title">{{titleDetailA_Right1}}</h4>

              <SideBlockItem
                v-for="(post, index) in DetailA_Right1"
                :key="index"
                :post="post"
                :isBorder="true"
              />
              <nuxt-link :to="viewAllDetailA_Right1" v-if="viewAllDetailA_Right1 !== '/'">
                <div class="blockb__button small">
                  Xem tất cả
                  <i class="fas fa-bars"></i>
                </div>
              </nuxt-link>
            </div>

            <!--Detail_Right2-->
            <div class="blockb-right__block mt-8" v-if="DetailA_Right2.length">
              <h4 class="block-title">{{titleDetailA_Right2}}</h4>

              <SideBlockItem
                v-for="(post, index) in DetailA_Right2"
                :key="index"
                :post="post"
                :isBorder="true"
              />
              <nuxt-link :to="viewAllDetailA_Right2" v-if="viewAllDetailA_Right2 !== '/'">
                <div class="blockb__button small">
                  Xem tất cả
                  <i class="fas fa-bars"></i>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div>
          <AdsBlock adsNameByProp="Detail_Main" />
          <!-- <img src="@/assets/imgs/ads_ngang.jpg" style="width : 100%; height: 129px" alt /> -->
        </div>
        <div class="post grid grid-cols-12 gap-4 relative">
          <!-- comment -->
          <div
            class="comment-block col-span-8 xs:col-span-12 xs:mt-6 xs:pl-0 sm:pl-0 pl-5 pt-10 pb-10"
          >
            <h3 class="comment-block__title">
              Bình luận
              <span
                v-if="isReply"
                class="ml-2 text-sm font-thin cursor-pointer capitalize hover:text-hovercolor"
                @click="isReply = false"
              >Hủy reply</span>
            </h3>
            <CommentForm
              @refetchComments="refetchComments"
              @refetchReply="refetchReply"
              :postId="id"
              :replyData="replyData"
              ref="commentForm"
            />
            <CommentItem
              v-for="comment in comments"
              :key="comment.id"
              :item="comment"
              :replyComment="handleReplyComment"
              :fetchReply="fetchReply"
              @setReFetchFail="fetchReply = false"
            ></CommentItem>
            <p
              class="cursor-pointer hover:text-hovercolor mb-4 text-center text-sm"
              @click="fetchMoreComments"
              v-if="comments.length > totalComments"
            >Xem Thêm</p>
          </div>
          <!--ADS-->
          <div class="col-span-4 xs:col-span-12 pt-10">
            <div class="post__side pl-6 xs:pl-0 sm:pl-0">
              <AdsBlock adsNameByProp="Detail_Right2" />
              <!-- <img src="@/assets/imgs/ads_doc.jpg" style="width : 100%; height: 416px" alt /> -->
            </div>
          </div>
        </div>

        <FeaturedList
          style="padding-right : 0px;"
          :posts="trendingList"
          v-if="trendingList && trendingList.length"
          :name="'Đang được quan tâm'"
        />

        <div class="post grid grid-cols-12 gap-4 relative" id="content">
          <div class="comment-block col-span-8 xs:col-span-12 xs:mt-6 xs:pl-0 pl-5 pt-8 pb-10">
            <MainBlockItem
              v-for="(post, index) in otherArticleSameCate"
              :key="index"
              :post="post"
              :is1240="true"
            />
            <Pagination
              v-if="otherArticleSameCate.length > 0"
              :totalNews="total"
              :limit="limit"
              @changePage="changePage"
              :currentPageProp="currentPage"
            />
          </div>
          <div class="col-span-4 xs:col-span-12 pl-6 xs:pl-0 sm:pl-0">
            <div class="blockb-right__block mt-8" v-if="DetailB_Right.length">
              <h4 class="block-title">{{titleDetailB_Right}}</h4>

              <SideBlockItem
                v-for="(post, index) in DetailB_Right"
                :key="index"
                :post="post"
                :isBorder="true"
              />
              <nuxt-link :to="viewAllDetailB_Right" v-if="viewAllDetailB_Right !== '/'">
                <div class="blockb__button small">
                  Xem tất cả
                  <i class="fas fa-bars"></i>
                </div>
              </nuxt-link>
            </div>
            <!--ADS-->
            <div>
              <AdsBlock adsNameByProp="Detail_Right3" />
              <!-- <img src="@/assets/imgs/ads_doc.jpg" style="width : 100%; height: 416px" alt /> -->
            </div>
          </div>
        </div>
      </div>
      <SocialBlock />
    </Container1440>
  </div>
</template>

<script>
import Container1440 from "@/components/containers/Container1440.vue";
import AdsSide from "@/components/Advertisement/AdsSide.vue";
import SideWrapper from "@/components/SideWrapper/SideWrapper.vue";
import SideBlockItem from "@/components/SideBlockItem/SideBlockItem.vue";
import ShareFacebook from "@/components/SocialShareButton/ShareFacebook.vue";
import Author from "@/components/Author/Author.vue";
import AdsMain from "@/components/Advertisement/AdsMain.vue";
import CommentForm from "@/components/Form/CommentForm.vue";
import CommentItem from "@/components/Comment/CommentItem.vue";
import Crumbs from "../../components/Crumbs/Crumbs.vue";
import TopBanner from "@/components/HomePage/TopBanner";
import SocialBlock from "@/components/HomePage/SocialBlock/SocialBlock";
import MainBlockItem from "@/components/BlockItem/RowItem.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import AdsBlock from "@/components/CategoryPage/AdsBlock/AdsBlock.vue";
import ga from "@/mixins/ga.js";
import FeaturedList from "@/components/DetailPage/FeaturedList";
import Social from "../../components/HomePage/SocialBlock/Social.vue";

export default {
  mixins: [ga],
  components: {
    Container1440,
    AdsSide,
    SideWrapper,
    SideBlockItem,
    ShareFacebook,
    Author,
    AdsMain,
    CommentForm,
    CommentItem,
    Crumbs,
    TopBanner,
    SocialBlock,
    MainBlockItem,
    Pagination,
    AdsBlock,
    FeaturedList
  },
  mounted() {
    //console.log('hello ', this.post)
    if (this.post.postContent.includes('widget')) {
      //console.log('yoo ' ,this.post.postContent)
      if ( this.post.postContent.match(/[widget id=^.{1,50}$]/i) ) {
        // let result = this.post.postContent.replace(/[widget id=<id>]/i, (...match) => {
        //   let groups = match.pop();
        //   console.log('im groups ' , groups)
        //   return groups.id
        // });
        // console.log('result ' , result)
        let indexOfWidget = this.post.postContent.indexOf('widget')
        console.log('slice ', this.post.postContent.slice(indexOfWidget-1, indexOfWidget + 35))
        this.$store.dispatch('getDetailNew', {
          //do dai cua id
          articleId: this.post.postContent.slice(indexOfWidget + 10, indexOfWidget + 34),
          nextActions: (data) => {
            this.post.postContent = this.post.postContent.replace(this.post.postContent.slice(indexOfWidget-1, indexOfWidget + 35), data.result.postContent).slice()
            console.log(this.post.postContent)
          },
          errorActions: (err) => {
            console.log('err ', err)
          }
        })
      }
      else {
        console.log('Nothing!')
      }
      // var img = document.createElement('img');
      // img.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
      // // document.getElementById('body').appendChild(img);
      // // down.innerHTML = "Image Element Added.";
      // document.getElementsByClassName('covidItem')[0].appendChild(img)

    }
    this.link = `${this.BASE_URL}${this.$route.fullPath}`; //to do
    if (process.client) {
      this.$ga.page(this.$router);
    }
    this.changeEditable();
  },
  data() {
    return {
      link: "",
      isReply: false,
      replyData: null,
      fetchReply: false,
      limit: 15,
      BASE_URL: process.env.BASE_URL,
      // Other Articles with the same cate
      currentPage: 1,
      otherArticleSameCate: "",
      skip: 0,
      total: "",
      limit: 4
    };
  },

  computed: {
    sideAds() {
      return this.ads ? this.ads.find(el => el.section === "DetailAds1") : {};
    },

    mainAds() {
      return this.ads ? this.ads.find(el => el.section === "DetailAds2") : {};
    }
  },
  async created() {
    if (this.$route.query.p && this.$route.query.p != 1) {
      this.changePage(this.$route.query.p);
      this.currentPage = this.$route.query.p;
    } else {
      await this.$store.dispatch("getArticleListing", {
        skip: 0,
        limit: 4,
        data: {
          categoryId: this.post.category.categoryId
        },
        nextActions: res => {
          this.otherArticleSameCate = res.result;
          this.total = res.total;
          let elmnt = document.getElementById("content");
        },
        errorActions: err => {
          console.log(err);
        }
      });
    }
  },
  methods: {
    changeEditable() {
      let col1 = document.getElementsByClassName("simpleGridCol1");
      let i;
      for (i = 0; i < col1.length; i++) {
        col1[i].contentEditable = false;
      }
      let col2 = document.getElementsByClassName("simpleGridCol2");
      for (i = 0; i < col2.length; i++) {
        col2[i].contentEditable = false;
      }
      let col3 = document.getElementsByClassName("simpleGridCol2");
      for (i = 0; i < col3.length; i++) {
        col3[i].contentEditable = false;
      }
    },
    handleReplyComment(item) {
      const commentArea = this.$refs.commentForm.$refs.commentArea;
      // focus & placeholder
      commentArea.focus();
      commentArea.placeholder = `Reply ${item.name}`;

      // hanle orther case reply
      this.isReply = true;
      this.replyData = { ...item };
    },

    async refetchComments() {
      if (this.comments.length === this.cmtlimit) this.cmtlimit += 3;
      try {
        await this.$store.dispatch("getComments", {
          articleId: this.id,
          skip: 0,
          limit: this.cmtlimit,
          nextActions: res => {
            this.comments = [...res.result];
            this.totalComment = res.total;
          },
          errorActions: err => {
            console.log(err);
          }
        });
      } catch (e) {}
    },

    refetchReply() {
      this.fetchReply = true;
    },

    async fetchMoreComments() {
      this.cmtlimit = this.cmtlimit + 3;
      try {
        await this.$store.dispatch("getComments", {
          articleId: this.id,
          skip: 0,
          limit: this.cmtlimit,
          nextActions: res => {
            this.comments = [...res.result];
            this.totalComment = res.total;
          },
          errorActions: err => {
            console.log(err);
          }
        });
      } catch (e) {}
    },
    async changePage(p) {
      this.$router.push({ query: { p } });
      this.skip = this.limit * (p - 1);
      await this.$store.dispatch("getArticleListing", {
        skip: this.skip,
        limit: this.limit,
        data: {
          categoryId: this.post.category.categoryId
        },
        nextActions: res => {
          this.otherArticleSameCate = res.result;
          this.total = res.total;
          let elmnt = document.getElementById("content");
          elmnt.scrollIntoView();
        },
        errorActions: err => {
          console.log(err);
        }
      });
    }
  },

  watch: {
    // check if reply
    isReply(newValue, oldValue) {
      const commentArea = this.$refs.commentForm.$refs.commentArea;

      if (!newValue) {
        commentArea.blur();
        commentArea.placeholder = `Comment`;
        this.replyData = null;
      }
    }
  },

  async asyncData(context) {
    //-----------------POST---------------------//
    // fine id artile from url
    const id = context.route.params.postslug.slice(
      context.route.params.postslug.indexOf("=") + 1
    );
    //Post
    let post;
    await context.store.dispatch("getDetailNew", {
      articleId: id,
      nextActions: res => {
        post = res.result;
      },
      errorActions: err => {
        console.log(err);
      }
    });
    //-----------------END POST -----------------//
    //-----------------TRENDINGLIST-------------//
    let trendingList = [];
    await context.store.dispatch("getArticleListing", {
      skip: 0,
      limit: 8,
      data: { isFeatured: true },
      nextActions: res => {
        trendingList = [...res.result];
      },
      errorActions: err => {
        console.log(err);
      }
    });
    //---------------Related List-------------//
    let relatedList = [];
    let params = {};
    if (post && post.relatedArticles && post.relatedArticles.length) {
      params = {
        articleIds: post.relatedArticles.join(",")
      };
    }
    if (post.tags.length) {
      params = {
        tagIds: post.tags.join(",")
      };
    }
    if (post.relatedArticles.length || post.tags.length) {
      await context.store.dispatch("getArticleListing", {
        skip: 0,
        limit: 8,
        data: params,
        nextActions: res => {
          relatedList = res.result;
        },
        errorActions: err => {
          console.log(err);
        }
      });
    }

    //----------------LAYOUT------------------//
    // call API options follow type of list
    const setSortParams = listType => {
      let sortParams = {};
      switch (listType) {
        case "Tin nổi bật":
          sortParams = {
            isFeatured: true,
            sort: "isFeatured=desc,sortFeatured=desc,publicationTime=desc"
          };
          break;
        case "Xem nhiều nhất":
          sortParams = {
            isMostView: true,
            sort: "viewCount=desc,publicationTime=desc"
          };
          break;
        case "Tương tác nhiều nhất":
          sortParams = {
            isMostInteract: true,
            sort: "commentCount=desc,publicationTime=desc"
          };
          break;
        default:
          sortParams = {
            sort: "publicationTime=desc"
          };
      }
      return sortParams;
    };
    // layouts
    let layout = [];
    await context.store.dispatch("getLayout", {
      page: "DetailPage",
      nextActions: res => {
        layout = res.result;
      },
      errorActions: err => {
        console.log(err);
      }
    });
    const findBlockByName = blockName => {
      return layout.blocks.find(e => {
        return e.name === blockName;
      });
    };
    const findSectionByName = (block, sectionName) => {
      return block.sections.find(e => {
        return e.name === sectionName;
      });
    };
    //DetailABlock
    let DetailABlock = findBlockByName("DetailA");
    let DetailA_Right1 = [];
    let DetailA_Right2 = [];

    //DetailA_Right1
    let DetailARight1Obj = findSectionByName(DetailABlock, "DetailA_Right1");
    const titleDetailA_Right1 = DetailARight1Obj ? DetailARight1Obj.title : "";
    const viewAllDetailA_Right1 =
      DetailARight1Obj && DetailARight1Obj.cateAlias && DetailARight1Obj.cateId
        ? `/category/${DetailARight1Obj.cateAlias}-id=${DetailARight1Obj.cateId}`
        : "/";

    //DetailA_Right2
    let DetailARight2Obj = findSectionByName(DetailABlock, "DetailA_Right2");
    const titleDetailA_Right2 = DetailARight2Obj ? DetailARight2Obj.title : "";
    const viewAllDetailA_Right2 =
      DetailARight2Obj && DetailARight2Obj.cateAlias && DetailARight2Obj.cateId
        ? `/category/${DetailARight2Obj.cateAlias}-id=${DetailARight2Obj.cateId}`
        : "/";

    //DetailBBlock
    let DetailBBlock = findBlockByName("DetailB");
    let DetailB_Right = [];

    //DetailB_Right
    let DetailBRightObj = findSectionByName(DetailBBlock, "DetailB_Right");
    const titleDetailB_Right = DetailBRightObj ? DetailBRightObj.title : "";
    const viewAllDetailB_Right =
      DetailBRightObj && DetailBRightObj.cateAlias && DetailBRightObj.cateId
        ? `/category/${DetailBRightObj.cateAlias}-id=${DetailBRightObj.cateId}`
        : "/";

    //Call API get article follow listType
    await Promise.all([
      context.store.dispatch("getArticleListing", {
        skip: 0,
        limit: 5,
        data: {
          ...setSortParams(DetailARight1Obj ? DetailARight1Obj.listType : ""),
          categoryId: DetailARight1Obj ? DetailARight1Obj.cateId : ""
        },
        nextActions: res => {
          DetailA_Right1 = [...res.result];
        },
        errorActions: err => {
          console.log(err);
        }
      }),
      context.store.dispatch("getArticleListing", {
        skip: 0,
        limit: 5,

        data: {
          ...setSortParams(DetailARight2Obj ? DetailARight2Obj.listType : ""),
          categoryId: DetailARight2Obj ? DetailARight2Obj.cateId : ""
        },
        nextActions: res => {
          DetailA_Right2 = [...res.result];
        },
        errorActions: err => {
          console.log(err);
        }
      }),
      context.store.dispatch("getArticleListing", {
        skip: 0,
        limit: 5,

        data: {
          ...setSortParams(DetailBRightObj ? DetailBRightObj.listType : ""),
          categoryId: DetailBRightObj ? DetailBRightObj.cateId : ""
        },
        nextActions: res => {
          DetailB_Right = [...res.result];
        },
        errorActions: err => {
          console.log(err);
        }
      })
    ]);
    //----------------END LAYOUT------------------//

    //---------------Crumbs----------------//
    const links = [
      {
        name: post.category.categoryName,
        to: `/category/${post.category.categoryAlias}-id=${post.category.categoryId}`,
        last: false
      },
      {
        name: "Nội dung bài viết",
        to: context.route.path,
        last: true
      }
    ];
    //---------------END Crumbs----------------//
    //----------------COMMENT------------------//
    let comments;
    let totalComments;
    await context.store.dispatch("getComments", {
      articleId: post.id,
      skip: 0,
      limit: 3,
      nextActions: res => {
        comments = [...res.result];
        totalComments = res.total;
      },
      errorActions: err => {
        console.log(err);
      }
    });

    //----------------END COMMENT------------------//
    return {
      //post
      post,
      id,

      // Breadcrum
      links,

      //layout
      DetailA_Right1,
      titleDetailA_Right1,
      viewAllDetailA_Right1,

      DetailA_Right2,
      titleDetailA_Right2,
      viewAllDetailA_Right2,

      DetailB_Right,
      titleDetailB_Right,
      viewAllDetailB_Right,

      DetailAds_A: { name: "todo APIAds" },
      // comments
      comments,
      totalComments,
      cmtlimit: 3,
      //trendingList
      trendingList,
      //relatedList
      relatedList
    };
  },
  head() {
    return {
      titleTemplate: this.post.title,
      title: this.post.title,
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
          content: process.env.BASE_URL + this.$route.fullPath
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.post.title
        },
        {
          hid: "description",
          property: "description",
          content: this.post.excerpt
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.post.excerpt
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.post.featuredImage
        }
      ]
    };
  }
};
</script>

<style>
.blockb__button.small {
  display: block;
  width: 50%;
  font-size: 15px;
  line-height: 35px;
  letter-spacing: 1px;
  border-radius: 8px;
}

.blockb__button {
  background: #09334c;
  width: 100%;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  line-height: 35px;
  letter-spacing: 1px;
  border-radius: 3px;
  transition: 0.3s ease;
}
.blockb__button:hover {
  background: var(--hovercolor);
}

.blockb-right__block {
  width: auto;
  padding-top: 15px;
  padding-bottom: 0px;
  padding-left: 19px;
  padding-right: 19px;

  border: 1px solid #eaeaea;
}
/**/
.article-excerpt {
  font-size: 18px;
}

.parenthtml td img {
  width: 100% !important;
  max-width: 100% !important;
}
.parenthtml table {
  width: 100% !important;
  max-width: 100% !important;
}
.parenthtml h3 {
  line-height: 1.5;
}
.parenthtml {
  line-height: 1.5;
  font-size: 18px;
}
/* main */

.post__main {
}

.parenthtml .simpleGrid {
  padding: 10px;
  margin: 1em 0;

  background: rgba(0, 0, 0, 0.1);
  border: solid 1px hsl(0, 0%, 77%);
  border-radius: 2px;
}
.parenthtml .simpleGridCol1[contenteditable="false"] {
  padding: 10px;
  margin: 4px;
  background: #fff;
  border: solid 1px hsl(0, 0%, 77%);
}
.parenthtml .simpleGridCol2[contenteditable="false"] {
  padding: 10px;
  margin: 4px;

  background: #fff;
  border: solid 1px hsl(0, 0%, 77%);
}
.parenthtml .simpleGridCol3[contenteditable="false"] {
  padding: 10px;
  margin: 4px;

  background: #fff;
  border: solid 1px hsl(0, 0%, 77%);
}
/* category */
.post__main--category a {
  padding: 3px 3px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: var(--maincolor);
  color: #ffffff;
  transition: 0.4s ease;
}

.post__main--category a:hover {
  opacity: 0.9;
  background-color: var(--hovercolor);
}

/* title */

.post__main--title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
}

/* info */
.post__main--info {
  display: flex;
  align-items: center;
  width: 100%;
}

.post__main--info > div {
  /*width: 50%;*/
}

.post__main--info .post__main--info-wrapper {
  display: flex;
  font-size: 15px;
  font-style: italic;
  color: #444;
}

.post__main--info-name a {
  font-weight: bold;
}

/* social */

.post__main--social-wrapper {
  text-align: right;
}

/* img */

.post__main--img {
  width: 100%;
  height: auto;
}

.post__main--img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/*  */

/* other post */

.post__other {
  display: flex;
  justify-content: space-between;
}

.post__other div {
  width: 45%;
}

.post__other-previous {
  text-align: left;
}

.post__other-next {
  text-align: right;
}

.post__other span {
  font-size: 14px;
  color: #c1c1c1;
  margin-bottom: 7px;
}

.post__other a {
  font-size: 16px;
  line-height: 1.2;
  font-weight: 600;
  color: #222;
}

.post__other a:hover {
  color: var(--hovercolor);
}

/* comment-block */

.comment-block__title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 7px;
  margin-top: 10px;
  text-transform: uppercase;
  color: #111;
}

/* responsice  */

@media (max-width: 767px) {
  .post__main--title {
    font-size: 20px;
  }

  .post__main--info {
    display: block;
  }

  .post__main--info > div {
    width: 100%;
    text-align: left;
  }
}

@media (max-width: 1018px) and (min-width: 768px) {
  .post__main--title {
    font-size: 24px;
  }

  .post__main--info {
    display: block;
  }

  .post__main--info > div {
    width: 100%;
    text-align: left;
  }
}
</style>
