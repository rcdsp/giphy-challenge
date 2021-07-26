import { ActionContext } from 'vuex';
import { SearchStore } from '~/types/store';

export const state = () => ({
  searchText: '',
});

export const mutations = {
  updateSearchText(state: SearchStore, payload: string) {
    state.searchText = payload;
  },
};

export const actions = {
  makeSearch(
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
};
