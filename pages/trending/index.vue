<template>
  <div class="gc-results-container">
    <h1>Trending</h1>
    <Masonry :gifs="gifs"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'giphy',
  async asyncData({$axios}) {
    const gifs = await $axios.$get('trending');
    return { gifs }
  }
})
</script>
