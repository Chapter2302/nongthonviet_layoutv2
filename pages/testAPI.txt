<script>
export default {
  // Trường hợp ?id=2&name=tam (truyền obj vào urlQuery)
  async asyncData(context) {
    await context.store.dispatch("getPostInCategory", {
      urlQuery: { a: 1, b: 2, c: 3 },
      nextActions: res => {
        console.log(res);
      },
      errorActions: err => {
        console.log(err);
      }
    });
  },
  // Trường hợp truyền obj vào param (truyền obj vào param, url k đổi (Post method))
  async asyncData(context) {
    await context.store.dispatch("getPostInCategory", {
      a: 1,
      b: 2,
      c: 3,
      nextActions: res => {
        console.log(res);
      },
      errorActions: err => {
        console.log(err);
      }
    });
  },

  // Có thể dùng mounted or created tương tự như asyncData (khác nhau là asyncData return merge vào data và chạy trc khi tải component, mounted đã tải)
  async mounted() {
    await this.$store.dispatch("getPostInCategory", {
      urlQuery: { a: 1, b: 2 },
      nextActions: res => {
        console.log(res);
      },
      errorActions: err => {
        console.log(err);
      }
    });
  }
  // Trường hợp nextActions : xử lý khi response Status = true, errorActions : reponse Status = false.
  // Có thể chấm then(() => {}) phía sau dispatch để xử lý data khi status = true or false ( chung cho cả 2 )
  // Define method ở store/action.js
};
</script>