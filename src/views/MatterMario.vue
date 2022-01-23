<template>
  <div class="view-matter-mario">
    <h1>
      Matterjs Mario Bro 1
    </h1>
    <small>
      <router-link to="/">
        Return Home
      </router-link>
    </small>
    <div>
      <button class="btn-primary" @click="startGame">Start</button>
    </div>
    <div
      class="vue-canvas"
      ref="csRef"
      @touchmove.prevent
    >
      <canvas id="my-mario"></canvas>
    </div>
    <h3>DISCLAIMER</h3>
    <p>This project is intended for non-commercial educational purposes.</p>
    <!-- Controller -->
    <div class="controller">
      <div class="left">
        <div class="btn-left"></div>
        <div class="btn-right"></div>
      </div>
      <div class="right">
        <div class="btn-jump"></div>
        <div class="btn-shoot"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
async function startGame() {
  await createMatterMario();
  window.transport.initFrontPage();
}
</script>

<style lang="scss">
#my-mario {
  display: block;
  width: 320px;
  height: 258px;
  margin: auto;
}

@media (min-width: 576px) {
  #my-mario {
    width: 520px;
    height: 420px;
  }
}

.controller {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  width: 350px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  user-select: none;
}

.controller .left,
.controller .right {
  position: relative;
  width: 100px;
  height: 100px;
  background: #ddd;
}

.controller .btn-jump:active,
.controller .btn-shoot:active,
.controller .btn-left:active,
.controller .btn-right:active {
  transform: scale(0.9);
}

.controller .btn-jump {
  position: absolute;
  right: 0;
  top: 10px;
  width: 50px;
  height: 50px;
  background: blue;
}

.controller .btn-shoot {
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 50px;
  height: 50px;
  background: yellow;
}

.controller .btn-left {
  position: absolute;
  top: 50%;
  left: 0;
  width: 50px;
  height: 50px;
  background: green;
}

.controller .btn-right {
  position: absolute;
  top: 50%;
  right: 0;
  width: 50px;
  height: 50px;
  background: brown;
}
</style>
