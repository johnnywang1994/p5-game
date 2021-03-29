<template>
  <div class="view-home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>useP5 Tiny Game</h1>
    <div class="game-list">
      <router-link to="/shoot-virus">Shoot Virus</router-link>
      <router-link to="/bounce-ball">Bounce ball</router-link>
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
