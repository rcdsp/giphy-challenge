<template>
  <div class="gc-results-container">
    <h1>Trending</h1>
    <Masonry :gifs="gifs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GifResults } from '~/types/gifs';
export default Vue.extend({
  layout: 'giphy',
  data() {
    return {
      gifs: {} as GifResults,
    };
  },
  async fetch() {
    this.gifs = await this.$axios.$get('trending');
  },
  head: {
    title: 'Trending | Giphy Code Challenge',
  },
});
</script>
