import { ActionContext } from 'vuex';
import { Gif, GifResults } from '~/types/gifs';
import { SearchStore } from '~/types/store';

export const state = (): SearchStore => {
  return {
    searchText: '',
    results: {} as GifResults,
  };
};

export const mutations = {
  updateSearchText(state: SearchStore, payload: string) {
    state.searchText = payload;
  },
  updateSearchResults(state: SearchStore, payload: GifResults) {
    state.results = payload;
  },
  appendSearchResults(state: SearchStore, payload: Gif[]) {
    state.results = {
      data: [...state.results.data, ...payload],
      pagination: state.results.pagination,
      meta: state.results.meta,
    };
  },
};

export const actions = {
  // Set new search and results
  setSearch(
    { commit }: ActionContext<SearchStore, SearchStore>,
    { searchText, results }: SearchStore
  ) {
    commit('updateSearchText', searchText);
    commit('updateSearchResults', results);
  },
  // Set new search text
  setSearchText(
    { commit }: ActionContext<SearchStore, SearchStore>,
    searchText: string
  ) {
    commit('updateSearchText', searchText);
  },
  // Set new results
  setResults(
    { commit }: ActionContext<SearchStore, SearchStore>,
    results: GifResults
  ) {
    commit('updateSearchResults', results);
  },
  addResults({ commit }: ActionContext<SearchStore, SearchStore>, gifs: Gif[]) {
    commit('appendSearchResults', gifs);
  },
};

export const getters = {
  getSearchText: (state: SearchStore) => {
    return state.searchText;
  },
  getSearchResults: (state: SearchStore) => {
    return state.results;
  },
};
