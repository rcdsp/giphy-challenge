<template>
  <div class="gc-gif-detail_container">
    <!-- AUTHOR SIDEBAR -->
    <aside class="gc-gif-detail_side_l">
      <section v-if="author">
        <!-- user badge -->
        <div class="gc-user_badge">
          <img
            class="gc-user_badge-avatar"
            :src="author.avatar_url"
            :alt="author.display_name"
          />
          <a :href="author.profile_url" target="_blank">
            <p class="gc-user_badge-name">
              {{ author.display_name }}
              <font-awesome-icon icon="check-circle" />
            </p>
          </a>
        </div>
        <p class="gc-user_description">{{ author.description }}</p>
        <!-- social -->
        <div v-if="hasSocial" class="gc-user_social">
          <p class="gc-text-label">Follow on:</p>
          <a
            v-if="author.facebook_url"
            :href="author.facebook_url"
            target="_blank"
            rel="noopener noreferrer"
            class="fb"
          ></a>
          <a
            v-if="author.instagram_url"
            :href="author.instagram_url"
            target="_blank"
            rel="noopener noreferrer"
            class="ig"
          ></a>
          <a
            v-if="author.twitter_url"
            :href="author.twitter_url"
            target="_blank"
            rel="noopener noreferrer"
            class="tw"
          ></a>
        </div>
      </section>
      <!-- source link -->
      <div class="gc-gif-source">
        <p class="gc-text-label">Source:</p>
        <a :href="getSource(gif)" target="_blank">
          <font-awesome-icon icon="share-square" />
          {{ getSource(gif, (firendly = true)) }}
        </a>
      </div>
    </aside>
    <!-- GIF DISPLAY -->
    <div class="gc-gif-detail_main">
      <a :href="gif.url" target="_blank">
        <h1>{{ gif.title }}</h1>
      </a>

      <video
        :width="rendition.width"
        :height="rendition.height"
        :src="rendition.mp4"
        :alt="gif.title"
        autoplay
        loop
        playsinline
        :poster="rendition.url"
      >
        <img
          :src="rendition.url"
          title="Your browser does not support the <video> tag"
        />
      </video>
    </div>
    <!-- DETAILS SIDEBAR -->
    <aside class="gc-gif-detail_side_r">
      <section class="gc-gif-sharing"></section>
      <section class="gc-gif-details">
        <p class="gc-text-label">
          Dimensions: <span>{{ renditionDimensions }}</span>
        </p>
        <p class="gc-text-label">
          Uploaded: <span>{{ dateCreated }}</span>
        </p>
        <p class="gc-text-label">
          Size: <span>{{ renditionSize }}</span>
        </p>
        <p class="gc-text-label">
          Rating: <span>{{ gif.rating.toUpperCase() }}</span>
        </p>
        <p class="gc-text-label">
          Frames: <span>{{ rendition.frames }}</span>
        </p>
      </section>
      <section class="gc-gif-tags"></section>
    </aside>
    <!-- GIF TAGS -->
    <section class="gc-gif-tags">
      <div v-for="tag in tags" :key="tag.id" class="gc-gif-tag">
        <span>{{ tag.value }}</span>
      </div>
    </section>
    <!-- RELATED GIFS -->
    <section class="gc-gif-related_gifs">
      <Masonry :gifs="related" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import { friendlyUrl, formatBytes } from '~/utils';
import { Gif, GifUser, Original } from '~/types/gifs';

export default Vue.extend({
  layout: 'giphy',
  async asyncData({ $axios, route }) {
    const gif = await $axios.$get(route.params.id);
    const related = await $axios.$get('search', {
      params: {
        q: gif.data.title,
        limit: 25,
        offset: 0,
        rating: 'g',
        lang: 'en',
      },
    });
    return {
      gif: gif.data,
      gif_meta: gif.meta,
      related,
    };
  },
  data() {
    return {
      gif: {} as Gif,
    };
  },
  head() {
    return {
      title: this.$data.gif.title,
    };
  },
  computed: {
    tags(): any[] {
      // TODO find out where to get gif tags on giphy dev guides.
      // api does not seem to provide tags for gif on the response, to fill section i splitted the title into words to act as tags.
      const tags = this.gif.title.split(' ');
      return tags.map((t, i) => ({ id: `${i}-${t}`, value: `#${t}` }));
    },
    rendition(): Original {
      return this.gif.images.original;
    },
    renditionDimensions(): string {
      return `${this.rendition.width} x ${this.rendition.height} px`;
    },
    renditionSize(): string {
      return formatBytes(this.rendition.webp_size);
    },
    hasSocial(): boolean {
      return (
        this.gif.user.facebook_url !== undefined ||
        this.gif.user.instagram_url !== undefined ||
        this.gif.user.twitter_url !== undefined
      );
    },
    dateCreated(): string {
      return moment(this.gif.import_datetime).calendar();
    },
    author(): GifUser {
      return this.gif.user;
    },
  },
  methods: {
    getSource(gif: Gif, friendly = false) {
      const source = gif.user?.website_url || gif.source;
      return friendly ? friendlyUrl(source) : source;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~assets/scss/_variables.scss';

.gc-gif-detail_container {
  display: grid;
  grid-template-columns: 23.2rem 1fr 23.2rem;
  grid-template-rows: auto;
  grid-template-areas:
    'sidebar gif detail'
    'sidebar tags tags'
    'sidebar related related';
  gap: 3.2rem;

  .gc-gif-detail_side_l {
    grid-area: sidebar;
    padding: 1.6rem 0;

    .gc-user_badge {
      display: grid;
      grid-template-columns: max-content max-content 1.6rem;
      gap: 1rem;

      &-avatar {
        width: 5rem;
        height: 5rem;
      }

      &-name {
        font-size: 1.7rem;
        font-weight: 700;
        color: $color-text;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &-verified {
        display: inline;
        vertical-align: middle;
        width: 1.6rem;
        height: 1.6rem;
      }
    }

    .gc-user_description {
      font-size: 1.4rem;
      color: $color-text_dimmed;
    }

    .gc-user_social {
      a {
        display: block;
        width: 2.4rem;
        height: 2.4rem;
        background-size: contain !important;

        &.fb {
          background: url('~assets/icons/facebook@3x.png') no-repeat center
            center;
        }

        &.ig {
          background: url('~assets/icons/instagram@3x.png') no-repeat center
            center;
        }

        &.tw {
          background: url('~assets/icons/twitter@3x.png') no-repeat center
            center;
        }
      }
    }

    .gc-gif-source {
      a {
        display: inline-block;
        font-size: 1.6rem;
        font-weight: 700;
        color: $color-text;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .gc-gif-detail_main {
    grid-area: gif;

    h1 {
      font-size: 1.6rem;
      color: $color-text_dimmed;
    }
  }

  .gc-gif-detail_side_r {
    grid-area: detail;

    span {
      font-weight: 400;
      color: $color-text;
    }
  }

  .gc-gif-tags {
    grid-area: tags;
    display: flex;
    flex-direction: row;
    gap: 1rem;

    .gc-gif-tag {
      display: block;
      padding: 1.2rem 1.8rem;
      border-radius: 2.5rem;
      background-color: $color-layout_container;
      color: $color-text;

      &:hover {
        background-color: lighten($color-layout_container, 10%);
        color: $color-giphy_1;
      }

      span {
        color: inherit;
        text-transform: lowercase;
        font-size: 1.6rem;
        font-weight: 700;
        font-style: italic;
      }
    }
  }

  .gc-gif-related_gifs {
    grid-area: related;
  }
}
</style>
