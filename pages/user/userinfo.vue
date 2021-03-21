<template>
  <div style="max-width : 500px;" class="mx-auto px-5">
    <div class="text-center">
      <h1 class="mt-10 text-maincolor text-3xl">Thông tin tài khoản</h1>
    </div>
    <form @submit.prevent="handleUpdateUserInfo" class="mt-10">
      <label for="old-password" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        oninvalid="this.setCustomValidity('Vui lòng nhập đúng định dạng email')"
        oninput="setCustomValidity('')"
        id="email"
        v-model="updateUserInfo.email"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />

      <label for="new-password" class="block text-sm font-medium text-gray-700 mt-5">Họ tên</label>
      <input
        type="text"
        name="name"
        required
        oninvalid="this.setCustomValidity('Vui lòng nhập họ tên')"
        oninput="setCustomValidity('')"
        id="name"
        v-model="updateUserInfo.fullName"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />
      <label for="renew-password" class="block text-sm font-medium text-gray-700 mt-5">Số điện thoại</label>
      <input
        type="text"
        pattern="\d*"
        minlength="10"
        maxlength="10"
        oninvalid="this.setCustomValidity('Vui lòng nhập đúng định dạng số điện thoaij')"
        oninput="setCustomValidity('')"
        name="phone-number"
        id="phone-number"
        v-model="updateUserInfo.phoneNumber"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />
      <label for="renew-password" class="block text-sm font-medium text-gray-700 mt-5">Tuổi</label>
      <input
        type="text"
        name="age"
        id="age"
        oninvalid="this.setCustomValidity('Vui lòng nhập số tuổi')"
        oninput="setCustomValidity('')"
        pattern="\d*"
        maxlength="3"
        v-model="updateUserInfo.age"
        class="inputstyle mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
      />
      <label class="block text-sm font-medium text-gray-700 mt-5">Giới tính</label>
      <div class="flex items-center mt-2">
        <div class="flex items-center">
          <input
            id="push_nothing"
            name="push_notifications"
            type="radio"
            value="1"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            v-model="updateUserInfo.gender"
          />
          <label for="push_nothing" class="ml-3 block text-sm font-medium text-gray-700">Nam</label>
        </div>
        <div class="flex items-center ml-5">
          <input
            id="push_nothing"
            name="push_notifications"
            type="radio"
            v-model="updateUserInfo.gender"
            value="2"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label for="push_nothing" class="ml-3 block text-sm font-medium text-gray-700">Nữ</label>
        </div>
      </div>

      <div class="text-right">
        <div
          @click="$router.push('/user/change-password')"
          class="cursor-pointer secondbutton mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >Đổi mật khẩu</div>
        <button
          type="submit"
          class="submitbutton mt-5 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >Cập nhật</button>
      </div>
    </form>
    <div v-if="message" class="text-center text-maincolor mt-5">{{message}}</div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data() {
    return {
      updateUserInfo: "",
      message: ""
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  created() {
    this.updateUserInfo = JSON.parse(
      JSON.stringify(this.$store.getters.getUserInfo)
    );
  },
  watch: {
    userInfo(val, oldVal) {
      this.updateUserInfo = JSON.parse(JSON.stringify(val));
    }
  },
  methods: {
    async handleUpdateUserInfo() {
      let data = {
        email: this.updateUserInfo.email,
        fullName: this.updateUserInfo.fullName,
        gender: this.updateUserInfo.gender ? this.updateUserInfo.gender : "3",
        age: this.updateUserInfo.age ? this.updateUserInfo.age : "",
        phoneNumber: this.updateUserInfo.phoneNumber
          ? this.updateUserInfo.phoneNumber
          : ""
      };
      await this.$store.dispatch("updateUserInfo", {
        data,
        nextActions: res => {
          this.message = "Cập nhật thông tin thành công";
          setTimeout(() => {
            this.message = "";
          }, 3000);
        },
        errorActions: err => {
          this.message = "Cập nhật thông tin thất bại, vui lòng thử lại";
          setTimeout(() => {
            this.message = "";
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
