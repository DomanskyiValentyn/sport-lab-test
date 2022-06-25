import { createApp } from 'vue';

import vClickOutside from 'click-outside-vue3';

import App from './App.vue';
import store from './store';

import 'normalize.css';
import '@/style/style.scss';

const APP = createApp(App);

APP
  .use(vClickOutside)
  .use(store)
  .mount('body');
