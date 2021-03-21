<template>
  <ul class="mt-2">
    <li
      v-for="(sub, i) in subs"
      :key="i"
      class="text-right; pb-3 text-base font-bold capitalize cursor-pointer dropMenuChildren"
    >
      <span
        @mouseover="onHoverSub(sub.id)"
        :class="sub.id === currentHoverId && onHover ? 'hover-item' : ''"
        @click="$router.push(`/category/${sub.alias}-id=${sub.id}`), $emit('closeSideOnMobile')"
      >{{ sub.name }}</span>
      <!-- level menu-->
      <span @click="onHoverIconDown(sub)" v-if="sub.subCates && sub.subCates.length">
        <i class="fas fa-angle-down"></i>
      </span>
      <infinity-list
        class="childrenCate"
        v-if="openChildren && currentHoverId === sub.id"
        @onHoverSub="onHoverSub(sub.id)"
        :subs="sub.subCates"
        @closeSideOnMobile="$emit('closeSideOnMobile')"
      />
    </li>
  </ul>
</template>

<script>
import InfinityList from "@/components/NaviDesktop/InfinityList";
export default {
  name: "infinity-list",
  components: {
    "infinity-list": InfinityList
  },
  data() {
    return {
      currentHoverId: "",
      openChildren: false,
      onHover: false
    };
  },
  props: {
    subs: {
      type: Array,
      required: true
    }
  },
  methods: {
    onHoverSub(id) {
      this.$emit("onHoverSub", id);
      this.currentHoverId = id;
      this.onHover = true;
      if (this.currentHoverId !== id) {
        this.openChildren = false;
      }
    },
    onHoverIconDown(sub) {
      this.currentHoverId = sub.id;
      this.openChildren = !this.openChildren;
    }
  }
};
</script>
<style scoped>
.hover-item {
  color: var(--hovercolor);
}
@media (max-width: 767px) {
  .childrenCate {
    padding-left: 20px;
  }
}
</style>