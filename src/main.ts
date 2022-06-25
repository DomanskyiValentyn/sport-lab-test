import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import 'normalize.css';
import '@/style/style.scss';

const APP = createApp(App);

APP
  .use(store)
  .mount('body');
