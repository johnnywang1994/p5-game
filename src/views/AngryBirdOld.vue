<template>
  <div class="view-angry-bird">
    <h1>
      P5 + Matterjs Angry-Bird
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
    <div class="vue-canvas" ref="csRef" @touchmove.prevent />
  </div>
</template>

<script setup>
// https://www.youtube.com/watch?v=TDQzoe9nslY
import { onMounted, ref } from 'vue'
import { useP5, createProcess } from 'p5-hook'

const {
  Engine,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Constraint
} = Matter;

let engine = null;
let birdImg;

let app;
let mainProcess;

class Bird {
  constructor(x, y, r) {
    const options = {
      restitution: 0.4, // 回彈
    };
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = 'Bird';
    this.r = r;
    Composite.add(engine.world, this.body);
  }
  
  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    app.push();
    app.translate(pos.x, pos.y);
    app.rotate(angle);
    // app.fill(255);
    // app.ellipseMode(app.RADIUS); // matterjs draw rect in center by default
    // app.circle(0, 0, this.r);
    app.imageMode(app.CENTER);
    app.image(birdImg, 0, 0, this.r*2, this.r*2);
    app.imageMode(app.CORNER);
    app.pop();
  }
}

class Box {
  constructor(x, y, w, h) {
    const options = {
      restitution: 0.2, // 回彈
      friction: 0.8
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    Composite.add(engine.world, this.body);
  }
  
  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    app.push();
    app.translate(pos.x, pos.y);
    app.rotate(angle);
    app.fill('#f7ae6a');
    app.rectMode(app.CENTER); // matterjs draw rect in center by default
    app.rect(0, 0, this.w, this.h);
    app.pop();
  }
}

class Ground extends Box {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.body.isStatic = true;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    app.push();
    app.translate(pos.x, pos.y);
    app.rotate(angle);
    app.fill('#1dff1d');
    app.rectMode(app.CENTER); // matterjs draw rect in center by default
    app.rect(0, 0, this.w, this.h);
    app.pop();
  }
}

class SlingShot {
  constructor(x, y, body) {
    const options = {
      pointA: { x, y },
      bodyB: body,
      stiffness: 0.04,
      length: 0,
    };
    this.sling = Constraint.create(options);
    Composite.add(engine.world, this.sling);
  }
  
  show() {
    if (this.sling.bodyB) {
      app.stroke(255);
      const posA = this.sling.pointA;
      const posB = this.sling.bodyB.position;
      app.line(posA.x, posA.y, posB.x, posB.y); 
    }
  }
  
  fly() {
    this.sling.bodyB = null;
  }
  
  attach(newBody) {
    this.sling.bodyB = newBody;
  }
}

function onMountCanvas() {
  mainProcess = createProcess({
    setup(p, { width, height }) {
      if (!engine) {
        engine = this.engine = Engine.create();
      }
    
      this.bird = new Bird(100, height - 100, 20);
      this.slingshot = new SlingShot(100, height - 100, this.bird.body);
      this.ground = new Ground(width/2, height - 10, width, 20);
      this.boxes = [];
      for (let i = 0; i < 3; i++) {
        this.boxes[i] = new Box(width - 100, 100-i*60, 40, 60);
      }

      this.mouse = Mouse.create(p.canvas.parentNode);
      this.mConstraint = MouseConstraint.create(this.engine, {
        mouse: this.mouse,
      });
      Composite.add(this.engine.world, this.mConstraint);
    },
    draw() {
      if (this.engine) {
        Engine.update(this.engine);
        this.slingshot.show();
        this.bird.show();
        this.ground.show();
        for (let i = 0; i < 3; i++) {
          this.boxes[i].show();
        }
      }
    },
    on: {
      mousePressed(e, { mouseX, mouseY }) {
        if (this.bird) {
          const birdPos = this.bird.body.position;
          this.birdClicked = distance(birdPos, {
            x: mouseX,
            y: mouseY,
          }) <= this.bird.r;
        }
      },
      mouseReleased() {
        if (this.birdClicked) {
          this.birdClicked = false;
          setTimeout(() => {
            this.slingshot.fly();
          }, 50);
        }
      },
      keyPressed({ keyCode }, p, { height }) {
        const WHITE_SPACE = 32;
        if (keyCode === WHITE_SPACE) {
          Composite.remove(this.engine.world, this.bird.body);
          this.bird = new Bird(100, height - 100, 20);
          this.slingshot.attach(this.bird.body);
        }
      },
    },
  });

  mainProcess.addMethod('loadAssets', function(p) {
    birdImg = this.birdImg = p.loadImage('./cdn/bird1.png');
  });
}

const csRef = ref(null);

const { initCanvas, addProcess, startAnimate } = useP5({
  animateState: false, // animateState when canvas initialized
  width: window.innerWidth > 576 ? 500 : window.innerWidth - 30,
  height: window.innerHeight > 400 ? 400 : window.innerHeight,
  bgColor: 0,
  // if you use any p5 method in process
  // remember to also define a specific p5 method here
  on: {
    setup() {},
    mousePressed() {},
    mouseReleased() {},
    keyPressed() {},
  },
});

const startGame = () => {
  if (engine) {
    Composite.clear(engine.world);
  }
  mainProcess.loadAssets();
  mainProcess.setup();
  startAnimate();
};

onMounted(() => {
  onMountCanvas();
  app = initCanvas(csRef.value);
  addProcess(mainProcess);
});

function distance(posA, posB) {
  const x = posB.x - posA.x;
  const y = posB.y - posA.y;
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