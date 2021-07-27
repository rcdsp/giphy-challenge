<template>
  <div class="gc-home-page">
    <div v-if="!activeSearch" class="gc-home-section_title">
      <h3 class="gc-search-title"><TrendingIcon /> Trending</h3>
      <NuxtLink to="/trending" class="gc-text-label">
        All GIFs <font-awesome-icon icon="chevron-right" />
      </NuxtLink>
    </div>
    <h1 v-if="activeSearch" class="gc-search-title">{{ searchText }}</h1>
    <div class="gc-results-container">
      <Masonry :gifs="results" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { search } from '~/utils';

export default Vue.extend({
  layout: 'giphy',
  data() {
    return {
      searchLimit: 50,
      searchOffset: 0,
    };
  },
  async fetch() {
    if (this.activeSearch) {
      if (process.browser) {
        const results = await this.search(
          this.$axios,
          this.searchText,
          this.searchLimit,
          this.searchOffset
        );
        this.setSearch({ searchText: this.searchText, results });
      } else {
        const searchText = this.$route.query.search as string;
        const results = await this.search(
          this.$axios,
          searchText,
          this.searchLimit,
          this.searchOffset
        );
        this.setSearch({ searchText, results });
      }
    } else {
      const trending = await this.$axios.$get('trending');
      this.setResults(trending);
    }
  },
  head() {
    return {
      title:
        this.searchText !== ''
          ? `Gifs of ${this.$route.query.search} search | Giphy Code Challenge`
          : 'Giphy Code Challenge',
    };
  },
  computed: {
    ...mapGetters({
      searchText: 'search/getSearchText',
      results: 'search/getSearchResults',
    }),
    activeSearch(): boolean {
      if (process.browser) {
        return this.searchText !== '';
      } else {
        return this.$route.query.search !== undefined;
      }
    },
  },
  watch: {
    searchText() {
      this.$fetch();
    },
  },
  mounted() {
    if (process.browser) {
      window.onscroll = () => {
        if (
          window.innerHeight + window.pageYOffset >= document.body.offsetHeight
        ) {
          this.paginate();
        }
      };
    }
  },
  methods: {
    search, // map generic search to this component's search
    ...mapActions({
      setSearch: 'search/setSearch',
      setSearchText: 'search/setSearchText',
      setResults: 'search/setResults',
      addResults: 'search/addResults',
    }),
    async paginate() {
      this.searchOffset++;
      const newOffset = this.searchLimit * (this.searchOffset);
      const nextBatch = await this.search(
        this.$axios,
        this.searchText,
        this.searchLimit,
        newOffset
      );
      this.addResults(nextBatch.data);
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
