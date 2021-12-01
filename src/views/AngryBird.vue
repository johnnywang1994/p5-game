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
  Events,
  Common,
  SAT
} = Matter;

const canvasConfig = {
  width: window.innerWidth > 576 ? 500 : window.innerWidth - 30,
  height: window.innerHeight > 400 ? 400 : window.innerHeight,
};

const gameConfig = {
  birdOrigin: {
    x: 70,
    y: canvasConfig.height - 100,
  },
};

const csRef = ref(null);

let engine;
let runner;
let render;

let fireTimer;
let firing;

class Ground {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h, {
      label: 'Ground',
      isStatic: true,
      render: {
        fillStyle: '#812020',
      },
    });
    Composite.add(engine.world, this.body);
  }
}

class Bird {
  constructor(x, y, birdType = 1) {
    const typeConfigMap = {
      1: {
        sprite: 'cdn/bird1.png',
        density: 0.001,
        scale: 0.035,
        radius: 14,
      },
      2: {
        sprite: 'cdn/bird2.png',
        density: 0.0008,
        scale: 0.035,
        radius: 14,
      },
      3: {
        sprite: 'cdn/bird3.png',
        density: 0.003,
        scale: 0.045,
        radius: 20,
      },
    };

    const birdConfig = this.config = typeConfigMap[birdType];

    this.body = Bodies.circle(x, y, birdConfig.radius, {
      label: 'Bird',
      restitution: 0.4,
      density: birdConfig.density,
      render: {
        fillStyle: 'red',
        sprite: {
          texture: birdConfig.sprite,
          xScale: birdConfig.scale,
          yScale: birdConfig.scale,
        },
      },
    });
    Composite.add(engine.world, this.body);
  }
}

class Pig {
  constructor(x, y) {
    this.body = Bodies.circle(x, y, 20, {
      label: 'Pig',
      restitution: 0.35,
      friction: 0.16,
      render: {
        fillStyle: '#7cda26',
        sprite: {
          texture: 'cdn/pig.png',
          xScale: 0.06,
          yScale: 0.05,
        },
      }
    });
    // Body.scale(this.body, 1, 1);
    Composite.add(engine.world, this.body);
  }

  destroy() {
    const pos = this.body.position;
    const sandStack = Composites.stack(pos.x,pos.y,5,5,0,0,function(x,y) {
      const t = Bodies.rectangle(x,y,5,5, {
        render: { fillStyle: '#7cda26' },
      });

      Body.setVelocity(t, { x: Common.random(-3, 3), y: -5 });

      return t;
    });
    Composite.remove(engine.world, this.body);
    Composite.add(engine.world, sandStack);
    setTimeout(() => {
      Composite.remove(engine.world, sandStack);
    }, 2000);
  }
}

class Boxes {
  constructor(xx, yy, row, col, gapX = 0, gapY = 0) {
    this.body = Composites.stack(xx, yy, row, col, gapX, gapY, function(x, y) {
      return Bodies.rectangle(x, y, 35, 45, {
        restitution: 0.2,
        friction: 0.25,
        frictionAir: 0.04,
        density: 0.004,
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
      render: {
        visible: false,
      },
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
  engine = Engine.create();
  runner = Runner.create();

  render = Render.create({
    element: csRef.value,
    engine,
    options: {
      width: canvasConfig.width,
      height: canvasConfig.height,
      background: '#ccdeff',
      wireframes: false,
    },
  });

  // object
  const { birdOrigin } = gameConfig;
  // ground
  const ground = new Ground(
    canvasConfig.width / 2,
    canvasConfig.height - 10,
    canvasConfig.width,
    20,
  );
  // right board
  new Ground(
    canvasConfig.width + 20,
    canvasConfig.height / 2,
    20,
    canvasConfig.height,
  );
  new Boxes(
    canvasConfig.width - 150,
    canvasConfig.height - 45*3-20,
    2,
    3,
  );
  // pig on top of boxes
  let pig = new Pig(
    canvasConfig.width - 110,
    canvasConfig.height - 45*3-20 - 20,
  );
  let bird = new Bird(birdOrigin.x, birdOrigin.y, 1);
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
    if (firing && distance(birdPos, birdOrigin) < bird.config.radius + 20) {
      clearTimeout(fireTimer);
      sling.attach({ body: null });
      firing = false;
      fireTimer = setTimeout(() => {
        const birdType = Math.floor(Common.random(1, 4));
        bird = new Bird(birdOrigin.x, birdOrigin.y, birdType);
        sling.attach(bird);
      }, 3000);
    }
  })

  Events.on(engine, 'collisionActive', function(e) {
    if (pig) {
      const birdHit = SAT.collides(bird.body, pig.body).collided;
      const onGround = SAT.collides(ground.body, pig.body).collided
      if (birdHit || onGround) {
        pig.destroy();
        pig = null;
      }
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
  clearTimeout(fireTimer);
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