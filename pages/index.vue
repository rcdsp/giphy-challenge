<template>
  <div>
    <div v-if="!activeSearch" class="gc-home-page">
      <div class="gc-home-section_title">
        <h3 class="gc-search-title"><TrendingIcon /> Trending</h3>
        <NuxtLink to="/trending" class="gc-text-label">
          All GIFs <font-awesome-icon icon="chevron-right" />
        </NuxtLink>
      </div>

      <div class="gc-trending-sampler">
        <Masonry :gifs="results" />
      </div>
    </div>
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
    if (this.activeSearch) {
      this.results = await this.$axios.$get('search', {
        params: {
          q: this.searchText,
          limit: 50,
          offset: 0,
          rating: 'g',
          lang: 'en',
        },
      });
    } else {
      this.results = await this.$axios.$get('trending');
    }
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
  methods: {
    async search(): Promise<GifResults> {
      return await this.$axios.$get('search', {
        params: {
          q: this.searchText,
          limit: 50,
          offset: 0,
          rating: 'g',
          lang: 'en',
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.gc-home-section_title {
  display: grid;
  grid-template-columns: 1fr 1fr;

  h3 {
    place-self: center start;
  }

  .gc-text-label {
    place-self: center end;
  }
}
</style>
