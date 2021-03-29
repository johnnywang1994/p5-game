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
    <div v-if="initialized">
      <button class="btn-secondary" @click="restartGame">Restart</button>
      <button class="btn-secondary" @click="stopGame">Pause</button>
    </div>
    <div v-else>
      <button class="btn-primary" @click="startGame">Start</button>
    </div>
    <div class="vue-canvas" ref="csRef" @touchmove.prevent />
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { useP5, createProcess, createParticle } from 'p5-hook'

let ballProcess, paddleProcess, bricksProcess;

function onMountCanvas() {
  ballProcess = createProcess({
    draw(p, { width, height }) {
      const { position, velocity, options } = this.ball;
      const xLimit = (position.x + options.radius / 2) > width ||
        (position.x - options.radius / 2) < 0;
      const yLimit = (position.y - options.radius / 2) < 0;
      // game over limit(out of bottom)
      if (position.y > height) {
        p.noLoop();
        return;
      }
      // bounce
      if (xLimit) {
        velocity.x = -velocity.x;
      }
      else if (yLimit) {
        velocity.y = -velocity.y;
      }
      this.ball.run();
    }
  });

  ballProcess.addMethod('create', function(p, options) {
    this.ball = createParticle(p, {
      position: {
        x: options.width / 2 - 8,
        y: options.height - 40,
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
    setup(p, { width, height }) {
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
    },
    draw(p) {
      const { position, size } = this.paddle;
      if (p.keyIsDown(p.RIGHT_ARROW)) {
        position.x += 4;
      } else if (p.keyIsDown(p.LEFT_ARROW)) {
        position.x -= 4;
      }
      p.fill('#0390fc');
      p.rect(position.x, position.y, size.width, size.height);
      // check ball bounce
      const { velocity: ballSpeed } = ballProcess.ball;
      if (rectCollision(this.paddle, ballProcess.ball)) {
        ballSpeed.y = -ballSpeed.y;
      }
    },
  });

  bricksProcess = createProcess({
    setup(p, { width }) {
      const bricks = [];
      const rowCount = 8;
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
            }
          })
        }
      }
      this.bricks = bricks;
    },
    draw(p) {
      const { bricks } = this;
      const { position: ballPos, velocity: ballSpeed } = ballProcess.ball;
      p.stroke('#000');
      p.fill('#fc9803');
      for (let i = 0; i < bricks.length; i++) {
        const { position, size } = bricks[i];
        // collipse check
        if (rectCollision(bricks[i], ballProcess.ball)) {
          ballSpeed.y = -ballSpeed.y;
          bricks.splice(i, 1);
          continue;
        }
        p.rect(position.x, position.y, size.width, size.height);
      }
    },
  });
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
    const initialized = ref(false);
    const csRef = ref(null);
    const { initCanvas, addProcess, startAnimate } = useP5({
      animateState: false, // animateState when canvas initialized
      width: window.innerWidth > 576 ? 500 : window.innerWidth - 30,
      height: window.innerHeight > 400 ? 400 : window.innerHeight,
      bgColor: 255,
      // if you use any p5 method in process
      // remember to also define a specific p5 method here
      on: {
        setup(p) {},
      },
    });

    const restartGame = () => {
      ballProcess.create();
      app.loop();
    };

    const stopGame = () => {
      app.noLoop();
    };

    const startGame = () => {
      initialized.value = true;
      startAnimate();
      ballProcess.create();
    };

    onMounted(() => {
      onMountCanvas();
      app = initCanvas(csRef.value);
      addProcess(ballProcess, paddleProcess, bricksProcess);
    })

    return {
      initialized,
      csRef,
      restartGame,
      stopGame,
      startGame,
    };
  },
};
</script>

<style lang="scss">
.test {
  // ...
}
</style>
