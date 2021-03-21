<template>
  <div class="trendbar" v-if="items.length">
    <div class="p-2">
      <p
        @click="$router.push(`/tag/${item.name}`), $emit('onCloseTrendBar')"
        v-for="(item,i) in items"
        :key="i"
        class="item"
      >
        <i class="fas fa-circle" style="font-size : 8px;"></i>
        {{item.name}}
      </p>
    </div>
    <div class="close-btn text-center" @click="$emit('onCloseTrendBar')">
      <div class="p-2" style="color : white">Đóng</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  async created() {
    await this.$store.dispatch("getTagList", {
      data: { isFeatured: true, skip: 0, limit: 50 },
      nextActions: res => {
        this.items = [...res.result];
      },
      errorActions: err => {
        console.log(err);
      }
    });
  }
};
</script>

<style scoped>
.trendbar {
  width: 100px;
  position: fixed;
  top: 20%;
  background-color: #dadadae8;
  border: solid 1px var(--maincolor);
  z-index: 51;
  border-radius: 0 12px 12px 0;
}
.item {
  font-size: 14px;
  color: var(--maincolor);
  margin: 10px 0;
}
.close-btn {
  width: 100%;
  background: var(--maincolor);
  border-radius: 0 0 12px 0;
}
</style>