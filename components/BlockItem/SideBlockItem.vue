<template>
  <div
    class="side-item"
    :class="{ noneImg: noneImg, border: isBorder, square: isSquare }"
  >
    <div class="side-item__info">
      <h3 class="side-item__title line-clamp-title">
        <nuxt-link :to="postLink" style="line-height: normal">{{
          post.title
        }}</nuxt-link>
      </h3>
      <p class="side-item__date">
        {{ post.publishedDate | datetime("DD/MM/YYYY") }}
      </p>
    </div>

    <div class="side-item__img" v-if="!noneImg">
      <img :src="post.image" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noneImg: {
      type: Boolean,
      default: false
    },

    isBorder: {
      type: Boolean,
      default: false
    },

    isSquare: {
      type: Boolean,
      default: false
    },

    post: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  computed: {
    postLink() {
      if (!this.post.type)
        return "/post/" + this.post.alias + `-id=${this.post.id}`;

      return this.post.type === "LongForm"
        ? "/longform/" + this.post.alias + `-id=${this.post.id}`
        : "/post/" + this.post.alias + `-id=${this.post.id}`;
    }
  }
};
</script>

<style scoped>
.side-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 20px;
}

.side-item.mb-0 {
  margin-bottom: 0;
  padding-bottom: 0;
}

.side-item.border {
  border-bottom: 1px solid #eaeaea;
}

.side-item.border:last-child {
  border: none;
}

.side-item.noneImg .side-item__info {
  width: 100%;
  margin-right: 0;
}

.side-item .side-item__info {
  width: 75%;
}

.side-item .side-item__date {
  font-size: 12px;
  line-height: 1;
  font-style: italic;
  font-weight: 400;
}

.side-item .side-item__info h3 {
  font-family: SourceSansProSemiBold;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 6px;
  line-height: 20px
}
@media (max-width: 767px) {
  .side-item .side-item__info h3 {
    font-size: 19px
  }
}
.side-item .side-item__info h3 a:hover {
  color: var(--hovercolor);
}

.side-item .side-item__img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.side-item .side-item__img img {
  width: 100%;
  object-fit: cover;

  height: 100%;
  border-radius: 50%;
}

.side-item.square .side-item__img {
  border-radius: 0;
  /* width: 25%;
  height: auto;
  align-self: stretch; */
}

.side-item.square .side-item__img img {
  border-radius: 0;
}

/* responsive */
@media (max-width: 767px) {
  .side-item__title {
    font-size: 19px
  }
}

@media (min-width: 768px) {
}

/* tablet */
@media (max-width: 1018px) and (min-width: 768px) {
  .side-item {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  .side-item.square {
    margin-bottom: 5px;
    padding-bottom: 5px;
  }

  .side-item.square .side-item__date {
    display: none;
  }

  .side-item .side-item__info h3 {
    font-size: 12px;
    line-height: 16px;
  }

  .side-item.square .side-item__info {
    width: 60%;
  }

  .side-item.square h3 {
    line-height: 1;
  }

  .side-item .side-item__img {
    width: 50px;
    height: 50px;
  }
}

/* dékstop */
@media (max-width: 1140px) and (min-width: 1019px) {
  /* title */
  .side-item .side-item__info h3 {
    line-height: 16px;
  }

  /* img */

  .side-item .side-item__img {
    width: 50px;
    height: 50px;
  }
}

@media (min-width: 1141px) {
}
</style>
