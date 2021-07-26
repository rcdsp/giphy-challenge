<template>
  <div class="gc-gif-container">
    <NuxtLink :to="`/gif/${gif.id}`">
      <picture>
        <source :srcset="rendition.webp" type="image/webp" />
        <img :src="rendition.url" :alt="gif.title" />
      </picture>
      <div class="gc-gif-overlay_top">
        <font-awesome-icon icon="link" />
        <font-awesome-icon icon="heart" />
      </div>
      <div v-if="author" class="gc-gif-overlay_bottom with_user">
        <img
          class="gc-user-avatar"
          :src="author.avatar_url"
          :alt="author.display_name"
        />
        <p class="gc-user-name">
          {{ author.display_name }}
          <font-awesome-icon icon="check-circle" />
        </p>
      </div>
      <div v-else class="gc-gif-overlay_bottom without_user">
        <p class="gc-gif-title">{{ gif.title }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Gif, GifUser, FixedWidthSmall } from '~/types/gifs';
export default Vue.extend({
  name: 'GridGif',
  props: {
    gif: {
      type: Object as () => Gif,
      default: Object as () => Gif,
    },
  },
  computed: {
    rendition(): FixedWidthSmall {
      return this.gif.images.fixed_width_small;
    },
    author(): GifUser {
      return this.gif.user;
    },
  },
});
</script>

<style lang="scss" scoped>
.gc-gif-container {
  @import '~assets/scss/_variables.scss';
  position: relative;
  border-radius: 0.3rem;
  overflow: hidden;

  &:nth-child(5n + 1) {
    background-color: $color-giphy_1;
  }

  &:nth-child(5n + 2) {
    background-color: $color-giphy_2;
  }

  &:nth-child(5n + 3) {
    background-color: $color-giphy_3;
  }

  &:nth-child(5n + 4) {
    background-color: $color-giphy_4;
  }

  &:nth-child(5n + 5) {
    background-color: $color-giphy_5;
  }

  img {
    width: 100%;
    height: auto;
  }

  .gc-gif-overlay_top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: 0.5rem;
    display: grid;
    place-content: end;
    grid-template-columns: repeat(2, max-content);
    gap: 1rem;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity ease-in-out 0.2s;

    img {
      width: 1.6rem;
      height: auto;
    }
  }

  &:hover .gc-gif-overlay_top {
    opacity: 1;
  }

  .gc-gif-overlay_bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0.5rem;
    display: grid;
    place-content: start;
    place-items: center start;
    grid-template-columns: max-content minmax(max-content, 1fr);
    gap: 1rem;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity ease-in-out 0.2s;
  }

  .with_user {
    .gc-user-avatar {
      width: 3.2rem;
      height: 3.2rem;
    }

    .gc-user-name {
      font-size: 1.7rem;
      font-weight: 700;
      color: $color-text;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .gc-user-verified {
      display: inline;
      vertical-align: middle;
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  .without_user .gc-gif-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: $color-text;
  }

  &:hover .gc-gif-overlay_bottom {
    opacity: 1;
  }

  .masonry-with-columns {
    columns: 6 200px;
    column-gap: 1rem;
    div {
      width: 150px;
      background: #ec985a;
      color: white;
      margin: 0 1rem 1rem 0;
      display: inline-block;
      width: 100%;
      text-align: center;
      font-family: system-ui;
      font-weight: 900;
      font-size: 2rem;
    }
  }
}
</style>
