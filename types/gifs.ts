enum Rating {
  G = 'g',
  PG = 'pg',
  PG13 = 'pg-13',
  R = 'r',
}

/* -------------------------------------------------------------------------- */
/*                           Rendition objects start                          */
/* -------------------------------------------------------------------------- */
type SizedRendition = {
  height: string;
  width: string;
};

type BaseRendition = SizedRendition & {
  size: string;
  url: string;
};

type WEBPRendition = {
  webp: string;
  'webp_size': string;
};

type MP4Rendition = {
  mp4: string;
  'mp4_size': string;
};

export type Original = BaseRendition &
  WEBPRendition &
  MP4Rendition & {
    frames: string;
    hash: string;
  };
/* -------------------------------------------------------------------------- */
/*                            Rendition objects end                           */
/* -------------------------------------------------------------------------- */

export type Downsized = BaseRendition;
export type DownsizedLarge = BaseRendition;
export type DownsizedMedium = BaseRendition;
export type DownsizedSmall = MP4Rendition & SizedRendition;
export type FixedHeightStill = BaseRendition;
export type DownsizedStill = BaseRendition;
export type FixedHeightSmallStill = BaseRendition;
export type FixedHeightDownsampled = BaseRendition & WEBPRendition;
export type FixedHeight = BaseRendition & WEBPRendition & MP4Rendition;
export type FixedHeightSmall = BaseRendition & WEBPRendition & MP4Rendition;
export type FixedWidth = BaseRendition & WEBPRendition & MP4Rendition;
export type FixedWidthDownsampled = BaseRendition & WEBPRendition;
export type FixedWidthSmall = BaseRendition & WEBPRendition & MP4Rendition;
export type FixedWidthSmallStill = BaseRendition;
export type FixedWidthStill = BaseRendition;
export type Looping = MP4Rendition;
export type OriginalStill = BaseRendition;
export type OriginalMp4 = MP4Rendition & SizedRendition;
export type Preview = MP4Rendition & SizedRendition;
export type PreviewGif = BaseRendition;
export type PreviewWebp = BaseRendition;
export type WStill480 = BaseRendition;

type Renditions = {
  original: Original;
  downsized: Downsized;
  'downsized_large': DownsizedLarge;
  'downsized_medium': DownsizedMedium;
  'downsized_small': DownsizedSmall;
  'downsized_still': DownsizedStill;
  'fixed_height': FixedHeight;
  'fixed_height_downsampled': FixedHeightDownsampled;
  'fixed_height_small': FixedHeightSmall;
  'fixed_height_small_still': FixedHeightSmallStill;
  'fixed_height_still': FixedHeightStill;
  'fixed_width': FixedWidth;
  'fixed_width_downsampled': FixedWidthDownsampled;
  'fixed_width_small': FixedWidthSmall;
  'fixed_width_small_still': FixedWidthSmallStill;
  'fixed_width_still': FixedWidthStill;
  looping: Looping;
  'original_still': OriginalStill;
  'original_mp4': OriginalMp4;
  preview: Preview;
  'preview_gif': PreviewGif;
  'preview_webp': PreviewWebp;
  '480w_still': WStill480;
};

export type GifUser = {
  username: string;
  description: string;
  'avatar_url': string;
  'banner_image': string;
  'banner_url': string;
  'profile_url': string;
  'display_name': string;
  'facebook_url': string;
  'instagram_url': string;
  'twitter_url': string;
  'website_url': string;
  'is_verified': boolean;
};

export type Gif = {
  type: string;
  id: string;
  url: string;
  slug: string;
  user: GifUser;
  username: string;
  source: string;
  title: string;
  rating: Rating;
  images: Renditions;
  'bitly_gif_url': string;
  'bitly_url': string;
  'embed_url': string;
  'content_url': string;
  'source_tld': string;
  'source_post_url': string;
  'is_sticker': number;
  'import_datetime': Date;
  'trending_datetime': Date;
  'analytics_response_payload': string;
  analytics: any;
};

export type GifResults = {
  data: Gif[],
  pagination: {
    'total_count': number,
    count: number,
    offset: number
  },
  meta: {
    status: number,
    msg: string,
    'response_id': string
  }
};
