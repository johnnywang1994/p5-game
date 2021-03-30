<!-- https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript -->
<template>
  <div class="bounce-ball">
    <h1>
      P5-hook Shoot-Virus
    </h1>
    <small>
      <router-link to="/">
        Return Home
      </router-link>
    </small>
    <h3>Best Score: {{ bestScore }}</h3>
    <div v-if="userLife > 0">You Points: {{ point }}, Life: {{ userLife }}</div>
    <div v-else>Game Over!!</div>
    <div v-if="initialized">
      <button class="btn-secondary" @click="restartGame">Restart</button>
      <button class="btn-secondary" @click="stopGame">Pause</button>
    </div>
    <div v-else>
      <button class="btn-primary" @click="startGame">Start</button>
    </div>
    <p>Press <code>space</code> to shoot the ball</p>
    <div :class="['vue-canvas', { paused }]" ref="csRef" @touchmove.prevent />
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { useP5, createProcess, createParticle } from 'p5-hook'
import Color from '../color';

let ballProcess, paddleProcess, bricksProcess;

function onMountCanvas({ addPoint, costLife }) {
  ballProcess = createProcess({
    setup() {
      this.waiting = true;
    },
    draw(p, { width, height }) {
      const { position, velocity, options } = this.ball;
      const safeOffset = 1;
      const xLimit = (position.x + options.radius / 2 + safeOffset) > width ||
        (position.x - options.radius / 2 - safeOffset) < 0;
      const yLimit = (position.y - options.radius / 2 - safeOffset) < 0;
      // game over limit(out of bottom)
      if (position.y > height) {
        costLife();
        this.create();
        this.waiting = true;
        return;
      }
      // bounce
      if (xLimit) {
        velocity.x = -velocity.x;
      }
      else if (yLimit) {
        velocity.y = -velocity.y;
      }

      if (this.waiting) {
        this.ball.display();
      } else {
        this.ball.run();
      }
    },
    on: {
      keyPressed({ keyCode }) {
        const WHITE_SPACE = 32;
        if (keyCode === WHITE_SPACE) {
          if (this.waiting) {
            this.waiting = false;
          }
        }
      },
    },
  });

  ballProcess.addMethod('create', function(p, options) {
    const { position: paddlePos, size: paddleSize } = paddleProcess.paddle;
    this.ball = createParticle(p, {
      position: {
        x: paddlePos.x + paddleSize.width / 2,
        y: options.height - 30,
      },
      speed: {
        x: 4,
        y: -4,
      },
      color: 0,
      radius: 16,
    })
  });

  paddleProcess = createProcess({
    draw(p) {
      const { position, size } = this.paddle;
      if (p.keyIsDown(p.RIGHT_ARROW)) {
        position.x += 4;
        if (ballProcess.waiting) {
          ballProcess.ball.position.x += 4;
        }
      } else if (p.keyIsDown(p.LEFT_ARROW)) {
        position.x -= 4;
        if (ballProcess.waiting) {
          ballProcess.ball.position.x -= 4;
        }
      }
      p.fill('#0390fc');
      p.rect(position.x, position.y, size.width, size.height);
      // check ball bounce
      if (!ballProcess.ball) return;
      const { velocity: ballSpeed } = ballProcess.ball;
      if (rectCollision(this.paddle, ballProcess.ball)) {
        ballSpeed.y = -ballSpeed.y;
      }
    },
  });

  paddleProcess.addMethod('create', function(p, { width, height }) {
    const paddleWidth = width / 4;
    this.paddle = {
      position: {
        x: width / 2 - 100 / 2,
        y: height - 20,
      },
      size: {
        width: paddleWidth,
        height: 15,
      },
    };
  })

  bricksProcess = createProcess({
    draw(p) {
      const { bricks } = this;
      const { position: ballPos, velocity: ballSpeed } = ballProcess.ball;
      p.stroke('#000');
      for (let i = 0; i < bricks.length; i++) {
        const { position, size, color } = bricks[i];
        // collipse check
        if (rectCollision(bricks[i], ballProcess.ball)) {
          ballSpeed.y = -ballSpeed.y;
          bricks.splice(i, 1);
          addPoint();
          continue;
        }
        p.fill(color);
        p.rect(position.x, position.y, size.width, size.height);
      }
    },
  });

  bricksProcess.addMethod('create', function(p, { width }) {
    const bricks = [];
    const rowCount = 5;
    const row = 4;
    const padding = 0;
    const brickWidth = width / rowCount;
    const brickHeight = 20;
    const offsetX = 0;
    const offsetY = 0;
    for (let j = 0; j < row; j++) {
      for (let i = 0; i < rowCount; i++) {
        bricks.push({
          position: {
            x: offsetX + (brickWidth + padding) * i,
            y: offsetY + (brickHeight + padding) * j,
          },
          size: {
            width: brickWidth,
            height: brickHeight
          },
          color: Color.color(),
        })
      }
    }
    this.bricks = bricks;
  })
}

function rectCollision(stayer, mover) {
  const { position: stayPos, size: staySize } = stayer;
  const { position: movePos } = mover;
  return (movePos.x >= stayPos.x) &&
    (movePos.x <= stayPos.x + staySize.width) &&
    (movePos.y >= stayPos.y) &&
    (movePos.y <= stayPos.y + staySize.height);
}

export default {
  name: 'BounceBall',
  setup() {
    let app;
    const bestScore = ref(localStorage.getItem('[shoot-virus]-bestScore') || 0);
    const initialized = ref(false);
    const paused = ref(false);
    const csRef = ref(null);
    const point = ref(0);
    const userLife = ref(3);
    const { initCanvas, addProcess, startAnimate } = useP5({
      animateState: false, // animateState when canvas initialized
      width: window.innerWidth > 576 ? 500 : window.innerWidth - 30,
      height: window.innerHeight > 400 ? 400 : window.innerHeight,
      bgColor: 255,
      // if you use any p5 method in process
      // remember to also define a specific p5 method here
      on: {
        setup(p) {},
        keyPressed() {},
      },
    });

    const addPoint = () => {
      point.value += 1;
    };

    const stopGame = () => {
      paused.value = true;
      app.noLoop();
    };

    const costLife = () => {
      userLife.value -= 1;
      if (userLife.value <= 0) {
        stopGame();
      }
    };

    const restartGame = () => {
      paused.value = false;
      app.loop();
      if (userLife.value <= 0) {
        localStorage.setItem('[bounce-ball]-bestScore', `${point.value}`);
        point.value = 0;
        userLife.value = 3;
        ballProcess.create();
        bricksProcess.create();
      }
    };

    const startGame = () => {
      initialized.value = true;
      startAnimate();
      paddleProcess.create();
      ballProcess.create();
      bricksProcess.create();
    };

    onMounted(() => {
      onMountCanvas({ addPoint, costLife });
      app = initCanvas(csRef.value);
      addProcess(ballProcess, paddleProcess, bricksProcess);
    })

    return {
      initialized,
      paused,
      csRef,
      bestScore,
      point,
      userLife,
      restartGame,
      stopGame,
      startGame,
    };
  },
};
</script>

<style lang="scss">

</style>
