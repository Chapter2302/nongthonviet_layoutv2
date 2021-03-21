<template>
  <div class="comment__children">
    <img
      src="https://secure.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=50&d=mm&r=g"
      alt="user-avt"
      class="comment__avatar"
    />

    <div class="comment__info">
      <div class="comment__info--wrapper">
        <p class="comment__info--name">{{ item.name }}</p>

        <p class="comment__info--time">
          {{ item.commentedDate | datetime("DD/MM/YYYY") }}
        </p>
      </div>
      <div class="comment__info--content">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.comment__children {
  display: flex;

  margin-left: 70px;
  padding-top: 16px;
  border-top: 1px dashed #ededed;
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
  margin-top: 10px;
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
  color: #b4b4b4;
  margin-top: 10px;
}

@media (max-width: 767px) {
  .comment__avatar {
    width: 36px;
    height: 36px;
  }
}
</style>
