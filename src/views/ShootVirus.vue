<template>
  <div class="shoot-virus">
    <h1 class="text-2xl font-bold">
      P5-hook Shoot-Virus
    </h1>
    <small>
      <router-link class="text-blue-500" to="/">
        Return Home
      </router-link>
    </small>
    <h3>Best Score: {{ bestScore }}</h3>
    <div v-if="userLife > 0">You Points: {{ point }}, Life: {{ userLife }}</div>
    <div v-else>Game Over!!</div>
    <div v-if="initialized">
      <button class="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md mr-2" @click="restartGame">Restart</button>
      <button class="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md" @click="stopGame">Pause</button>
    </div>
    <div v-else>
      <button class="bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded-md" @click="startGame">Start</button>
    </div>
    <div :class="['vue-canvas', { paused }]" ref="csRef" @touchmove.prevent />
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { useP5, createProcess, createParticle } from 'p5-hook'

const childWidth = 80;
const deathWidth = 200;
let virusProcess, clickProcess, childProcess, deathProcess, shootCursor;

function onMountCanvas({ paused, addPoint, costLife }) {
  virusProcess = createProcess({
    draw(p, { width, height }) {
      const { items } = this;
      const babyPos = {
        left: (width - childWidth) / 2,
        right: (width - childWidth) / 2 + childWidth,
        top: height - 100,
      };
      for (let i = 0; i < items.length; i++) {
        const virus = items[i];
        const { position } = virus;
        virus.run();
        // outside canvas
        if (position.x < 0 || position.x > width || position.y > height) {
          virus.position.set(p.random(width), -30);
          virus.options.opacity = p.random(1);
        }
        // hit baby
        if (position.x > babyPos.left && position.x < babyPos.right && position.y > babyPos.top) {
          virus.position.set(p.random(width), -30);
          costLife();
        }
      }
    },
    on: {
      preload(e, p) {
        this.virusImg = p.loadImage('./cdn/virus.png');
      },
      mouseClicked(e, p, { width }) {
        const { items } = this;
        if (paused.value) return;
        for (let i = 0; i < items.length; i++) {
          const { position, options } = items[i];
          const { radius } = options;
          // check shoot position has items
          const d = p.dist(p.mouseX, p.mouseY, position.x, position.y);
          if (radius && d < radius) {
            position.x = p.random(width);
            position.y = 0;
            addPoint();
          }
        }
      },
    }
  });

  virusProcess.addMethod('create', function(p, { width, height }) {
    const process = this;
    process.items = [];
    for (let i = 0; i < 15; i++) {
      const virus = createParticle(p, {
        position: {
          x: p.random(width),
          y: -30,
        },
        speed: {
          x: p.random(-0.3, 0.3),
          y: p.random(0.3, 2),
        },
        rotateSpeed: p.random(-1, 1),
        angle: 0,
        radius: 14,
        image: process.virusImg,
      });
      process.items.push(virus);
    }
  });

  clickProcess = createProcess({
    draw(p) {
      const { items } = this;
      if (items.length <= 0) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.run();
      }
    },
  });

  clickProcess.addMethod('create', function(p, _, x, y) {
    const process = this;
    if (!process.items) {
      process.items = [];
    }
    const { items } = process;
    for (let i = 0; i < 15; i++) {
      const item = createParticle(p, {
        position: { x, y },
        speed: {
          x: p.random(-1, 1),
          y: p.random(-1, 1),
        },
        radius: 2,
        life: p.random(60),
      });
      item.onDead = () => {
        items.splice(items.indexOf(item), 1);
      };
      items.push(item);
    }
  });

  childProcess = createProcess({
    on: {
      preload(e, p) {
        this.babyImg = p.loadImage('./cdn/baby.png');
        this.render = true;
      },
    },
    draw(p, { width, height }) {
      if (this.babyImg && this.render) {
        try {
          this.babyImg.resize(childWidth, 0);
        } catch(err) {
          window.location.reload();
        }
        p.imageMode(p.CENTER);
        p.image(this.babyImg, width / 2, height - 50);
        p.imageMode(p.CORNER);
      }
    },
  });

  deathProcess = createProcess({
    on: {
      preload(e, p) {
        this.deathImg = p.loadImage('./cdn/death.png');
        this.render = false;
      },
    },
    draw(p, { width, height }) {
      if (this.deathImg && this.render) {
        try {
          this.deathImg.resize(deathWidth, 0);
        } catch (err) {
          window.location.reload();
        }
        p.imageMode(p.CENTER);
        p.image(this.deathImg, width / 2, 200);
        p.imageMode(p.CORNER);
      }
    },
  });

  shootCursor = createProcess({
    on: {
      preload(e, p) {
        this.cursorImg = p.loadImage('./cdn/shoot_aim.png');
      },
    },
    draw(p) {
      try {
        this.cursorImg.resize(32, 0);
      } catch(err) {
        window.location.reload();
      }
      p.imageMode(p.CENTER);
      p.image(this.cursorImg, p.mouseX, p.mouseY);
      p.imageMode(p.CORNER);
    },
  });
}

export default {
  name: 'ShootVirus',
  setup() {
    let app;
    const bestScore = ref(localStorage.getItem('[shoot-virus]-bestScore') || 0);
    const initialized = ref(false);
    const paused = ref(false);
    const csRef = ref(null);
    const point = ref(0);
    const userLife = ref(3);
    const { initCanvas, addProcess, startAnimate } = useP5({
      animateState: false,
      width: window.innerWidth > 576 ? 500 : window.innerWidth - 30,
      height: window.innerHeight > 400 ? 400 : window.innerHeight,
      bgColor: 0,
      on: {
        mouseClicked(e, p, options) {
          if (paused.value) return;
          clickProcess.create(p.mouseX, p.mouseY);
        },
        preload() {},
      },
    });

    const addPoint = () => {
      point.value += 1;
    };

    const costLife = () => {
      userLife.value -= 1;
      // game over!
      if (userLife.value <= 0) {
        localStorage.setItem('[shoot-virus]-bestScore', `${point.value}`);
        bestScore.value = point.value;
        point.value = 0;
        userLife.value = 3;
        app.noLoop();
        childProcess.render = false;
        deathProcess.render = true;
        virusProcess.items = [];
        virusProcess.create();
      }
    };

    const restartGame = () => {
      paused.value = false;
      app.loop();
      childProcess.render = true;
      deathProcess.render = false;
    };

    const stopGame = () => {
      paused.value = true;
      app.noLoop();
    };

    const startGame = () => {
      initialized.value = true;
      startAnimate();
      virusProcess.create();
    };

    onMounted(() => {
      onMountCanvas({ paused, addPoint, costLife });
      app = initCanvas(csRef.value);
      addProcess(virusProcess, clickProcess, childProcess, deathProcess, shootCursor);
      console.log(csRef);
    })

    onUnmounted(() => {
      stopGame();
    })

    return {
      initialized,
      paused,
      csRef,
      bestScore,
      point,
      userLife,
      startGame,
      restartGame,
      stopGame,
    };
  },
}
</script>

<style lang="scss">

</style>
