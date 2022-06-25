<template>
  <Torch />

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

import Chest from '@/components/Chest.vue';
import Torch from '@/components/Torch.vue';
import Gnome from '@/components/Gnome.vue';

@Options({
  components: {
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

  private text = {
    win: 'Поздравляем! Вы выиграли',
    lose: 'Не повезло! Попробуйте еще раз',
  };

  public play(): void {
    const rnd = Math.floor(Math.random() * 9);

    if (this.chestOpen === rnd) this.play();
    else {
      this.chestOpen = rnd;
      setTimeout(() => { this.isEmpty ? alert(this.text.win) : alert(this.text.lose); }, 300);
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
