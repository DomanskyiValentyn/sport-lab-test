<template>
  <div class="chest__container">
    <img v-show="open === CHEST_OPEN.close" src="~@/assets/chest/chest_Close.png" alt="">

    <template v-if="!isEmpty">
      <img v-show="open === CHEST_OPEN.half" src="~@/assets/chest/chest_Open_Empty_half.png" alt="">
      <img v-show="open === CHEST_OPEN.open" src="~@/assets/chest/chest_Open_Empty.png" alt="">
    </template>

    <template v-else>
      <img v-show="open === CHEST_OPEN.half" src="~@/assets/chest/chest_Open_Gold_half.png" alt="">
      <img v-show="open === CHEST_OPEN.open" src="~@/assets/chest/chest_Open_Gold.png" alt="">
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

enum CHEST_OPEN {
  close = 'close',
  half = 'half',
  open = 'open',
}

@Options({
  components: {

  },
  props: {
    isOpen: Boolean,
    isEmpty: Boolean,
  },
})
export default class Chest extends Vue {
  declare $props: {
    isOpen: boolean;
  }

  public CHEST_OPEN = CHEST_OPEN;

  get open(): CHEST_OPEN {
    return this.$props.isOpen ? CHEST_OPEN.open : CHEST_OPEN.close;
  }
}
</script>

<style lang="scss">
.chest__container{
  @include strict_size(160px, 160px);

  background-image: url('~@/assets/chest-bgi.png');
  background-size: cover;

  padding: {
    left: 20px;
    right: 20px;
    top: 20px;
    bottom: 2px;
  };

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
