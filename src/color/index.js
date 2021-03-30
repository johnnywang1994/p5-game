import Convert from './color_converter';

const goldenRatio = 0.618033988749895;
let hue = Math.random();

// returns format "hsv"
function goldenRatioColor(saturation, value) {
  hue += goldenRatio;
  hue %= 1;

  if (typeof saturation !== 'number') saturation = 0.5;
  if (typeof value !== 'number') value = 0.95;

  return [
    hue * 360,
    saturation * 100,
    value * 100
  ];
}

function color() {
  return hex();
}

// #DAC0DE
function hex() {
  const hsv = goldenRatioColor();
  const rgb = Convert.hsv2rgb(hsv);
  return Convert.rgb2hex(rgb[0], rgb[1], rgb[2]);
}

// rgb(128,255,255)
function rgb() {
  const hsv = goldenRatioColor();
  const rgb = Convert.hsv2rgb(hsv);
  return 'rgb(' +
    parseInt(rgb[0], 10) + ', ' +
    parseInt(rgb[1], 10) + ', ' +
    parseInt(rgb[2], 10) + ')';
}

// rgba(128,255,255,0.3)
function rgba() {
  const hsv = goldenRatioColor();
  const rgb = Convert.hsv2rgb(hsv);
  return 'rgba(' +
    parseInt(rgb[0], 10) + ', ' +
    parseInt(rgb[1], 10) + ', ' +
    parseInt(rgb[2], 10) + ', ' +
    Math.random().toFixed(2) + ')';
}

// hsl(300,80%,90%)
function hsl() {
  const hsv = goldenRatioColor();
  const hsl = Convert.hsv2hsl(hsv);
  return 'hsl(' +
    parseInt(hsl[0], 10) + ', ' +
    parseInt(hsl[1], 10) + '%, ' +
    parseInt(hsl[2], 10) + '%)';
}

function hsv() {
  const hsv = goldenRatioColor();
  return 'hsv(' +
    parseInt(hsv[0], 10) + ', ' +
    parseInt(hsv[1], 10) + '%, ' +
    parseInt(hsv[2], 10) + '%)';
}

export default {
  color,
  hex,
  rgb,
  rgba,
  hsl,
  hsv,
};
