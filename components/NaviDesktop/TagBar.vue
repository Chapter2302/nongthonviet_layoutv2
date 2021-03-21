<template>
  <div class="h-12 border-gray-200 border-t-2 border-b-2 border-solid flex">
    <Container1440 class="flex items-center h-full overflow-x-hidden">
      <span
        @click="$router.push(`/`)"
        class="text-gray-600 hover:text-hovercolor cursor-pointer font-bold mr-3"
      >
        <i class="fas fa-home"></i>
      </span>
      <div
        class="hide-scroll flex"
        ref="scrollable"
        @mousewheel="onMousewheel"
        @mousedown="onMousedown"
        @mouseleave="onMouseleave"
        @mouseup="onMouseup"
        @mousemove="onMousemove"
      >
        <nuxt-link
          :to="`/category/${tag.alias}-id=${tag.id}`"
          v-for="(tag, i) in menuTags"
          :key="i"
          class="tag px-3 sm:px-2 font-bold sm:text-xs md:text-sm lg:text-md hover:text-hovercolor uppercase"
        >
          <span @mouseover="onHoverTag(tag.subCates, tag.id)" class="tagDetail">
            {{ tag.name }}
            <span v-if="tag.subCates.length">
              <i class="fas fa-angle-down"></i>
            </span>
          </span>
        </nuxt-link>
      </div>
    </Container1440>
  </div>
</template>

<script>
import Container1440 from "@/components/containers/Container1440";
import mouseEvent from "@/mixins/mouseEvent";
export default {
  mixins: [mouseEvent],
  components: {
    Container1440
  },
  data() {
    return {};
  },
  props: {
    menuTags: {
      type: Array,
      required: true
    }
  },
  methods: {
    onHoverTag(subs, id) {
      if (subs && subs.length) {
        this.$emit("onHover", subs, id);
      } else {
        this.$emit("onLeaveHovered");
      }
    }
  }
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
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
@media (max-width: 1018px) and (min-width: 768px) {
  .tag {
    font-size: 11px;
    white-space: nowrap;
  }
}
@media (max-width: 1140px) and (min-width: 1019px) {
  .tag {
    font-size: 13px;
    white-space: nowrap;
  }
}
@media (min-width: 1141px) {
  .tag {
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
