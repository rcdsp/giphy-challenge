import createPersistedState from 'vuex-persistedstate'
import { Store } from "vuex";
import { SearchStore } from '~/types/store';
const Cookies = require('js-cookie')
const cookie = require('cookie');

export default ({store, req, isDev}: {store: Store<SearchStore>, req: any, isDev: boolean }) => {
  createPersistedState({
      storage: {
        getItem: (key: string) => process.client ? Cookies.get(key) : cookie.parse(req.headers.cookie||'')[key],
        setItem: (key: string, value: any) => Cookies.set(key, value, { expires: 365, secure: !isDev }),
        removeItem: (key: string) => Cookies.remove(key)
      }
  })(store)
}
