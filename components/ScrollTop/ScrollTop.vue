<template>
  <div>
    <a class="back_to_top" title="Наверх"><i class="fas fa-arrow-up"></i></a>
  </div>
</template>

<script>
export default {
  mounted() {
    var goTopBtn = document.querySelector(".back_to_top");
    const backToTop = () => {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
      }
    };
    const trackScroll = () => {
      var scrolled = window.pageYOffset;
      var coords = document.documentElement.clientHeight;
      if (scrolled > coords) {
        goTopBtn.classList.add("back_to_top-show");
      }
      if (scrolled < coords) {
        goTopBtn.classList.remove("back_to_top-show");
      }
    };
    window.addEventListener("scroll", trackScroll);
    goTopBtn.addEventListener("click", backToTop);
  },
  methods: {}
};
</script>
<style scoped>
.back_to_top {
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 9999;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: var(--maincolor);
  color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 2px;
  display: none;
}

.back_to_top:hover {
  background: var(--hovercolor);
}

.back_to_top-show {
  display: block;
}
</style>