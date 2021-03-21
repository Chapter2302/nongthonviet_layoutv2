<template>
  <div class="category">
    <container1440>
      <div class="category__wrapper">
        <p class="category__title">Danh mục</p>

        <h1 class="category__name my-2">{{cateName}}</h1>

        <ul class="category__list" v-if="subCates.length">
          <li v-for="(subCate,i) in subCates" :key="i" class="category__list-item">
            <nuxt-link :to="`/category/${subCate.alias}-id=${subCate.id}`">{{subCate.name}}</nuxt-link>
          </li>
        </ul>
      </div>
    </container1440>
  </div>
</template>

<script>
import Container1440 from "../../containers/Container1440.vue";

export default {
  components: {
    Container1440
  },
  props: {
    cateName: {
      type: String
    },
    subCates : {
      type : Array,
      default : () => []
    }
  }
};
</script>

<style scoped>
.category {
  text-align: center;
}

.category__title {
  color: #919191;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.category__name {
  font-size: 36px;
  line-height: 38px;
  font-weight: 700;
  text-transform: none;
}

.category__list {
  margin-top: 5px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-flow:wrap;
}

.category__list .category__list-item {
  margin: 5px
}

.category__list .category__list-item a {
  padding: 3px 3px;
  font-size: 15px;
  /*text-transform: uppercase;*/
  /*letter-spacing: 1px;*/
  background: var(--maincolor);
  color: #ffffff;
}

.category__list .category__list-item a:hover {
  opacity: 0.9;
}
</style>
