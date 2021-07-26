<template>
  <div>
    <div v-if="activeSearch" class="gc-results-container">
      <h1 class="gc-search-title">{{ searchText }}</h1>
      <Masonry :gifs="results" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GifResults } from '~/types/gifs';

export default Vue.extend({
  layout: 'giphy',
  data() {
    return {
      results: {} as GifResults,
    };
  },
  async fetch() {
    this.results = await this.$axios.$get('search', {
      params: {
        q: this.searchText,
        limit: 25,
        offset: 0,
        rating: 'g',
        lang: 'en',
      },
    });
  },
  computed: {
    searchText(): string {
      return this.$route.query?.search || this.$store.getters.getSearchText;
    },
    activeSearch(): boolean {
      return this.$route.query?.search !== undefined && this.searchText !== '';
    },
  },
  watch: {
    searchText(newSearchText, oldSearchText) {
      if (newSearchText !== oldSearchText) {
        this.$fetch();
      }
    },
  },
});
</script>
