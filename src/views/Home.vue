<template>
  <div class="view-home">
    <img class="block mx-auto" alt="Vue logo" src="../assets/logo.png" />
    <h1 class="text-2xl font-bold">Tiny Game</h1>
    <div class="game-list">
      <router-link to="/shoot-virus">[Shoot Virus]</router-link>
      <router-link to="/bounce-ball">[Bounce ball]</router-link>
      <router-link to="/angry-bird-p5">[P5 Angry Bird]</router-link>
      <router-link to="/angry-bird">[Angry Bird]</router-link>
      <router-link to="/matter-mario">[Mario Bro 1]</router-link>
      <router-link to="/fabric-image-composer">[Fabric Image Composer]</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewHome',
};
</script>

<style lang="scss">
.view-home {
  .game-list {
    > a {
      margin: 0 4px;
    }
  }
}
</style>
