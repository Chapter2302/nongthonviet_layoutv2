<template>
  <div>
    <AdsBlock class="mt-10" />

    <div class="author-block mt-5">
      <Container1240>
        <div class="author-block__wrapper">
          <Author />
        </div>
      </Container1240>
    </div>

    <MainBlock class="mt-10" />
  </div>
</template>

<script>
// components

import AdsBlock from "../../components/CategoryPage/AdsBlock/AdsBlock.vue";
import MainBlock from "../../components/CategoryPage/MainBlock/MainBlock.vue";
import Author from "../../components/Author/Author.vue";
import Container1240 from "../../components/containers/Container1240.vue";

export default {
  components: {
    AdsBlock,
    MainBlock,
    Author,
    Container1240
  }
};
</script>

<style scoped>
.author-block__wrapper {
  width: 60%;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .author-block__wrapper {
    width: 80%;
  }
}
</style>
