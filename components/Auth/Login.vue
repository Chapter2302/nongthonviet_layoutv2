<template>
  <div class="login-container w-full flex justify-center">
    <div class="login-wrapper w-full">
      <div class="login-logo w-full flex justify-center">
        <img class="w-1/2" src="@/assets/imgs/logotapchi1.png"/>
      </div>
      <hr class="divider mt-6 mb-4"/> 
      <form class="px-4" @submit.prevent="handleLogin">
        <div class="login-btns-group">
          <a class="flex justify-center w-full login-btn google-login-btn">
             <img class="mr-2" width="18" height="18" src="https://cdn.icon-icons.com/icons2/2119/PNG/512/google_icon_131222.png"/>
             Continue with Google
          </a>
          <a class="flex justify-center w-full login-btn facebook-login-btn">
            <img class="mr-2" width="18" height="18" src="https://cdn.icon-icons.com/icons2/836/PNG/512/Facebook_icon-icons.com_66805.png"/>
             Continue with Facebook
          </a>
          <a class="flex justify-center w-full login-btn apple-login-btn">
            <img class="mr-2" width="18" height="18" src="@/assets/imgs/icons/apple-icon.png"/>
             Continue with Apple
          </a>
        </div>
        <div class="separator">
          <span>Or use your email</span>
        </div>
        <fieldset class="mt-4 form-input" :class="{ error: $v.email.$error }">
          <label for="username" class="input-label">Email Address</label>
          <input 
            name="email" 
            type="email" 
            v-model="email"
            class="input-box"
          >
          <div v-if="!$v.email.email" class="error">
            Bạn phải nhập email hợp lệ
          </div>
          <div v-if="!$v.email.required" class="error">
            Email không được để trống
          </div>
        </fieldset>
        <fieldset class="mt-2 form-input" :class="{ error: $v.password.$error }">
          <label for="username" class="input-label">Password</label>
          <div class="flex">
            <input 
              name="password" 
              :type="isShow ? 'text' : 'password'" 
              v-model="password"
              class="input-box password-input-box"
            >
            <div class="show-btn-input-box" @click="isShow = !isShow">Show</div>
          </div>
          <div v-if="!$v.password.required" class="error">
            Mật khẩu không được để trống
          </div>
        </fieldset>
        <div class="flex justify-between my-4">
          <fieldset>
            <div>
              <input 
                id="rememberMe" 
                name="remember_me" 
                type="checkbox" 
                tabindex="0" 
                data-testid="remember_me" 
                class="checkbox" 
              >
              <label for="rememberMe">
                Remember me
              </label>
            </div>
          </fieldset>
          <span @click="forgot" class="cursor-pointer">
            <u>Forgot your password?</u>
          </span>
        </div>
        <div
          class="w-full main-error font-bold text-center uppercase"
          v-if="authError"
        >
          {{ authError }}
        </div>
        <div>
          <button class="w-full bg-black text-white login-btn">
            Log In
          </button>
        </div>
        <div class="text-center py-2">
          <span>
            Không có tài khoản Nông Thôn Việt? 
            <span @click="register" class="cursor-pointer">
              <u class="font-bold">Tạo ngay</u>
            </span>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import { required, email } from "vuelidate/lib/validators";

export default {
  props: {
    forgot: {
      type: Function,
    },
    register: {
      type: Function,
    },
  },
  data() {
    return {
      email: null,
      password: null,
      isShow: false,
    };
  },

  computed: {
    ...mapState(["authError"]),
  },

  validations: {
    email: {
      email,
      required,
    },

    password: {
      required,
    },
  },

  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.login({ email: this.email, password: this.password });
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.login-wrapper {
  max-width: 400px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

.divider {
  border-top-width: 2px;
}

.login-btn {
  border-radius: 0.19rem;
  align-items: center;
  border: 1px solid rgb(136, 136, 136);
  text-decoration: none;
  margin: 0.5rem 0rem;
  font-weight: 600;
  font-size: 1em;
  line-height: 2em;
  cursor: pointer;
}

.separator {
  margin: 1.1em 0px 0px;
  line-height: 1em;
  font-weight: 500;
  color: rgb(102, 102, 102);
  position: relative;
  text-align: center;
}

.separator::before {
  position: absolute;
  display: inline-block;
  content: "";
  left: 0;
  top: 50%;
  width: calc(50% - 4rem);
  height: 0px;
  border-bottom: 1px solid rgb(204, 204, 204);
}

.separator::after {
  position: absolute;
  display: inline-block;
  content: "";
  right: 0;
  top: 50%;
  width: calc(50% - 4rem);
  height: 0px;
  border-bottom: 1px solid rgb(204, 204, 204);
}

.input-label {
  display: block;
  font-weight: 600;
  padding-left: 0.3em;
  padding-bottom: 0.2em
}

.input-box {
  width: 100%;
  height: 2rem;
  padding: 0px 0.5rem;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: normal;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  outline: none;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 3px;
  appearance: none;
  opacity: 1;
  box-shadow: none;
}

.show-btn-input-box {
  width: 20%;
  border: 1px solid rgb(204, 204, 204);
  border-left: 0px;
  border-radius: 0px 3px 3px 0px;
  font-weight: 600;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.show-btn-input-box:focus {
  outline: none;
}

.password-input-box {
  width: 80%;
  border-right: none;
  border-radius: 3px 0px 0px 3px;
}

.form-input.error input {
  border-color: #f79483;
}

.form-input.error div {
  color: #f79483;
  border-color: #f79483;
}

.main-error {
  color: #f79483;
}

.form-input .error {
  display: none;
}

.form-input.error .error {
  text-align: left;
  color: #f79483;
  display: block;
}
</style>
