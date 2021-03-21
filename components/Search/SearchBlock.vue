<template>
  <Container1240>
    <div class="search">
      <p class="search__title">Kết quả tìm kiếm:</p>
      <div class="search__input relative">
        <input type="text" v-model="keyword" @keypress.enter="$router.push(`/search/${keyword}`)"  @keydown.esc="keyword = ''"/>
        <i class="fas fa-search absolute" @click="$router.push(`/search/${keyword}`) "></i>
      </div>
    </div>
  </Container1240>
</template>

<script>
import Container1240 from "../containers/Container1240.vue";

export default {
  data() {
    return {
      keyword : ''
    }
  },
  created() {
    this.keyword = this.$route.params.search
  },
  components: {
    Container1240,
  },
};
</script>

<style scoped>
.search {
  text-align: center;
}

.search__title {
  color: #919191;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.search__input {
  width: 50%;
  margin: 0 auto;
}

.search__input input {
  color: #000000;
  font-size: 33px;
  font-weight: 600;
  outline: none;

  border-bottom: 0.1px solid #e1e1e1;
  padding: 5px;

  padding-right: 30px;
  width: 100%;
}

.search__input input:focus {
  border-color: #b0b0b0 !important;
}

.search__input i {
  font-size: 16px;
  cursor: pointer;
  right: 0;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}

.search__input i:hover {
  color: var(--hovercolor);
}

@media (max-width: 767px) {
  .search__input {
    width: 80%;
  }
}
</style>
