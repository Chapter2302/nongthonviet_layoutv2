<template>
  <div class="search-home">
    <div class="search-home__content">
      <div class="search-home__wrapper">
        <input
          type="text"
          ref="search"
          v-model="keyword"
          @keypress.enter="[$router.push(`/search/${keyword}`), $emit('closeSearch')]"
          @keydown.esc="$emit('closeSearch')"
        />
        <button @click="[$router.push(`/search/${keyword}`), $emit('closeSearch')]">Tìm kiếm</button>
      </div>
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
  mounted() {
    this.$refs.search.focus();
  }
};
</script>

<style scoped>
.search-home {
  width: 800px;
  right: 20px;
  position: absolute;
  top: 50px;
  z-index: 1000;
}

.search-home__content {
  max-width: 600px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.11);
  margin-left: auto;
  margin-right: 0;
}

.search-home__wrapper {
  padding: 30px;
  border: 1px solid #ececec;
  background: white;
  display: flex;
}

.search-home__wrapper input {
  width: 80%;
  color: #444;
  font-size: 14px;
  font-weight: 400;
  background: transparent;
  padding: 3px 0;
  outline: none;
  line-height: 21px;
  border-bottom: 1.5px solid #e1e1e1;
}

.search-home__wrapper button {
  width: 20%;
  padding: 16px 8px;
  background: var(--maincolor);
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
}
</style>
