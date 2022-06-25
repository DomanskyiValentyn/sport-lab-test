<template>
  <Torch />

  <Modal
    v-if="modal.result && status"
    class="status-try"
    @close="modal.result = false"
  >
    <div class="status-try__content">
      <span></span>
      <h2 class="t-a-c" v-html="text[status]"></h2>

      <button class="btn" @click="modal.result = false">Закрить</button>
    </div>
  </Modal>

  <main>
    <img class="logo" src="~@/assets/logo.png" alt="">

    <div class="chests">
      <template v-for="(chest, index) in 9" :key="index">
        <Chest :isOpen="index === chestOpen" :isEmpty="isEmpty" />
      </template>
    </div>

    <p class="description">Для игры Вам необходимо купить попытки, а затем нажать кнопку “ИГРАТЬ”</p>
  </main>

  <Gnome />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { WatchStopHandle } from '@vue/runtime-core';

import Modal from '@/components/base/Modal.vue';

import Chest from '@/components/Chest.vue';
import Torch from '@/components/Torch.vue';
import Gnome from '@/components/Gnome.vue';

@Options({
  components: {
    Modal,
    Chest,
    Torch,
    Gnome,
  },
  props: {

  },
})
export default class Main extends Vue {
  private subs!: WatchStopHandle;

  public isEmpty = true;

  public chestOpen = -1;

  public modal = {
    result: false,
  }

  private text = {
    win: 'Поздравляем! <br /> Вы выиграли.',
    lose: 'Не повезло! <br /> Попробуйте еще раз.',
  };

  public status: string | null = null;

  public play(): void {
    const rnd = Math.floor(Math.random() * 9);

    if (this.chestOpen === rnd) this.play();
    else {
      this.chestOpen = rnd;
      setTimeout(() => {
        this.isEmpty ? this.status = 'win' : this.status = 'lose';
        this.modal.result = true;
      }, 300);
    }
  }

  created(): void {
    this.subs = this.$store.subscribe((m) => {
      if (m.type === 'play') {
        this.isEmpty = !this.isEmpty;

        this.play();
      }
    });
  }

  unmounted(): void {
    this.subs();
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;
  z-index: 5;

  img.logo {
    height: 100%;
    max-height: 80px;

    width: 100%;
    max-width: 302px;

    margin: {
      bottom: 25px;
    };
  }

  .chests {
    display: grid;
    gap: 6px 12px;
    grid-template-columns: repeat(3, 1fr);
  }

  p.description {
    max-width: 400px;

    text-align: center;

    margin: {
      top: 20px;
      left: auto;
      right: auto;
    };
  }
}
</style>

<style lang="scss">
.status-try {
  .modal__content {
    width: 100%;
    max-width: 630px;
    height: 100%;
    max-height: 340px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    height: 100%;

    padding: 40px 0;
  }
}
</style>
