<template>
  <div class="bg-black">
    <MastHead />
    <Container1440>
      <div class="flex text-white text-sm h-8 items-center justify-between">
        <div class="flex items-center">
          <nuxt-link to="/" class="mr-5 tag top-content">Quảng cáo</nuxt-link>
          <a :href="BASE_URL" target="_blank" class="mr-5 hover:text-hovercolor top-content">Emagazine</a>
        </div>

        <!-- users -->
        <div v-if="user && user.fullName" class="flex items-center relative">
          <p
            @click="toggleInfo = !toggleInfo"
            class="hover:text-hovercolor cursor-pointer mr-5 text-xs capitalize"
          >Xin chào, {{ user.fullName }}</p>

          <div class="auth-info absolute" v-if="toggleInfo">
            <div
              @click="$router.push('/user/userinfo'),toggleInfo = false"
              class="hover:text-hovercolor text-xs cursor-pointer"
            >Thông tin tài khoản</div>
            <div
              @click="$router.push('/user/change-password'),toggleInfo = false"
              class="hover:text-hovercolor pt-5 text-xs cursor-pointer"
            >Đổi mật khẩu</div>
            <div
              @click="handleLogout"
              class="hover:text-hovercolor text-xs cursor-pointer mt-5"
            >Đăng xuất</div>
          </div>
        </div>
        <a
          v-if="!user"
          @click="activeSigninModal"
          class="hover:text-hovercolor cursor-pointer loginRegis"
        >Đăng nhập / Đăng ký</a>
      </div>
      <div
        v-if="toggleInfo"
        @click="toggleInfo = false"
        style="height : 100%; width : 100%; background : transparent; position: fixed; top : 0; bottom:0; right : 0; left: 0; z-index : 99"
      ></div>
    </Container1440>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

import Container1440 from "@/components/containers/Container1440";
import MastHead from "@/components/MastHead";

export default {
  data() {
    return {
      toggleInfo: false,
      BASE_URL: process.env.BASE_URL
    };
  },
  components: {
    Container1440,
    MastHead
  },

  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    }
  },

  methods: {
    ...mapMutations(["setActiveSignin"]),

    ...mapActions(["logout"]),

    activeSigninModal(e) {
      e.preventDefault();
      this.setActiveSignin(true);
    },

    handleLogout() {
      this.logout();

      this.toggleInfo = false;
    }
  }
};
</script>

<style scoped>
.auth-info {
  z-index: 1000;
  top: 23px;
  right: 30px;
  white-space: nowrap;
  transform: translateX(50%);
  background: black;
  padding: 10px;
  text-align: left;
  padding-right: 50px;
}

.auth-info a {
  display: block;
}
.tag {
  color: white;
}
.tag:hover {
  color: var(--hovercolor);
}
</style>
