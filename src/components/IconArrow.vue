<!-- eslint-disable max-len -->
<template>
  <svg class="icon-arrow" :class="direction" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M165.647 256.119L388.14 33.6265C395.831 25.9336 395.831 13.4615 388.14 5.76853C380.446 -1.92209 367.975 -1.92209 360.282 5.76853L123.86 242.19C116.17 249.883 116.17 262.355 123.86 270.048L360.282 506.469C368.108 514.028 380.581 513.811 388.14 505.984C395.513 498.349 395.513 486.245 388.14 478.611L165.647 256.119Z" fill="black"/>
  </svg>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {

  },
  props: {
    direction: String,
  },
})
export default class IconArrow extends Vue {
  declare $props: {
    direction: string;
  }
}
</script>

<style lang="scss">
.icon-arrow {
  @include rotate_element;
}
</style>
