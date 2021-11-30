<template>
  <div class="view-angry-bird">
    <h1>
      Matterjs Angry-Bird
    </h1>
    <small>
      <router-link to="/">
        Return Home
      </router-link>
    </small>
    <h3></h3>
    <div>
      <button class="btn-primary" @click="startGame">Start</button>
    </div>
    <div
      class="vue-canvas"
      ref="csRef"
      @touchmove.prevent
    />
  </div>
</template>

<script setup>
// https://www.youtube.com/watch?v=TDQzoe9nslY
import { onMounted, ref } from 'vue'

const {
  Engine,
  Runner,
  Render,
  Body,
  Bodies,
  Composite,
  Composites,
  Mouse,
  MouseConstraint,
  Constraint,
  Events
} = Matter;

const canvasConfig = {
  width: window.innerWidth > 576 ? 500 : window.innerWidth - 30,
  height: window.innerHeight > 400 ? 400 : window.innerHeight,
};

const gameConfig = {
  birdOrigin: {
    x: 100,
    y: canvasConfig.height - 100,
  },
  birdRadius: 20,
}

const csRef = ref(null);

let engine;
let runner;
let render;
let firing;

class Bird {
  constructor(x, y, r) {
    this.body = Bodies.circle(x, y, r, {
      restitution: 0.4,
      render: {
        fillStyle: 'red',
        sprite: {
          texture: 'cdn/bird.png',
          xScale: 0.04,
          yScale: 0.04,
        },
      },
    });
    Composite.add(engine.world, this.body);
  }
}

class Ground {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h, {
      isStatic: true,
      render: {
        fillStyle: '#1dff1d',
      },
    });
    Composite.add(engine.world, this.body);
  }
}

class Boxes {
  constructor(xx, yy, row, col, gapX = 0, gapY = 0) {
    this.body = Composites.stack(xx, yy, row, col, gapX, gapY, function(x, y) {
      return Bodies.rectangle(x, y, 30, 45, {
        restitution: 0.2,
      });
    })
    Composite.add(engine.world, this.body);
  }
}

class Sling {
  constructor(x, y, body) {
    this.body = Constraint.create({
      pointA: { x, y },
      bodyB: body,
      stiffness: 0.05,
    });
    this.emptyBody = Bodies.rectangle(x, y, 1, 1, {
      isStatic: true,
      render: {
        fillStyle: '#fff',
      },
    });
    Composite.add(engine.world, [this.body]);
  }

  attach(bird) {
    this.body.bodyB = bird.body || this.emptyBody;
  }
}

function onMountCanvas() {
  if (!engine) {
    engine = Engine.create();
    runner = Runner.create();
  }

  render = Render.create({
    element: csRef.value,
    engine,
    options: {
      width: canvasConfig.width,
      height: canvasConfig.height,
      wireframes: false,
    },
  });

  // object
  const { birdOrigin, birdRadius } = gameConfig;
  new Ground(
    canvasConfig.width / 2,
    canvasConfig.height - 10,
    canvasConfig.width,
    20,
  );
  new Boxes(canvasConfig.width - 200, 0, 4, 6);
  let bird = new Bird(birdOrigin.x, birdOrigin.y, birdRadius);
  const sling = new Sling(birdOrigin.x, birdOrigin.y, bird.body);

  const mouse = Mouse.create(render.canvas);
  const mConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      render: { visible: false },
    },
  });

  Events.on(mConstraint, 'enddrag', function(e) {
    if (e.body === bird.body) firing = true;
  })

  Events.on(engine, 'afterUpdate', function() {
    const birdPos = bird.body.position;
    if (firing && distance(birdPos, birdOrigin) < birdRadius + 5) {
      sling.attach({ body: null });
      firing = false;
      setTimeout(() => {
        bird = new Bird(birdOrigin.x, birdOrigin.y, birdRadius);
        sling.attach(bird);
      }, 2000);
    }
  })

  Composite.add(engine.world, mConstraint);

  Runner.run(runner, engine);
  Render.run(render);
}

const startGame = () => {
  if (engine) {
    Composite.clear(engine.world);
    Engine.clear(engine);
    Render.stop(render);
    Runner.stop(runner);
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};
  }
  onMountCanvas();
};

onMounted(() => {
  onMountCanvas();
})

function distance(posA, posB) {
  const x = Math.abs(posB.x - posA.x);
  const y = Math.abs(posB.y - posA.y);
  return Math.sqrt(x*x + y*y);
}
</script>

<style lang="scss">
.view-angry-bird {
  .vue-canvas {
    > canvas {
      cursor: auto;
    }
  }
}
</style>