var fc = require('fc');
var createZoomToCursor = require('./2d-zoom-to-cursor');
var mat3 = require('gl-matrix-mat3');

var zoom = createZoomToCursor(ctx, transform)

// to unhook this behavior just stop listening to these events
// zoom detects the event type and will handle appropriately
document.addEventListener('DOMMouseScroll', zoom);
document.addEventListener('mousewheel', zoom);
document.addEventListener('mousemove', zoom)

var mat3 = require('gl-matrix-mat3');
var vec2 = require('gl-matrix-vec2');

var mouse = vec2.create();
var scale = 1;

var v2scratch = vec2.create();
var m3scratch = mat3.create();

var ctx = require('fc')(function() {
  ctx.fillStyle = "red";
  ctx.clear();
  ctx.save();
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    ctx.scale(scale, scale);

    // compute where the mouse is in the scene
    var mat = ctx.getTransform();
    mat3.invert(m3scratch, mat)
    vec2.transformMat3(v2scratch, mouse, m3scratch);

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
      ctx.moveTo(-50, -50);
      ctx.lineTo(50, -50);
      ctx.lineTo(50, 50);
      ctx.lineTo(-50, 50);

      for (var x=-40; x<50; x+=10) {
        for (var y = -40; y<50; y+=10) {
          ctx.moveTo(x+2.5, y)
          ctx.arc(x, y, 2.5, 0, Math.PI*2, true);
        }
      }

      ctx.fill();

  ctx.restore();

});

require('ctx-get-transform')(ctx);
console.log(ctx.getTransform)
document.addEventListener('mousemove', function(e) {
  mouse[0] = e.x;
  mouse[1] = e.y;
});

document.addEventListener('mousewheel', function(e) {
  scale += e.wheelDeltaY / 100;
  e.preventDefault();
});


