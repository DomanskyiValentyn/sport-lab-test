<template>
  <div class="torch__container">
    <div class="torch">
      <canvas ref="canvas" id="fire"></canvas>
      <img src="~@/assets/torch.png" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import fire from '@/fire-torch';

@Options({
})
export default class Torch extends Vue {
  declare $refs: {
    canvas: HTMLCanvasElement;
  }

  mounted(): void {
    fire();
  }
}
</script>

<style lang="scss">
.torch {
  &__container {
    display: flex;
    align-items: center;
  }

  @include strict_size(500px, 354px);

  position: relative;

  canvas {
    position: absolute;
    top: 20px;
    left: 0;

    width: 300px !important;
    height: 230px !important;
  }
}
</style>
