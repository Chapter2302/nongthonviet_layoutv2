<template>
  <transition name="slide">
    <div class="search-sidebar" ref="searchContainer">
      <div class="search-sidebar__icon relative">
        <i class="relative fas fa-times" @click="$emit('closeSideBar')"></i>
      </div>
      <div class="search-sidebar__search relative">
        <span class="text-xs">Search</span>
        <input
          type="text"
          ref="input"
          v-model="keyword"
          class="search-sidebar__search-input"
          @keydown.esc="$emit('closeSideBar')"
          @keypress.enter="
            [$router.push(`/search/${keyword}`), $emit('closeSideBar')]
          "
          @blur="onBlur"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  mounted() {
    this.$refs.input.focus();
    this.$refs.searchContainer.classList.add("show");
  },
  methods: {
    onBlur(e) {
      if (this.$device.isMobile && e.type === "blur" && this.keyword) {
        this.$router.push(`/search/${this.keyword}`);
        this.$emit("closeSideBar");
      }
    }
  }
};
</script>

<style scoped>
/* sidebar */
.slide-leave {
  transform: translate3d(0, 0, 0);
}
.slide-leave-active {
  transition: all 3s cubic-bezier(0.79, 0.14, 0.15, 0.86);
}
.slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate3d(100%, 0, 0);
}

.search-sidebar {
  /* position */
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  z-index: 10000;
  /* background */
  background-image: url("../../assets/imgs/nongthon.jpg");
  background-size: cover;
  background-position: center top;
}
/* before */

.search-sidebar::before {
  content: "";
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  z-index: 1001;

  /* background */
  opacity: 0.8;
  background: linear-gradient(
    45deg,
    rgba(1, 3, 2, 0.9) 0%,
    rgba(95, 94, 95, 0.9) 100%
  );
}

/* icon */

.search-sidebar .search-sidebar__icon,
.search-sidebar .search-sidebar__search {
  z-index: 1002;
}

.search-sidebar__icon {
  text-align: right;
  padding: 2.5rem 1.25rem;
  font-size: 1.5rem;

  cursor: pointer;
}

.search-sidebar__icon i {
  color: white;
  transition: 0.4s ease;
}

.search-sidebar__icon i:hover {
  color: var(--hovercolor);
  cursor: pointer;
}

/* search */
.search-sidebar .search-sidebar__search {
  margin: 0 5%;
  text-align: center;
}

.search-sidebar .search-sidebar__search span {
  opacity: 0.8;
  color: #e2e8f0;
  display: block;
}

/* input */
.search-sidebar .search-sidebar__search .search-sidebar__search-input {
  color: #fff;
  font-weight: 700;
  font-size: 26px;
  height: 40px;
  line-height: 36px;
  border: 0;
  background: 0 0;
  outline: 0;
  margin: 8px 0;
  padding: 0;
  text-align: center;
  width: 100%;
}

.search-sidebar .search-sidebar__search::before,
.search-sidebar .search-sidebar__search::after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 1px;
  background-color: #fff;
  bottom: 0;
  left: 0;
  opacity: 0.2;
  z-index: 1002;
}

.search-sidebar .search-sidebar__search::after {
  opacity: 0.8;
  transform: scaleX(0);
  -webkit-transform: scaleX(0);
  -webkit-transition: transform 0.5s ease 0.8s;
  transition: transform 0.5s ease 0.8s;
}

.search-sidebar.show .search-sidebar__search::after {
  transform: scaleX(1);
  -webkit-transform: scaleX(1);
}
</style>