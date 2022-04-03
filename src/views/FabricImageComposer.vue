<template>
  <div class="fabric-image-composer container mx-auto mb-5 text-center">
    <h1 class="text-2xl font-bold">Image Composer</h1>
    <small>
      <router-link class="text-blue-500" to="/">
        Return Home
      </router-link>
    </small>
    <template v-if="giveSize">
      <button class="block bg-yellow-400 hover:bg-yellow-500 rounded-md text-white px-3 py-1 my-3 mx-auto" @click="onSave">Download</button>
      <canvas id="c" class="border border-slate-400"></canvas>
      <div class="grid gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5">
        <div class="mt-3">
          <h3>Rect</h3>
          <input class="block mx-auto mb-2" type="color" v-model="pickColor" />
          <button class="bg-green-400 hover:bg-green-500 rounded-md text-white px-3 py-1" @click="addRect">Add Rect</button>
        </div>
        <div class="mt-3">
          <h3>Image</h3>
          <input type="text" class="block w-full bg-white border border-slate-300 rounded-md px-3 py-1 mb-2" v-model="pickImage" placeholder="Image URL">
          <input class="block file w-full mb-2" type="file" @change="onUploadImage">
          <button class="bg-green-400 hover:bg-green-500 rounded-md text-white px-3 py-1" @click="addImage">
            {{ imageLoading ? 'loading...' : 'Add Image' }}
          </button>
        </div>
        <div class="grid grid-flow-row mt-3">
          <button class="bg-blue-400 hover:bg-blue-500 rounded-md text-white px-3 py-1 mb-2" @click="onBringForward">bringForward</button>
          <button class="bg-blue-400 hover:bg-blue-500 rounded-md text-white px-3 py-1 mb-2" @click="onSendBackward">sendBackward</button>
          <button class="bg-blue-400 hover:bg-blue-500 rounded-md text-white px-3 py-1 mb-2" @click="onBringToFront">bringToFront</button>
          <button class="bg-blue-400 hover:bg-blue-500 rounded-md text-white px-3 py-1" @click="onSendToBack">sendToBack</button>
        </div>
      </div>
    </template>
    <div class="max-w-xs mx-auto text-left" v-else>
      Width:
      <input class="block w-full bg-white border border-slate-300 rounded-md px-3 py-1 mb-3" v-model="size.width">
      Height:
      <input class="block w-full bg-white border border-slate-300 rounded-md px-3 py-1 mb-3" v-model="size.height">
      Background:
      <input class="block w-full bg-white border border-slate-300 rounded-md px-3 py-1 mb-3" v-model="size.background" placeholder="transparent by default">
      <button class="bg-green-400 hover:bg-green-500 rounded-md text-white px-3 py-1" @click="onInitCanvas">Start</button>
    </div>
  </div>
</template>

<script>
var deleteIcon = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"%3E%3Cpath fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4l-66.1.3c-4.4 0-8-3.5-8-8c0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4l66-.3c4.4 0 8 3.5 8 8c0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2c0 4.4-3.6 8-8 8z"%2F%3E%3C%2Fsvg%3E';
var img = document.createElement('img');
img.src = deleteIcon;

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'rgba(0, 0, 0, 0.5)';
fabric.Object.prototype.cornerStyle = 'circle';

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: -24,
  cursorStyle: 'pointer',
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 24
});

function deleteObject(eventData, transform) {
	var target = transform.target;
	var canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore();
}

export default {
  name: 'FabricImageComposer',
  data() {
    return {
      giveSize: false,
      size: {
        width: 300,
        height: 500,
        background: '',
      },
      imageLoading: false,
      pickColor: '#e66465',
      pickImage: '',
      fileImage: null,
    }
  },
  methods: {
    onInitCanvas() {
      this.giveSize = true;
      this.$nextTick(() => this.initFabric())
    },
    initFabric() {
      const vm = this
      var canvas = this._canvas = new fabric.Canvas('c', {
        width: vm.size.width,
        height: vm.size.height,
        backgroundColor: vm.size.background || false,
      });
    },
    addRect() {
      const vm = this
      var rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: vm.pickColor,
        width: 100,
        height: 100,
        objectCaching: false,
        stroke: 'transparent',
        strokeWidth: 0,
      });

      this._canvas.add(rect);
      this._canvas.setActiveObject(rect);
    },
    addImage() {
      const vm = this
      if (vm.imageLoading) return;
      vm.imageLoading = true;
      fabric.util.loadImage(this.pickImage, function (img) {
        const width = 200;
        const ratio = img.height / img.width;
        var legimg = new fabric.Image(img, {
          left: 0,
          top: 0,
          angle: 0,
          opacity: 1,
          scaleX: width / img.width,
          scaleY: width / img.height * ratio
        });
        vm._canvas.add(legimg);
        vm._canvas.setActiveObject(legimg);
        vm.imageLoading = false;
        vm.pickImage = '';
      });
    },
    onUploadImage(e) {
      const el = e.target;
      const file = el.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.pickImage = reader.result;
        el.value = '';
        el.type = '';
        el.type = 'file';
      };
      reader.readAsDataURL(file);
    },
    onSave() {
      document.getElementById('c').toBlob(function(blob) {
        saveAs(blob, 'image-composer.png');
      });
    },
    onBringForward() {
      const activeObj = this._canvas.getActiveObject();
      activeObj.bringForward();
    },
    onSendBackward() {
      const activeObj = this._canvas.getActiveObject();
      activeObj.sendBackwards();
    },
    onBringToFront() {
      const activeObj = this._canvas.getActiveObject();
      activeObj.bringToFront();
    },
    onSendToBack() {
      const activeObj = this._canvas.getActiveObject();
      activeObj.sendToBack();
    }
  },
}
</script>

<style lang="scss">
.fabric-image-composer {
  h1 {
    text-align: center;
  }

  .canvas-container {
    margin: auto;
  }

  .file {
    $bg: rgb(129, 140, 248);
    cursor: pointer;
    &::-webkit-file-upload-button {
      background: $bg;
      border: none;
      border-radius: 10px;
      padding: 5px 10px;
      color: #fff;
      cursor: pointer;
      &:hover {
        background: darken($bg, 10%);
      }
    }
  }
}
</style>
