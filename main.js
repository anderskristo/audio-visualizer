'use strict';

var audio = new Audio;
    audio.src = 'https://p.scdn.co/mp3-preview/36fcb5b51949ac1581e4c607f6d18ce0b715df24';
    audio.controls = false;
    audio.loop = true;
    audio.autoplay = true;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

function init() {  
  context = new webkitAudioContext();
  analyser = context.createAnalyser();
  canvas = document.getElementById('spotzer');
  ctx = canvas.getContext('2d');
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frames();
}

function frames() {
  window.webkitRequestAnimationFrame(frames);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FE7F95';
  bars = 100;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}

init();
