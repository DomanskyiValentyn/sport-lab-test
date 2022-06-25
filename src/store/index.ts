import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    countGames: 0,
    gnomeText: '',
  },
  mutations: {
    addCountGame(state, payload: number): void {
      state.countGames += payload;
    },
    play(state): void {
      state.countGames -= 1;
    },
  },
  getters: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({ key: 'session' })],
});
