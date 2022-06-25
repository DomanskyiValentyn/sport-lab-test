<template>
  <div class="modal" :class="$props.class" :style="{ zIndex: 1499 + index}">
    <div class="modal__content" v-click-outside="closeModal">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
  props: {
    disabledClose: Boolean,
  },
  emits: {
    close: undefined,
  },
})
export default class BaseModal extends Vue {
  declare $props: {
    disabledClose: boolean,
  }

  public index = 0;

  public closeModal(): void {
    if (!this.$props.disabledClose && this.index === this.$store.state.countOpenedModal) {
      this.$emit('close');
    }
  }

  created(): void {
    this.$store.commit('changeCountOpenedModal', 1);
    this.index = this.$store.state.countOpenedModal;
  }

  mounted(): void {
    document.documentElement.classList.add('modal-open');
  }

  beforeUnmount(): void {
    this.$store.commit('changeCountOpenedModal', -1);

    if (this.$store.state.countOpenedModal === 0) {
      document.documentElement.classList.remove('modal-open');
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow-y: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: {
    top: 5.5rem;
    left: 2.75rem;
    right: 2.75rem;
    bottom: 1.75rem;
  };

  &::before {
    content: '';

    display: block;

    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    background-color: $dark_grey;

    opacity: 0.3;
  }

  &__content {
    width: auto;

    margin: auto;

    background-image: url('~@/assets/popup-bgi.png');
    background-size: cover;
    background-repeat: no-repeat;

    border-radius: 6px;

    min-height: 150px;
    min-width: 150px;

    padding: 20px;
  }
}
</style>
