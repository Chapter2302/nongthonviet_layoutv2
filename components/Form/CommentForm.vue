<template>
  <form @submit.prevent="handleSubmitComment" class="comment-form mt-5 mb-14">
    <textarea
      ref="commentArea"
      class="comment-form__area"
      placeholder="Bình Luận:"
      cols="45"
      rows="8"
      aria-required="true"
      v-model="content"
    ></textarea>
    <p
      class="text-red-500 text-xs italic ml-1 mt-1"
      v-if="$v.content.$error"
    >Nội dung bình luận không được để trống.</p>
    <div class="comment-form__inputs mt-3">
      <div>
        <input type="text" v-model="name" class="comment-form__input" placeholder="Tên của bạn: " />
        <p
          class="text-red-500 text-xs italic ml-1 mt-3"
          v-if="$v.name.$error"
        >Tên không được để trống và phải nhiều hơn 4 ký tự</p>
      </div>
      <div>
        <input type="text" v-model="email" class="comment-form__input" placeholder="Email: " />
        <p
          class="text-red-500 text-xs italic ml-1 mt-3"
          v-if="$v.email.$error"
        >Email không được để trống và phải đúng định dạng</p>
      </div>
    </div>

    <button class="comment-form__btn mt-5" type="submit">Đăng</button>
    <div v-if="notiCommentPost" class="text-maincolor mt-5">{{notiCommentPost}}</div>
  </form>
</template>

<script>
// libs
import Axios from "axios";
import { required, email, minLength } from "vuelidate/lib/validators";

// vuex
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      content: null,
      name: null,
      email: null,
      notiCommentPost: ""
    };
  },
  props: {
    postId: {
      type: String
    },
    replyData: {
      type: Object
    }
  },
  created() {
   
  },
  computed: {
    ...mapState(["user"])
  },

  validations: {
    content: {
      required
    },

    name: {
      required,
      minLength: minLength(4)
    },

    email: {
      required,
      email
    }
  },

  methods: {
    ...mapMutations(["setActiveSignin", "SET_AUTH_ERROR"]),

    handleSubmitComment() {
      this.$v.$touch();

      // check if valid
      if (this.$v.$anyError) {
        return;
      }

      const { name, email, content } = this;
      const userId = Math.trunc(Math.random() * 1000);

      // if reply
      if (this.replyData) {
        this.$store
          .dispatch("replyComment", {
            commentId: this.replyData.id,
            data: {
              commentId: this.replyData.id,
              userId,
              email,
              name,
              content: this.content
            },
            nextActions: res => {
              this.notiCommentPost = "Bình luận của bạn đang chờ kiểm duyệt";
            },
            errorActions: err => {
              this.notiCommentPost = "Bình luận của bạn đăng thất bại";
              console.log(err);
            }
          })

          // request
          .then(response => {
            this.$emit("refetchReply");
            // reset form
            setTimeout(() => {
              this.notiCommentPost = "";
            }, 3000);
            this.content = null;
            this.$v.$reset();
          })
          .catch(e => {});
      }
      // if comment
      else {
        this.$store
          .dispatch("postComment", {
            articleId: this.postId,
            data: {
              userId,
              email,
              name,
              content: this.content
            },
            nextActions: res => {
              this.notiCommentPost = "Bình luận của bạn đang chờ kiểm duyệt";
            },
            errorActions: err => {
              console.log(err);
              this.notiCommentPost = "Bình luận của bạn đăng thất bại";
            }
          })
          // request
          .then(response => {
            this.$emit("refetchComments");
            setTimeout(() => {
              this.notiCommentPost = "";
            }, 3000);
            // reset form
            this.content = null;
            this.$v.$reset();
          })
          .catch(e => {});
      }
    }
  }
};
</script>

<style scoped>
.comment-form {
  margin-bottom: 50px;
}

.comment-form__area,
.comment-form__input {
  width: 100%;
  padding: 6px 9px;
  border: 1px solid #e1e1e1;
  color: #444;
  line-height: 21px;
  font-size: 14px;
  outline: none;
  transition: 0.4s color ease;
}
.comment-form__area:focus,
.comment-form__input:focus {
  border: 2px solid black;
}

.comment-form__area:active,
.comment-form__input:active {
  border: 2px solid black;
}

.comment-form__inputs {
  display: flex;
  justify-content: space-between;
}
.comment-form__inputs > div {
  width: 49.5%;
}

.comment-form label {
  font-size: 8px;
}

.comment-form__btn {
  padding: 10px 10px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #222;
  border-radius: 0;
  color: #fff;
  border: none;
  font-weight: 500;
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
}

.comment-form__btn:hover {
  background-color: var(--hovercolor);
}

@media (max-width: 767px) {
  .comment-form__inputs {
    display: block;
  }

  .comment-form__inputs > div {
    width: 100%;
    margin: 5px 0;
  }

  .comment-form__btn {
    display: block;
    width: 100%;
  }
}
</style>
