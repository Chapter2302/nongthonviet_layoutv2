<template>
  <div>
    <div id="fb-root"></div>
    <!-- Auth -->
    <transition name="auth-fade">
      <Auth v-if="signinModal" v-on:closeAuth="handleCloseAuth">
        <component :is="authComponent" v-bind="authProps"></component>
      </Auth>
    </transition>
    <!--Navi Desktop-->
    <NaviDesktop :categories="categories" style="height : auto" />
    <MastHead class="md:hidden lg:hidden" />
    <NaviMobile
      class="sm:hidden md:hidden lg:hidden z-50"
      @openSideBar="showSideBar = true"
      @openSearchSideBar="showSearchSideBar = true"
    />
    <div class="sm:hidden md:hidden lg:hidden">
      <!--trendbar-->
      <div
        class="trend-btn right flex justify-center items-center"
        @click="isShowTrendBarMobile = true"
      >
        <div style="padding-top : 13px; font-size : 12px;">
          <i style="color : white;" class="relative fas fa-star"></i>
        </div>
      </div>
      <transition name="slide-left">
        <TrendBarMobile
          v-if="isShowTrendBarMobile"
          @onCloseTrendBar="isShowTrendBarMobile = false"
        />
      </transition>
      <!-- sidebar menu -->
      <transition name="slide-left">
        <SideBarMobile
          v-if="showSideBar"
          :categories="categories"
          @closeSideBar="showSideBar = false"
        />
      </transition>
      <!-- sidebar search -->
      <transition name="slide-right">
        <SearchSideBarMobile v-if="showSearchSideBar" @closeSideBar="showSearchSideBar = false" />
      </transition>
    </div>
    <nuxt />
    <Footer :categories="categories" />
    <ScrollTop />
  </div>
</template>
<script>
// libs
import { mapState } from "vuex";

import NaviDesktop from "@/components/NaviDesktop/NaviDesktop";
import NaviMobile from "@/components/NaviMobile/NaviMobile";
import SideBarMobile from "@/components/SidebarMobile/SideBarMobile.vue";
import SearchSideBarMobile from "@/components/SidebarMobile/SearchSideBarMobile.vue";
import Footer from "@/components/Footer/Footer.vue";
import ScrollTop from "@/components/ScrollTop/ScrollTop";
import Auth from "@/components/Auth/Auth.vue";
import Login from "@/components/Auth/Login.vue";
import Register from "@/components/Auth/Register.vue";
import Forgot from "@/components/Auth/Forgot.vue";
import MastHead from "@/components/MastHead";
import TrendBarMobile from "@/components/TrendBarMobile";

export default {
  components: {
    Footer,
    NaviDesktop,
    NaviMobile,
    SideBarMobile,
    SearchSideBarMobile,
    ScrollTop,
    Auth,
    Login,
    Register,
    Forgot,
    MastHead,
    TrendBarMobile
  },

  data() {
    return {
      showSearchSideBar: false,
      showSideBar: false,
      categories: [],
      authComponent: "Login",
      isShowTrendBarMobile: false
    };
  },
  methods: {
    handleCloseAuth() {
      this.authComponent = "Login";
    }
  },
  async created() {
    if (process.client) {
      if (localStorage.getItem("token")) {
        this.$store.dispatch("getMe", {
          nextActions: res => {},
          errorActions: err => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
          }
        });
      }
    }
  },
  computed: {
    ...mapState(["signinModal"]),
    authProps() {
      const vm = this;

      // login props
      if (this.authComponent === "Login") {
        return {
          forgot: () => {
            vm.authComponent = "Forgot";
            this.$store.commit("SET_AUTH_ERROR", null);
          },

          register: () => {
            vm.authComponent = "Register";
            this.$store.commit("SET_AUTH_ERROR", null);
          }
        };
      }
      // register props
      if (this.authComponent === "Register") {
        return {
          login: () => {
            vm.authComponent = "Login";
            this.$store.commit("SET_AUTH_ERROR", null);
          }
        };
      }

      // forgot props
      if (this.authComponent === "Forgot") {
        return {
          login: () => {
            vm.authComponent = "Login";
            this.$store.commit("SET_AUTH_ERROR", null);
          }
        };
      }
    }
  },
  async mounted() {
    // get weather
    await this.$store
      .dispatch("getCurrentWeather", {
        id: "1566083",
        appid: "060d473d45f1d22478455e48f344f211"
      })
      .then(res => {
        this.$store.commit("SET_WEATHER", res.data);
      });

    //get categories list
    this.$store.dispatch("getCategories", {
      nextActions: res => {
        this.categories = res.result;
      }
    });
  },

  head() {
    return {
      script: [
        {
          src: "https://kit.fontawesome.com/a767a8054c.js",
          crossorigin: "anonymous"
        },
        {
          link:
            "https://fonts.googleapis.com/css2?family=Gelasio:wght@400;700&family=Source+Sans+Pro:wght@200&display=swap",
          rel: "stylesheet"
        },
        {
          link:
            "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;900&display=swap",
          rel: "stylesheet"
        },

        {
          link:
            "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap",
          rel: "stylesheet"
        },
        {
          async: true,
          defer: true,
          crossorigin: "anonymous",
          src: "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v8.0",
          nonce: "Ef8u8iSh"
        }
      ]
    };
  }
};
</script>

<style scoped>
.slide-left-enter-active {
  transition: all 0.5s cubic-bezier(0.79, 0.14, 0.15, 0.86);
  transform: translate3d(0, 0, 0);
}
.slide-left-leave-active {
  transition: all 0.5s cubic-bezier(0.79, 0.14, 0.15, 0.86);
  transform: translate3d(0, 0, 0);
}
.slide-left-enter,
.slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.slide-right-enter-active {
  transition: all 0.5s cubic-bezier(0.79, 0.14, 0.15, 0.86);
  transform: translate3d(0, 0, 0);
}
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.79, 0.14, 0.15, 0.86);
  transform: translate3d(0, 0, 0);
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.trend-btn {
  background: var(--maincolor);
  opacity: 0.7;
  display: inline-block;
  margin: 0 1em 1em 0;
  position: fixed;
  top: 20%;
  z-index: 51;
}
.right {
  height: 40px;
  width: 20px;
  border-bottom-right-radius: 40px;
  border-top-right-radius: 40px;
}

.auth-fade-enter-active, .auth-fade-leave-active {
  transition: opacity .5s;
}
.auth-fade-enter, .auth-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
