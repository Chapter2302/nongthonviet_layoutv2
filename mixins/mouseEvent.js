export default {
  data() {
    return {
      scrollX: 0,
      isDown: false,
      startX: null,
      scrollLeft: null
    };
  },
  methods: {
    onMousedown(e) {
      this.isDown = true;
      this.startX = e.pageX - this.$refs.scrollable.offsetLeft;
      this.scrollLeft = this.$refs.scrollable.scrollLeft;
    },
    onMouseleave(e) {
      this.isDown = false;
    },
    onMouseup(e) {
      this.isDown = false;
    },
    onMousemove(e) {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.$refs.scrollable.offsetLeft;
      const walk = (x - this.startX) * 2; //scroll-fast
      this.$refs.scrollable.scrollLeft = this.scrollLeft - walk;
    },
    onMousewheel(event) {
      // if (event.deltaY != 0) {
      //   // manually scroll horizonally instead
      //   this.$refs.scrollable.scrollLeft =
      //     this.$refs.scrollable.scrollLeft + event.deltaY * 0.75;

      //   // prevent vertical scroll
      //   event.preventDefault();
      // }
    }
  }
};
