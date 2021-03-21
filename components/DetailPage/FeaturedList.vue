<template>
  <Container1240>
    <div class="xs:px-0">
      <h4 class="section-title">{{name}}</h4>
      <div class="grid grid-cols-12 gap-4 flex">
        <div class="col-span-3 xs:col-span-12" v-for="(post, index) in posts" :key="index">
          <ColumnItem :post="post" />
        </div>
      </div>
    </div>
  </Container1240>
</template>

<script>
import Container1240 from "@/components/containers/Container1240.vue";
import MainBlockItem from "@/components/BlockItem/RowItem.vue";
import ColumnItem from "@/components/BlockItem/ColumnItem.vue";

export default {
  components: {
    Container1240,
    MainBlockItem,
    ColumnItem
  },
  props: {
    posts: {
      type: Array,
      default: () => {
        return [];
      }
    },
    name: {
      type: String,
      default: "Tin nổi bật"
    }
  }
};
</script>

<style scoped>
.section-title {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 16px;
  color: var(--maincolor);
}
@media (min-width: 768px) {
  .section-title {
    font-size: 16px;
  }
}
@media (max-width: 1018px) and (min-width: 768px) {
  .section-title {
    font-size: 16px;
  }
}
@media (max-width: 1140px) and (min-width: 1019px) {
  .section-title {
    font-size: 20px;
  }
}
@media (min-width: 1141px) {
  .section-title {
    margin-top: 10px;
    font-size: 20px;
  }
}
</style>