<template>
  <div class="sidebar-mobile">
    <div class="sidebar-mobile__icon relative">
      <i class="relative fas fa-times" @click="$emit('closeSideBar')"></i>
    </div>

    <div class="sidebar-mobile__menu relative">
      <InfinityList :subs="categories" @closeSideOnMobile="$emit('closeSideBar')" />
    </div>
  </div>
</template>

<script>
import InfinityList from "@/components/NaviDesktop/InfinityList";
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  components: {
    InfinityList
  }
};
</script>
<style scoped>
.tagDetail {
  font-size: 22px;
}
</style>
<style>
/* sidebar */
@keyframes slideInFromLeft {
  0% {
    transform: translateY(-70%);
  }
  100% {
    transform: translateX(0);
  }
}
.subCateItem {
  animation: 1s ease-out 0s 1 slideInFromLeft;
  display: block;
}
.subCateItem span {
  color: #7ca32f;
}
.sidebar-mobile {
  /* position */
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 10000;
  /* background */
  /* background-size: cover;
  background-position: center top; */
  background-color: white;
  /* scroll */
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.sidebar-mobile.hide {
  width: 0;
}

.hide.sidebar-mobile::before {
  width: 0;
}

.sidebar-mobile::-webkit-scrollbar {
  display: none;
}

/* sidebar background - position */
.sidebar-mobile::before {
  content: "";
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  z-index: 1001;
  background-color: #F5F5F5;
  /* background */
  /* opacity: 0.8; */
  /* background: linear-gradient(
    45deg,
    rgba(1, 3, 2, 0.9) 0%,
    rgba(95, 94, 95, 0.9) 100%
  ); */

  /* transition */
  transition: width 0.4s ease;
}

.sidebar-mobile .sidebar-mobile__icon,
.sidebar-mobile .sidebar-mobile__menu {
  z-index: 1002;
}

/* icon */
.sidebar-mobile__icon {
  text-align: right;
  padding: 1rem 1.25rem 1rem 0rem;
  font-size: 1.5rem;

  cursor: pointer;
}
.sidebar-mobile__menu-item {
  color: white;
  transition: 0.4s ease;
}
.sidebar-mobile__icon i {
  color: #030106;
  transition: 0.4s ease;
}

.sidebar-mobile__icon i:hover {
  color: var(--hovercolor);
  cursor: pointer;
}

/* menu */
.sidebar-mobile__menu {
  padding: 0 1.25rem;
  height: 80%;
  overflow: auto;
}

/* menu item */
.sidebar-mobile__menu .sidebar-mobile__menu-item {
  line-height: 24px;
}

.sidebar-mobile__menu .sidebar-mobile__menu-item a {
  display: inline-block;
  padding: 12px 12px 12px 12px;
  font-size: 20px;
  color: #3a6b35;
  font-weight: 700;
}

.sidebar-mobile__menu .sidebar-mobile__menu-item a:hover {
  color: var(--hovercolor);
}
</style>