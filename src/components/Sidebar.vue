<template>
  <aside>
    <div class="controller">
      <p class="c-grey m-bottom-40">1 игра = {{ pricePerOneGame }} $</p>

      <h2 class="m-bottom-15">Вам доступно:</h2>
      <div class="controller__info m-bottom-30">
        <p class="c-grey">Игр</p>
        <p class="c-yellow">{{ countGames }}</p>
      </div>

      <h2 class="m-bottom-15">Покупка:</h2>
      <div class="controller__info">
        <p class="c-grey">Игр</p>

        <div class="controller__count">
          <p class="c-yellow">{{ countPayGame }}</p>

          <div class="controller__buttons">
            <button @click="countPayGame += 1"><IconArrow direction="top"/></button>
            <button @click="removeGame"><IconArrow direction="bottom" /></button>
          </div>
        </div>
      </div>
      <div class="controller__info m-top-20">
        <p class="c-grey">Сумма:</p>
        <p class="c-yellow">{{ pricePerOneGame * countPayGame }} <span class="c-grey">$</span></p>
      </div>

      <button class="btn gold m-top-40" @click="pay" :disabled="!countPayGame">Купить</button>
    </div>
  </aside>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';

import IconArrow from '@/components/IconArrow.vue';

@Options({
  components: {
    IconArrow,
  },
  computed: {
    ...mapState(['countGames']),
  },
})
export default class Sidebar extends Vue {
  public pricePerOneGame = 5;

  public countPayGame = 0;

  public removeGame(): void {
    if (this.countPayGame > 0) this.countPayGame -= 1;
  }

  public pay(): void {
    this.$store.commit('addCountGame', this.countPayGame);

    this.countPayGame = 0;
  }
}
</script>

<style lang="scss">
aside {
  position: relative;
  z-index: 5;

  display: flex;
  align-items: center;

  height: 100%;

  width: 100%;
  max-width: 700px;

  background-image: url('~@/assets/sidebar.png');
  background-position: 100% 90%;
  background-repeat: no-repeat;

  padding: {
    left: 40px;
  };

  .controller {
    background-image: url('~@/assets/sidebar-controller.jpg');
    background-size: cover;
    background-repeat: no-repeat;

    border-radius: 6px;

    overflow: hidden;

    @include strict_size(508px, 281px);

    padding: {
      top: 115px;
      left: 20px;
      right: 25px;
    };

    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__count {
      display: flex;
      align-items: center;
    }

    &__buttons {
      display: flex;
      flex-direction: column;

      margin: {
        left: 4px;
      };

      button {
        @include strict_size(10px, 10px);

        opacity: 0.5;

        svg {
          width: 100%;
          height: 100%;

          path {
            fill: white;
          }
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
