import { ActionContext } from 'vuex';
import { SearchStore } from '~/types/store';
import { GifResults } from '~/types/gifs';

export const state = () => ({
  searchText: '',
  results: {} as GifResults,
});

export const mutations = {
  updateSearchText(state: SearchStore, payload: string) {
    state.searchText = payload;
  },
  updateSearchResults(state: SearchStore, payload: GifResults) {
    state.results = payload;
  },
};

export const actions = {
  search(
    { commit }: ActionContext<SearchStore, SearchStore>,
    searchText: string
  ) {
    commit('updateSearchText', searchText);
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
