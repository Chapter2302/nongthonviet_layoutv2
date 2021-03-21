<template>
  <div style="max-width : 500px;" class="mx-auto px-5">
    <div class="text-center">
      <h1 class="mt-10 text-maincolor text-3xl">Làm mới mật khẩu</h1>
    </div>
    <form @submit.prevent="handleRefreshPass" class="mt-10">
      <label
        for="new-password"
        class="block text-sm font-medium text-gray-700 mt-5"
      >Nhập mật khẩu mới</label>
      <input
        type="password"
        required
        oninvalid="this.setCustomValidity('Vui lòng nhập mật khẩu mới')"
        oninput="setCustomValidity('')"
        name="new-password"
        v-model="newPassword"
        id="new-password"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />
      <label
        for="renew-password"
        class="block text-sm font-medium text-gray-700 mt-5"
      >Nhập lại mật khẩu mới</label>
      <input
        type="password"
        oninvalid="this.setCustomValidity('Vui lòng nhập lại mật khẩu mới')"
        oninput="setCustomValidity('')"
        required
        v-model="reNewPassword"
        name="renew-password"
        id="renew-password"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />
      <div class="text-red-500" v-if="errMess">{{errMess}}</div>
      <div class="text-maincolor" v-if="successMess">{{successMess}}</div>
      <div v-if="messageConfirmPassword" class="text-red-500 mt-2">{{messageConfirmPassword}}</div>
      <div class="text-right">
        <div
          @click="$router.push('/')"
          class="cursor-pointer secondbutton mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >Trang chủ</div>
        <button
          type="submit"
          class="submitbutton mt-5 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >Đổi mật khẩu</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errMess: "",
      successMess: "",
      reNewPassword: "",
      newPassword: "",
      messageConfirmPassword: ""
    };
  },
  watch: {
    newPassword(val, oldVal) {
      if (this.reNewPassword && val !== this.reNewPassword) {
        this.messageConfirmPassword = "Xác nhận mật khẩu không chính xác";
      } else {
        this.messageConfirmPassword = "";
      }
    },
    reNewPassword(val, oldVal) {
      if (this.reNewPassword && val !== this.newPassword) {
        this.messageConfirmPassword = "Xác nhận mật khẩu không chính xác";
      } else {
        this.messageConfirmPassword = "";
      }
    }
  },
  methods: {
    async handleRefreshPass() {
      const token = this.$route.query.code;
      const data = {
        token,
        newPassword: this.newPassword
      };
      await this.$store.dispatch("refreshPass", {
        data,
        nextActions: async res => {
          this.successMess = "Đổi mật khẩu thành công";
          setTimeout(() => {
            this.successMess = "";
          }, 3000);
          const loginToken = res.result.loginToken;
          await this.$store.dispatch("getMeFromVerify", {
            loginToken,
            nextActions: res => {
              this.$router.push("/");
            },
            errorActions: err => {
              console.log(err);
            }
          });
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
.inputstyle {
  border: solid 1px #d0d0d0;
  height: 30px;
  padding: 5px;
}
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
