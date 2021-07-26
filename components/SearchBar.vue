<template>
  <form action="/" @submit.prevent="search(searchText)">
    <div class="gc-search_container">
      <input
        id="search"
        v-model="searchText"
        name="search"
        type="text"
        placeholder="Search all the GIFs"
        required
      />
      <div class="gc-search_button_back">
        <font-awesome-icon class="gc-search-icon_back" icon="search" />
        <button type="submit">
          <font-awesome-icon class="gc-search-icon" icon="search" />
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchBar',
  data() {
    return {
      searchText: this.$route.query.search,
    };
  },
  watch: {
    '$route.query.search': {
      handler(value) {
        if (value === undefined) {
          this.searchText = '';
          this.$store.dispatch('search', this.searchText);
        }
      },
    },
  },
  methods: {
    search() {
      this.$router.replace({ path: '/', query: { search: this.searchText } });
      this.$store.dispatch('search/makeSearch', this.searchText);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~assets/scss/_variables.scss';
.gc-search_container {
  display: grid;
  grid-template-columns: 1fr 5.2rem;
}

input {
  width: 100%;
  height: 5.2rem;
  border: none;
  border-radius: 0;
  font-size: 1.8rem;
  padding: 0 1.6rem;

  &::placeholder {
    color: lightgray;
  }

  &:focus {
    outline: none;
  }
}

// for background gradient effect
.gc-search_button_back {
  width: 5.2rem;
  height: 5.2rem;
  background: rgb(243, 0, 246);
  background: linear-gradient(
    45deg,
    rgba(243, 0, 246, 1) 0%,
    rgba(0, 255, 166, 1) 100%
  );
  position: relative;
}

// background icon
.gc-search_button_back > .gc-search-icon_back {
  z-index: 1;
  position: absolute;
  font-size: 3rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

// search button
button {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  background: rgb(243, 0, 246);
  background: linear-gradient(
    45deg,
    rgba(255, 12, 0, 1) 0%,
    rgba(243, 0, 246, 1) 100%
  );
  transition: opacity ease-in-out 0.2s;

  // fade to reveal background and fake transition
  &:hover {
    opacity: 0;
  }

  &:focus {
    outline: none;
  }

  .gc-search-icon {
    color: $color-text;
    display: inline;
    font-size: 3rem;
  }
}
</style>
