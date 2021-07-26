import { GifResults } from '~/types/gifs';

export type SearchStore = {
  searchText: string;
  results: GifResults;
};
