<template>
  <div>
    <div class="auth-form-wrapper" v-if="!showFormSucess">
      <h3 class="auth-form__title">KHÔI PHỤC MẬT KHẨU</h3>

      <form @submit.prevent="handleForgotPassword" class="auth-form">
        <div class="form-input" :class="{ error: $v.email.$error }">
          <input name="email" v-model.trim="$v.email.$model" type="text" value required />
          <label for="email">Email</label>

          <div v-if="!$v.email.email" class="error">Bạn phải nhập email hợp lệ</div>
          <div v-if="!$v.email.required" class="error">Email không được để trống</div>
        </div>

        <p class="text-left text-xs hover:underline">Nhập email để làm mới mật khẩu</p>

        <p class="main-error text-md mt-4 font-bold text-left" v-if="errMess">{{ errMess }}</p>
        <div class="flex justify-center mt-3" v-if="isLoadingRegister">
          <div class="loader"></div>
        </div>
        <button type="submit" class="form-btn">GỬI</button>
        <p @click="login" class="form-link">Trở Lại Đăng Nhập</p>
      </form>
    </div>
    <div class="auth-form-wrapper" v-if="showFormSucess">
      <div class="flex justify-center items-center" style="min-height : 400px">
        <p class="auth-form__panel" v-if="successMess">{{successMess}}</p>
      </div>
      <p @click="login" class="form-link cursor-pointer hover:underline">Trở lại đăng nhập</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { email, required } from "vuelidate/lib/validators";

export default {
  props: {
    login: {
      type: Function
    }
  },
  data() {
    return {
      email: null,
      isLoadingRegister: false,
      successMess: "",
      errMess: "",
      showFormSucess: false
    };
  },

  computed: {
    ...mapState(["authError"])
  },

  methods: {
    handleForgotPassword() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        this.isLoadingRegister = true;
        this.$store.dispatch("forgetPassword", {
          data: { email: this.email },
          nextActions: res => {
            this.isLoadingRegister = false;
            this.successMess = "Vui lòng kiểm tra email để làm mới mật khẩu";
            this.showFormSucess = true;
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
  },
  validations: {
    email: {
      email,
      required
    }
  }
};
</script>

<style>
.success {
  color: var(--maincolor);
}
</style>