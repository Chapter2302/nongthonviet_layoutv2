<template>
  <Container1640 class="border-gray-200 border-b-2 border-solid bg-white min-w-full">
    <div class="flex">
      <div style="min-width: 180px" class="border-gray-200 border-r-2 border-solid text-right p-1">
        <InfinityList :subs="subs" @onHoverSub="onHoverSub" />
        <!-- <ul class="mt-2">
          <li
            v-for="(sub, i) in subs"
            :key="i"
            class="text-right; pb-3 text-base font-bold capitalize cursor-pointer dropMenuChildren"
          >
            <span
              @mouseover="onHoverSub(sub.id)"
              :class="sub.id === currentHoverId ? 'hover-item' : ''"
              @click="$router.push(`/category/${sub.alias}-id=${sub.id}`)"
            >{{ sub.name }}</span>
            <span
              @mouseover="openInfinityMenu(sub.subCates)"
              v-if="sub.subCates && sub.subCates.length"
            >
              <i class="fas fa-angle-down"></i>
            </span>
            <ul class="mt-2" v-if="sub.subCates && sub.subCates.length">
              <li
                v-for="(sub, i) in infinityMenu"
                :key="i"
                class="text-right; pb-3 text-base font-bold capitalize cursor-pointer dropMenuChildren"
              >
                <span
                  @mouseover="onHoverSub(sub.id)"
                  :class="sub.id === currentHoverId ? 'hover-item' : ''"
                  @click="$router.push(`/category/${sub.alias}-id=${sub.id}`)"
                  style="font-size : 14px"
                >{{ sub.name }}</span>
                <span
                  @click="openInfinityMenu(sub.subCates)"
                  v-if="sub.subCates && sub.subCates.length"
                >
                  <i class="fas fa-angle-down"></i>
                </span>
              </li>
            </ul>
          </li>
        </ul>-->
      </div>
      <div class="flex-grow ml-4 mt-4">
        <div class="grid grid-cols-12 gap-4 justify-center" v-if="currentPosts.length">
          <ColumnItem
            v-for="(post, i) in currentPosts"
            :post="post"
            :key="i"
            class="p-2 col-span-3"
          />
        </div>
        <div class="pl-2 pb-4 relative">
          <i
            @click="$emit('prev')"
            class="fas fa-arrow-left text-gray-500 mr-1 hover:text-hovercolor cursor-pointer"
            style="font-size : 20px;"
          ></i>
          <i
            @click="$emit('next')"
            class="fas fa-arrow-right text-gray-500 hover:text-hovercolor cursor-pointer"
            style="font-size : 20px;"
          ></i>
        </div>
      </div>
    </div>
  </Container1640>
</template>

<script>
import Container1640 from "@/components/containers/Container1640";
import ColumnItem from "@/components/BlockItem/ColumnItem";
import InfinityList from "@/components/NaviDesktop/InfinityList";

export default {
  components: {
    ColumnItem,
    Container1640,
    InfinityList
  },
  props: {
    subs: {
      type: Array,
      required: true
    },
    currentPosts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    onHoverSub(id) {
      this.$emit("onHoverSub", id);
    }
  }
};
</script>

<style scoped>
</style>
