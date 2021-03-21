<template>
  <div class="comment">
    <div class="comment__wrapper">
      <img
        src="https://secure.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=50&d=mm&r=g"
        alt="user-avt"
        class="comment__avatar"
      />

      <div class="comment__info">
        <div class="comment__info--wrapper">
          <p class="comment__info--name">{{ item.name }}</p>

          <p class="comment__info--time">{{ item.commentedDate | datetime("DD/MM/YYYY") }}</p>
        </div>
        <div class="comment__info--content">
          <p>{{ item.content }}.</p>
        </div>
        <a @click="() => replyComment(item)" class="comment__info--reply cursor-pointer">Phản hồi</a>
      </div>
    </div>

    <div class="comment__children">
      <CommentChildren v-for="item in childrenItems" :key="item.id" :item="item" />

      <p
        v-if="childrenItems.length < item.repliesCount"
        class="cursor-pointer hover:text-hovercolor text-right italic text-xs"
        @click="handleFetchMoreReplies"
      >Xem Thêm</p>
    </div>
  </div>
</template>

<script>
import CommentChildren from "@/components/Comment/CommentChildren.vue";

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    replyComment: {
      type: Function
    },
    fetchReply: {
      type: Boolean,
      default: false
    }
  },

  components: {
    CommentChildren
  },

  data() {
    return {
      childrenItems: [],
      limit: 1
    };
  },

  methods: {
    async handleFetchMoreReplies() {
      this.limit += 5;
      await this.$store.dispatch(
        "getReplyComments",
        {
          commentId: this.item.id,
          skip: 0,
          limit: this.limit,
          nextActions: res => {
            this.childrenItems = [...res.result];
          },
          errorAction: err => {
            console.log(err);
          }
        }
        // {
        //   commentId: this.item.commentId,
        //   urlQuery: {
        //     skip: 0,
        //     limit: this.limit,
        //   },
        // }
      );

      // this.childrenItems = [...comments.data.result];
    }
  },

  watch: {
    async fetchReply(value) {
      if (value) {
        if (this.childrenItems.length === this.limit) this.limit += 5;
        await this.$store.dispatch(
          "getReplyComments",
          {
            commentId: this.item.id,
            skip: 0,
            limit: 1000,
            nextActions: res => {
              this.childrenItems = [...res.result];
            },
            errorAction: err => {
              console.log(err);
            }
          }
          // {
          //   commentId: this.item.commentId,
          //   urlQuery: {
          //     skip: 0,
          //     limit: 1000
          //   }
          // }
        );

        // this.childrenItems = [...comments.data.result];

        this.$emit("setReFetchFail");
      }
    }
  },

  async created() {
    try {
      await this.$store.dispatch(
        "getReplyComments",
        {
          commentId: this.item.id,
          skip: 0,
          limit: 1,
          nextActions: res => {
            this.childrenItems = [...res.result];
          },
          errorAction: err => {
            console.log(err);
          }
        }
        // {
        //   commentId: this.item.commentId,
        //   urlQuery: {
        //     skip: 0,
        //     limit: 1
        //   }
        // }
      );

      // this.childrenItems = [...comments.data.result];
    } catch (e) {}
  }
};
</script>

<style scoped>
.comment {
  padding-bottom: 8px;
  border-bottom: 1px dashed #ededed;
  margin-bottom: 24px;
}

.comment__wrapper {
  display: flex;
}

.comment__avatar {
  width: 50px;
  height: 50px;

  border-radius: 50%;
  margin-bottom: 20px;
  margin-right: 20px;
}

.comment__info--wrapper {
  /* display: flex; */
  /* align-items: center; */
}

.comment__info--name {
  display: inline-block;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  line-height: 1;
  color: #000;
}

.comment__info--time {
  display: inline-block;

  font-size: 12px;
  line-height: 1;
  color: #b4b4b4;
  padding-left: 10px;
}

.comment__info--content {
  margin-top: 8px;
}

.comment__info--content em {
  font-style: italic;
}

.comment__info--content p {
  font-size: 14px;
  line-height: 1.2;
  margin-top: 5px;
}
.comment__info--reply {
  display: block;
  font-size: 12px;
  color: #8f8282;
  margin-top: 10px;
}

@media (max-width: 767px) {
  .comment__avatar {
    width: 36px;
    height: 36px;
  }
}
</style>
