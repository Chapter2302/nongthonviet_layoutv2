<template>
  <div class="relative z-10">
    <div
      class="w-full fixed top-0 left-0 bg-white shadow"
      style="opacity: 95%"
      @mouseleave="toggleHoverModal = false"
    >
      <Container1640>
        <div class="flex items-center text-black h-16">
          <!-- <Logo /> -->
          <div>
            <nuxt-link to="/" class="block mt-1 mr-5 flex justify-center">
              <img src="@/assets/imgs/logotapchi.png" :class="isSafari ? 'logo-safari' : 'img'" alt />
            </nuxt-link>
          </div>
          <div
            class="flex hide-scroll items-center overflow-x-scroll"
            ref="scrollable"
            @mousewheel="onMousewheel"
            @mousedown="onMousedown"
            @mouseleave="onMouseleave"
            @mouseup="onMouseup"
            @mousemove="onMousemove"
          >
            <nuxt-link
              :to="`/category/${tag.alias}-id=${tag.id}`"
              v-for="(tag, i) in menuTags"
              :key="i"
              class="mr-5 sm:mr-3 mt-1 mb-1 font-bold sm:text-xs md:text-xs lg:text-sm hover:text-hovercolor uppercase whitespace-no-wrap"
            >
              <span @mouseover="onHoverTag(tag.subCates, tag.id)">
                {{ tag.name }}
                <span v-if="tag.subCates.length">
                  <i class="fas fa-angle-down"></i>
                </span>
              </span>
            </nuxt-link>
          </div>
        </div>
      </Container1640>
      <HoverModal
        v-if="toggleHoverModal"
        :subs="subs"
        :currentPosts="currentPosts"
        @hoverSub="hoverSub"
        class="absolute z-20"
        @next="next"
        @prev="prev"
      />
    </div>
  </div>
</template>

<script>
import Container1640 from "@/components/containers/Container1640";
import HoverModal from "@/components/NaviDesktop/HoverModal";
import mouseEvent from "@/mixins/mouseEvent";

export default {
  mixins: [mouseEvent],
  data() {
    return {
      subs: [],
      toggleHoverModal: false,
      allPosts: [],
      n: 4,
      isSafari: false
    };
  },
  components: {
    Container1640,
    HoverModal
  },
  props: {
    menuTags: {
      type: Array,
      required: true
    }
  },
  created() {
    if (process.client) {
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      this.isSafari = isSafari;
    }
  },
  computed: {
    currentPosts() {
      return this.allPosts.slice(this.n - 4, this.n);
    },
    webname() {
      return process.env.Webname;
    }
  },
  methods: {
    next() {
      if (this.n < this.allPosts.length) {
        this.n += 4;
      }
    },
    prev() {
      if (this.n > 4) {
        this.n -= 4;
      }
    },
    async hoverSub(id) {
      await this.$store.dispatch(
        "getArticleListing",
        {
          skip: 0,
          limit: 12,
          data: {
            categoryId: id
          },
          nextActions: res => {
            this.allPosts = res.result;
          },
          errorActions: err => {
            console.log(err);
          }
        }
        // {
        //   urlQuery: {
        //     categoryId: id,
        //     skip: 0,
        //     limit: 12
        //   },
        //   nextActions: res => {
        //     this.allPosts = res.result;
        //   }
        // }
      );
      this.n = 4;
    },
    async onHoverTag(subs, id) {
      if (subs && subs.length) {
        this.subs = subs;
        this.toggleHoverModal = true;
        await this.$store.dispatch(
          "getArticleListing",
          {
            skip: 0,
            limit: 12,
            data: {
              categoryId: id
            },
            nextActions: res => {
              this.allPosts = res.result;
            },
            errorActions: err => {
              console.log(err);
            }
          }
          // {
          //   urlQuery: {
          //     categoryId: id,
          //     skip: 0,
          //     limit: 12
          //   },
          //   nextActions: res => {
          //     this.allPosts = res.result;
          //   }
          // }
        );
        this.n = 4;
      } else {
        this.toggleHoverModal = false;
      }
    }
  }
};
</script>

<style scoped>
.h-16 {
  height: 3.5rem;
}
.img {
  width: 190px;
}
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
