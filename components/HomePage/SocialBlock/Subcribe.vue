<template>
  <div class="py-5 px-6">
    <div
      class="text-2xl sm:text-base md:text-lg font-bold"
      style="color : #AEC730"
    >Đăng ký nhận tin nóng</div>
    <div class="mt-4 mb-6 italic xs:text-xs sm:text-sm">Giúp bạn cập nhật các thông tin mới nhất</div>
    <form @submit.prevent="handleSubscribe">
      <div class="flex">
        <input
          type="email"
          class="flex-1 outline-none h-10 p-2 sm:w-5 sm:text-xs"
          placeholder="Nhập email"
          v-model="email"
          oninvalid="this.setCustomValidity('Vui lòng nhập đúng định dạng email')"
          oninput="setCustomValidity('')"
        />
        <button
          class="uppercase h-10 text-white px-3 sm:px-2"
          style="background : #09334C; min-width : 80px; font-size : 10px;"
          type="submit"
        >Đăng ký</button>
      </div>
    </form>

    <div class="text-maincolor mt-2" v-if="successMess">{{successMess}}</div>
    <div class="text-red-500 mt-2" v-if="errMess">{{errMess}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      successMess: "",
      errMess: "",
      email: ""
    };
  },
  methods: {
    handleSubscribe() {
      this.$store.dispatch("subscribe", {
        data: { email: this.email },
        nextActions: res => {
          this.successMess = "Đăng ký thành công";
          this.email = "";
          setTimeout(() => {
            this.successMess = "";
          }, 3000);
        },
        errorActions: err => {
          this.errMess = err.message;
          setTimeout(() => {
            this.errMess = "";
          }, 3000);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>