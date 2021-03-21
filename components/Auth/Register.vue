<template>
  <div>
    <div class="auth-form-wrapper" v-if="!showFormSucess">
      <div>
        <h3 class="auth-form__title">ĐĂNG KÝ</h3>
        <p class="auth-form__panel">Xin chào! Đăng ký tài khoản của bạn</p>

        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-input" :class="{ error: $v.email.$error }">
            <input v-model.trim="$v.email.$model" name="email" type="text" value required />
            <label for="email">Email</label>
            <div v-if="!$v.email.email" class="error">Bạn phải nhập email hợp lệ</div>
            <div v-if="!$v.email.required" class="error">Email không được để trống</div>
          </div>

          <div class="form-input" :class="{ error: $v.name.$error }">
            <input v-model.trim="$v.name.$model" name="name" type="text" value required />
            <label for="name">Họ và tên</label>

            <div v-if="!$v.name.required" class="error">Tên không được để trống</div>

            <div v-if="!$v.name.minLength" class="error">Tên không được thấp hơn 4 ký tự</div>
          </div>

          <div class="form-input" :class="{ error: $v.password.$error }">
            <input v-model.trim="$v.password.$model" name="password" type="password" value required />
            <label for="password">Mật Khẩu</label>
            <div v-if="!$v.password.required" class="error">Mật khẩu không được để trống</div>

            <div v-if="!$v.password.minLength" class="error">Mật khẩu không được thấp hơn 6 ký tự</div>
          </div>

          <div class="form-input" :class="{ error: $v.cfpassword.$error }">
            <input
              v-model.trim="$v.cfpassword.$model"
              name="cfpassword"
              type="password"
              value
              required
            />
            <label for="cfpassword">Xác Nhận Mật Khẩu</label>
            <div v-if="!$v.cfpassword.sameAsPassword" class="error">Xác nhận mật khẩu không khớp</div>
          </div>

          <p class="main-error text-md font-bold text-left" v-if="errMess">{{ errMess }}</p>
          <div class="flex justify-center" v-if="isLoadingRegister">
            <div class="loader"></div>
          </div>
          <button class="form-btn">Đăng Ký</button>

          <p @click="login" class="form-link">Đã có tài khoản? Trở lại đăng nhập</p>
        </form>
      </div>
    </div>
    <div class="auth-form-wrapper" v-if="showFormSucess">
      <div class="flex justify-center items-center" style="min-height : 400px">
        <p class="auth-form__panel" v-if="successMess">{{successMess}}</p>
      </div>
      <p @click="login" class="form-link">Đã có tài khoản? Trở lại đăng nhập</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import {
  required,
  minLength,
  between,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  props: {
    login: {
      type: Function
    }
  },
  data() {
    return {
      email: null,
      name: null,
      password: null,
      cfpassword: null,
      isLoadingRegister: false,
      successMess: "",
      errMess: "",
      showFormSucess: false
    };
  },

  computed: {
    ...mapState(["authError"])
  },

  validations: {
    name: {
      required,
      minLength: minLength(4)
    },

    email: {
      email,
      required
    },

    password: {
      required,
      minLength: minLength(6)
    },

    cfpassword: {
      sameAsPassword: sameAs("password")
    }
  },

  methods: {
    handleRegister() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.isLoadingRegister = true;
        this.$store.dispatch("register", {
          data: {
            email: this.email,
            name: this.name,
            password: this.password
          },
          nextActions: res => {
            this.isLoadingRegister = false;
            this.successMess =
              "Đăng ký thành công, vui lòng kiểm tra email để kích hoạt tài khoản";
            this.showFormSucess = true;
          },
          errorActions: err => {
            console.log(err);
            this.errMess = err.message;
            setTimeout(() => {
              this.errMess = "";
            }, 3000);
          }
        });
        // this.register({
        //   email: this.email,
        //   name: this.name,
        //   password: this.password
        // });
      }
    }
  }
};
</script>

<style>
.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid var(--maincolor);
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>