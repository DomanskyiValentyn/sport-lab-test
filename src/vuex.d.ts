import { Store } from 'vuex';

import { StoreState } from './interfaces/store.interface';
import { BasketStore } from './interfaces/basket.interface';

declare module '@vue/runtime-core' {
  interface State {
    countOpenedModal: number;
    countGames: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
