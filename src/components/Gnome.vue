<template>
  <div class="gnome__container">
    <div class="gnome">
      <img src="~@/assets/gnome/gnome.png" alt="">

      <img class="gnome--animation gnome--ax" src="~@/assets/gnome/dwarf_ax.gif" alt="">
      <img class="gnome--animation gnome--head" src="~@/assets/gnome/dwarf_head.gif" alt="">
      <img class="gnome--animation gnome--shoulder" src="~@/assets/gnome/dwarf_shoulder.gif" alt="">
      <img class="gnome--animation gnome--нandcuff" src="~@/assets/gnome/dwarf_нandcuff.gif" alt="">

      <div class="gnome__monolog">
        <img src="~@/assets/gnome/monolog.png" alt="">

        <div class="gnome__monolog--text">
          <h3 class="t-a-c c-dark-grey">Вскрывай сундуки из моей сокровищницы! Ищи несметные богатства!</h3>
        </div>

        <button class="gnome__button btn" @click="play" :disabled="!countGames">Играть</button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';

@Options({
  computed: {
    ...mapState(['countGames']),
  },
})
export default class Gnome extends Vue {
  public play(): void {
    this.$store.commit('play');
  }
}
</script>

<style lang="scss">
.gnome {
  position: relative;
  z-index: 5;

  &__container {
    display: flex;
    align-items: center;

    margin: {
      right: -8%;
    };

    background: linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 67%);
  }

  &--animation {
    position: absolute;
  }

  &--ax {
    top: 195px;
    left: 113px;
  }

  &--head {
    top: 34px;
    left: 176px;
  }

  &--shoulder {
    top: 100px;
    right: 114px;
  }

  &--нandcuff {
    top: 120px;
    left: 125px;
  }

  &__monolog {
    position: absolute;
    top: 150px;

    &--text {
      position: absolute;
      bottom: 5px;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      text-align: center;

      overflow: hidden;

      padding: 40px 20px;

      height: 180px;
      width: 100%;
    }
  }

  &__button {
    position: absolute;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
