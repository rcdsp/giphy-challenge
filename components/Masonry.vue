<template>
  <div class="gc-masonry_grid">
    <grid-gif v-for="gif in gifs.data" :key="gif.id" :gif="gif" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GifResults } from '~/types/gifs';
import GridGif from '~/components/GridGif.vue';

export default Vue.extend({
  components: {
    GridGif,
  },
  props: {
    gifs: {
      type: Object as () => GifResults,
      default: Object as () => {},
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';
.gc-masonry_grid {
  columns: 4 248px;
  column-gap: 1.6rem;

  > div {
    width: 100%;
    margin: 0 1rem 1rem 0;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-family: system-ui;
    font-weight: 900;
    font-size: 2rem;
  }
}
</style>
