<template>
  <div class="relative">
    <Container1440>
      <div class="flex mt-8 text-xs">
        <div class="flex-1 text-left self-center">
          <div class="text-sm mb-2 date-ntv">
            {{ dateInfo.day }}, {{ dateInfo.date }} tháng
            {{ dateInfo.month }} năm {{ dateInfo.year }}
          </div>
          <i class="fas fa-cloud-sun-rain"></i>
          <span class="font-bold"
            >{{ String(weatherCelsius).slice(0, 5) }} &#186;C</span
          >
          <span class="font-country-ntv">Việt Nam</span>
        </div>

        <div class="flex-1 text-center">
          <Logo />
        </div>
        <div class="flex-1 text-right self-center">
          <a class="hover:text-hovercolor cursor-pointer">
            <i class="fab fa-facebook-f mr-3"></i>
          </a>
          <a class="hover:text-hovercolor cursor-pointer">
            <i class="fab fa-twitter mr-3"></i>
          </a>
          <a class="hover:text-hovercolor cursor-pointer">
            <i class="fab fa-youtube mr-3"></i>
          </a>
          <a class="hover:text-hovercolor cursor-pointer">
            <i class="fas fa-search" @click="searchActive = !searchActive"></i>
          </a>
        </div>
        <transition name="fade-top" appear v-if="searchActive">
          <SearchHome @closeSearch="searchActive = false" />
        </transition>
      </div>
    </Container1440>
    <div
      class="overlay"
      v-if="searchActive"
      @click="searchActive = false"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Logo from "@/components/NaviDesktop/Logo";
import Container1440 from "@/components/containers/Container1440";
import SearchHome from "../Search/SearchHome.vue";
export default {
  data() {
    return {
      searchActive: false,
      metals: null,
      dateInfo: "",
    };
  },
  components: {
    Container1440,
    Logo,
    SearchHome,
  },
  mounted() {
    let d = new Date();
    let day;
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    switch (d.getDay()) {
      case 0:
        day = "Chủ Nhật";
        break;
      case 1:
        day = "Thứ Hai";
        break;
      case 2:
        day = "Thứ Ba";
        break;
      case 3:
        day = "Thứ Tư";
        break;
      case 4:
        day = "Thứ Năm";
        break;
      case 5:
        day = "Thứ Sáu";
        break;
      case 6:
        day = "Thứ Bảy";
    }
    this.dateInfo = {
      day,
      date,
      month: month + 1,
      year,
    };
  },

  computed: {
    ...mapState(["weather", "goldRates"]),

    weatherCelsius() {
      return this.weather.main ? this.weather.main.temp - 273.15 : "";
    },
  },

  async created() {},
};
</script>

<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
}
.fade-top-enter-active {
  animation: fade-top 0.5s;
}
.fade-top-leave-active {
  animation: fade-top 0.5s reverse;
}

@keyframes fade-top {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
