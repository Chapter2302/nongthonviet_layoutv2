<template>
  <div style="max-width : 500px;" class="mx-auto px-5">
    <div class="text-center">
      <h1 class="mt-10 text-maincolor text-3xl">Đổi mật khẩu</h1>
    </div>
    <form @submit.prevent="handleChangePassword" class="mt-10">
      <label for="old-password" class="block text-sm font-medium text-gray-700">Nhập mật khẩu cũ</label>
      <input
        oninvalid="this.setCustomValidity('Vui lòng nhập mật khẩu hiện tại')"
        v-model="oldPassword"
        oninput="setCustomValidity('')"
        required
        type="password"
        name="old-password"
        id="old-password"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />
      <label
        for="new-password"
        class="block text-sm font-medium text-gray-700 mt-5"
      >Nhập mật khẩu mới</label>
      <input
        type="password"
        v-model="newPassword"
        name="new-password"
        required
        oninvalid="this.setCustomValidity('Vui lòng nhập mật khẩu mới')"
        oninput="setCustomValidity('')"
        id="new-password"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />
      <label
        for="renew-password"
        class="block text-sm font-medium text-gray-700 mt-5"
      >Nhập lại mật khẩu mới</label>
      <input
        type="password"
        v-model="reNewPassword"
        required
        oninvalid="this.setCustomValidity('Vui lòng nhập lại mật khẩu mới')"
        oninput="setCustomValidity('')"
        name="renew-password"
        id="renew-password"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />
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
    <div class="text-center text-maincolor mt-5" v-if="successMessage">{{successMessage}}</div>
    <div class="text-center text-red-500 mt-5" v-if="errMessage">{{errMessage}}</div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      messageConfirmPassword: "",
      successMessage: "",
      errMessage: ""
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
    async handleChangePassword() {
      if (!this.messageConfirmPassword) {
        let userId = localStorage.getItem("userId");
        let data = {
          userId,
          password: this.oldPassword,
          newPassword: this.newPassword
        };
        await this.$store.dispatch("changePassword", {
          data,
          nextActions: res => {
            this.successMessage = "Cập nhật mật khẩu thành công";
            this.oldPassword = "";
            this.newPassword = "";
            this.reNewPassword = "";
            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
          },
          errorActions: err => {
            this.errMessage = err.message;
            setTimeout(() => {
              this.errMessage = "";
            }, 3000);
          }
        });
      }
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
