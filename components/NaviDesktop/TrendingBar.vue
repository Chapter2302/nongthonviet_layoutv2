<template>
  <Container1440 v-if="items.length" class="flex items-center h-full overflow-x-hidden mt-4">
    <div
      class="bg-red-600 trend-name p-2 whitespace-no-wrap hover:text-hovercolor cursor-pointer mr-3"
    >Tiêu điểm</div>
      <div
        class="hide-scroll flex"
        ref="scrollable"
        @mousewheel="onMousewheel"
        @mousedown="onMousedown"
        @mouseleave="onMouseleave"
        @mouseup="onMouseup"
        @mousemove="onMousemove"
      >
        <div v-for="(item,i) in items" :key="i">
          <div class="whitespace-no-wrap">
            <span
              @click="$router.push(`/tag/${item.name}`)"
              class="text-gray-600 hover:text-hovercolor whitespace-no-wrap cursor-pointer font-bold"
            >{{item.name}}</span>
            <span class="px-4 text-gray-600">{{items.length - i === 1 ? '' : '-'}}</span>
          </div>
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
  </Container1440>
  <!-- <div class="w-full bg-trending h-10 flex justify-center items-center" v-if="items.length">
    <div>Tiêu điểm</div>
    <div v-for="(item,i) in items" :key="i">
      <span
        @click="$router.push(`/tag/${item.name}`)"
        class="text-gray-600 hover:text-hovercolor cursor-pointer font-bold"
      >{{item.name}}</span>
      <span class="px-4 text-gray-600">{{items.length - i === 1 ? '' : '-'}}</span>
    </div>
  </div>-->
</template>

<script>
import mouseEvent from "@/mixins/mouseEvent";
import Container1440 from "@/components/containers/Container1440";
import SearchBar from "@/components/Search/SearchBar"
export default {
  mixins: [mouseEvent],
  components: {
    Container1440,
    SearchBar
  },
  data() {
    return {
      items: []
    };
  },
  async created() {
    await this.$store.dispatch("getTagList", {
      data: { isFeatured: true, skip: 0, limit: 50 },
      nextActions: res => {
        // this.items = [...res.result];
        this.items = Array(20).fill(...res.result);
      },
      errorActions: err => {
        console.log(err);
      }
    });
  }
};
</script>

<style scoped>
.bg-trending {
  background-color: #e8e8e8;
  font-size: 14px;
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scroll {
  overflow-x: scroll;
}
.trend-name {
 color : white
}
</style>
