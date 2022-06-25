<template>
  <Main />
  <Sidebar />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Sidebar from '@/components/Sidebar.vue';
import Main from '@/components/Main.vue';

@Options({
  components: {
    Sidebar,
    Main,
  },
})
export default class App extends Vue {}
</script>
