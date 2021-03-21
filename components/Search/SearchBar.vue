<template>
  <div class="relative my-2 ml-3 search-bar">
    <input
      v-model="keyword"
      @keypress.enter="onSearch"
      @keydown.esc="onDelete"
      class="rounded-full border-black border-t-black-600 border py-1 px-3 w-full search-input"
      placeholder="Tìm kiếm..."
      ref="searchInput"
    />
    <div class="search-icon">
      <i class="fas fa-search" @click="onSearch"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    onDelete() {
      this.keyword = "";
    },
    onSearch() {
      this.$router.push(`/search/${this.keyword}`);
      const searchInput = this.$refs.searchInput;
      searchInput.blur();
      this.keyword = "";
    }
  }
};
</script>
<style scoped>
.search-bar {
  width: 250px;
}
.search-input {
  outline: none;
}
.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  z-index: 10;
  transform: translateY(-50%);
}
</style>