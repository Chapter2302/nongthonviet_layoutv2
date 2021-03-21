<template>
  <div class="mobile-nav-test">
    <nav class="mobile-nav flex h-12 items-center justify-between px-5">
      <div>
        <i class="mobile-nav__icons fas fa-bars" @click="$emit('openSideBar')"></i>
      </div>
      <nuxt-link class="site-title text-center uppercase" to="/">
        <img src="@/assets/imgs/logotapchi.png" class="img" alt />
      </nuxt-link>

      <div class="relative">
        <i class="fas fa-user mr-2 mobile-nav__icons" v-if="!user" @click="handleActiveAuth"></i>
        <i class="fas fa-user mr-2 mobile-nav__icons" v-if="user" @click="handleOpenModal"></i>
        <i class="mobile-nav__icons fas fa-search" @click="$emit('openSearchSideBar')"></i>
      </div>
    </nav>
    <SideBarLogedIn v-if="isShowSideBarLogedIn" @closeSideBar="closeSideBar" />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import SideBarLogedIn from "@/components/SidebarMobile/SideBarLogedIn";

export default {
  components: {
    SideBarLogedIn
  },
  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    }
  },

  data() {
    return {
      toggleAuth: false,
      isShowSideBarLogedIn: false
    };
  },
  methods: {
    ...mapMutations(["setActiveSignin"]),

    ...mapActions(["logout"]),

    handleActiveAuth() {
      this.setActiveSignin(true);
    },
    handleLogout() {
      this.logout();
      this.toggleAuth = false;
    },
    handleOpenModal() {
      this.isShowSideBarLogedIn = true;
    },
    closeSideBar() {
      this.isShowSideBarLogedIn = false;
    }
  }
};
</script>

<style scoped>
.site-title {
  /* font-family: Arial, Helvetica, sans-serif !important; */
  font-weight: bold;
}
.mobile-nav-test {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  font-size: 20px;
}

.mobile-nav {
  /* position */
  width: 100%;
  z-index: 1000;
  background: white;
  /* other element */
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.mobile-nav .mobile-nav__icons {
  font-size: 0.8rem;
  cursor: pointer;
}
.auth-info {
  z-index: 1000;
  top: 30px;
  right: 50px;
  white-space: nowrap;
  transform: translateX(50%);
  background: black;
  padding: 10px;
  text-align: center;
  color: white;
}
.img {
  width: 150px;
}
</style>>