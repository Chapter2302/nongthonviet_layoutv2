<template>
  <div style="min-height: 300px;" class="flex justify-center items-center">
    <div class="text-center my-auto">
      <h1 class="mt-10 text-maincolor text-3xl">Xác thực tài khoản</h1>
      <div class="text-red-500" v-if="errMess">{{errMess}}</div>
      <div class="text-maincolor" v-if="successMess">{{successMess}}</div>
      <div class="flex justify-center items-center">
        <div
          @click="$router.push('/')"
          class="cursor-pointer submitbutton mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >Quay về Trang chủ</div>
        <a
          href="tel:093.205.6666"
          v-if="errMess"
          class="cursor-pointer secondbutton ml-3 mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >Liên hệ hỗ trợ</a>
        <!-- <div
          @click="handleVerify"
          class="cursor-pointer submitbutton mt-5 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >Xác thực tài khoản</div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errMess: "",
      successMess: ""
    };
  },
  created() {
    this.handleVerify();
  },
  methods: {
    async handleVerify() {
      const token = this.$route.query.code;
      await this.$store.dispatch("verifyUserAccount", {
        token,
        nextActions: async res => {
          this.successMess = "Xác thực thành công";
          // setTimeout(() => {
          //   this.successMess = "";
          // }, 3000);
          const loginToken = res.result.loginToken;
          await this.$store.dispatch("getMeFromVerify", {
            loginToken,
            nextActions: res => {
            },
            errorActions: err => {
              console.log(err);
            }
          });
        },
        errorActions: err => {
          this.errMess = err.message;
          // setTimeout(() => {
          //   this.errMess = "";
          // }, 3000);
        }
      });
    }
  }
};
</script>
<style scoped>
.submitbutton {
  background: var(--maincolor);
  color: white;
}
.submitbutton:hover {
  background: var(--hovercolor);
}
.secondbutton {
  color: var(--maincolor);
  border: solid 1px var(--maincolor);
}
.secondbutton:hover {
  color: white;
  background: var(--maincolor);
}
</style>
