<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
#app {
  text-align: center;
  user-select: none;
  font-family: Roboto, Arial, Helvetica, 'Droid Sans', sans-serif;
}

.vue-canvas {
  position: relative;
  display: inline-block;
  margin: 40px 0;
  > canvas {
    display: block;
    border: 1px solid;
    margin: auto;
    cursor: none;
  }
  &::after {
    content: '';
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.75);
    pointer-events: none;
  }
  &.paused::after {
    display: block;
  }
}
</style>
