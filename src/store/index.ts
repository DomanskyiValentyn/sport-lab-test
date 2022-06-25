import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    countOpenedModal: 0,
    countGames: 0,
  },
  mutations: {
    changeCountOpenedModal(state, payload: number): void {
      state.countOpenedModal += payload;
    },
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
