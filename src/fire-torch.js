/* eslint-disable */
/*
Copyright (c) 2013 mikeferron.com, ferronsays at codepen.io (https://codepen.io/ferronsays)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/

var scene;

var emitterPos;
var mousePos;

var presets = {
  "preset": "Fire",
  "remembered": {
    "Fire": {
      "0": {
        "MAX_PARTICLES": 484.8484848484849,
        "ROTATION_SPEED": 0,
        "ANGLE": -90,
        "ANGLE_VARIANCE": 3,
        "X_VARIANCE": 62.01550387596899,
        "Y_VARIANCE": 45.10218463706836,
        "DURATION": -1,
        "FOLLOW_MOUSE": false,
        "SPEED": 1.5,
        "SPEED_VARIANCE": 1,
        "LIFE": 1000,
        "LIFE_VARIANCE": 800,
        "SIZE": 50,
        "SIZE_VARIANCE": 10,
        "END_SIZE": 10,
        "END_SIZE_VARIANCE": 5,
        "GRAVITY_X": -2.9386892177589843,
        "GRAVITY_Y": 0,
        "COLOR_R": 2.7759823099166523,
        "COLOR_G": 2.81233844563157,
        "COLOR_B": 14.37632135306554,
        "COLOR_A": 0.5,
        "COLOR_R_VARIANCE": 42.18507668447355,
        "COLOR_G_VARIANCE": 0,
        "COLOR_B_VARIANCE": 0,
        "COLOR_A_VARIANCE": 0,
        "END_COLOR_R": 255,
        "END_COLOR_G": 77,
        "END_COLOR_B": 0,
        "END_COLOR_A": 0.1,
        "END_COLOR_R_VARIANCE": 0,
        "END_COLOR_G_VARIANCE": 0,
        "END_COLOR_B_VARIANCE": 0,
        "END_COLOR_A_VARIANCE": 0,
        "BACKGROUND_COLOR": "#433e3e",
        "RADIAL": true,
        "RADIAL_SHARPNESS": 0,
        "RADIAL_SHARPNESS_VARIANCE": 0,
        "BLEND_MODE": "lighter",
        "CLEAR": true
      }
    },
  },
  "closed": false,
  "folders": {
    "Emitter": {
      "preset": "Fire",
      "closed": true,
      "folders": {}
    },
    "Particles": {
      "preset": "Fire",
      "closed": true,
      "folders": {}
    },
    "Particle Colors": {
      "preset": "Fire",
      "closed": true,
      "folders": {}
    },
    "Misc. Graphics": {
      "preset": "Fire",
      "closed": true,
      "folders": {}
    }
  }
};

var DATOptions = function()
{
  this.ROTATION_SPEED = 0;
  this.ANGLE = -123.17124735729388;
  this.ANGLE_VARIANCE = 3;
  this.X_VARIANCE = 62.01550387596899;
  this.Y_VARIANCE = 45.10218463706836;
  this.MAX_PARTICLES = 400;
  this.SPEED = 1.5;
  this.SPEED_VARIANCE = 1;
  this.LIFE = 2000;
  this.LIFE_VARIANCE = 1900;
  this.SIZE = 80;
  this.SIZE_VARIANCE = 10;
  this.END_SIZE = 10;
  this.END_SIZE_VARIANCE = 5;
  this.COLOR_R = 63.25581395348837;
  this.COLOR_G = 40.25369978858351;
  this.COLOR_B = 34.503171247357294;
  this.COLOR_A = .5;
  this.COLOR_R_VARIANCE = 0;
  this.COLOR_G_VARIANCE = 0;
  this.COLOR_B_VARIANCE = 0;
  this.COLOR_A_VARIANCE = 0;
  this.END_COLOR_R = 255;
  this.END_COLOR_G = 77;
  this.END_COLOR_B = 0;
  this.END_COLOR_A = .1;
  this.END_COLOR_R_VARIANCE = 0;
  this.END_COLOR_G_VARIANCE = 0;
  this.END_COLOR_B_VARIANCE = 0;
  this.END_COLOR_A_VARIANCE = 0;
  this.RADIAL_SHARPNESS = 65;
  this.RADIAL_SHARPNESS_VARIANCE = 0;
  this.GRAVITY_X = -2.9386892177589843;
  this.GRAVITY_Y = 0;
  this.RADIAL = true;
  this.BLEND_MODE = "lighter";
  this.DURATION = -1;
  this.FOLLOW_MOUSE = false;
  this.MOUSE_POSITION = null;
  this.CLEAR = true;

  this.RESET = function()
  {
    //this assumes there is just one...
    scene.emitter.disable();
    scene.emitter.enable();
  };

}, options;

var settings = new DATOptions();


var Scene = function(canvas_id) {
  this.init(canvas_id);
};

Scene.prototype.init = function(canvas_id) {

  this.current_time = new Date().getTime();

  this.dt = 0;

  this.canvas = document.getElementById(canvas_id);

  this.canvas.width = 300;
  this.canvas.height = 300;

  this.width = this.canvas.width;
  this.height = this.canvas.height;

  this.ctx = this.canvas.getContext('2d');

  //this.entities = [];

  emitterPos = new Vector(this.width/2, this.height/2);

  this.emitter = new Emitter(
    emitterPos,
    this.ctx
  );

  //this.entities.push(emitter);
};

Scene.prototype.getCanvasContext = function() {
  return this.ctx;
};

Scene.prototype.enable = function() {
  var that = this;

  window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame
    })();

  this.animate(new Date().getTime());

  function doResize()
  {
    that.canvasResize();
  }

  var endResize;

  window.onresize = function(e) {
    clearTimeout(endResize);
    endResize = setTimeout(doResize, 100);
  };

  document.getElementById("fire").onmousemove = function(e){
    var mouseX, mouseY;
    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }

    mousePos = new Vector(mouseX, mouseY);
  }


  return this;
};

Scene.prototype.animate = function(time)
{
    var that = this;
    this.animationFrame = requestAnimFrame( function(){ that.animate(new Date().getTime());} );
    this.update(time);
};

Scene.prototype.disable = function() {

  window.cancelAnimationFrame(this.animationFrame);

  return this;
};

Scene.prototype.canvasResize = function()
{
  this.canvas = document.getElementById("fire");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  this.width = this.canvas.width;
  this.height = this.canvas.height;

  emitterPos = new Vector(this.width/2, this.height/2);

  this.ctx.clearRect(0, 0, this.width, this.height);
  //this.entities = new Array();

};

Scene.prototype.update = function(time) {
  this.draw();

  this.dt = time - this.current_time;
  this.current_time = time;

  //for (var i = 0; i < this.entities.length; i++) {

    this.emitter.step(this.dt);

    this.emitter.draw();
  //}


};

Scene.prototype.draw = function()
{
  if(settings.CLEAR)
  {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'transparent';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
};



var Emitter = function(position, ctx){
  this.init(position, ctx);
};

Emitter.prototype.init = function(position, ctx)
{
  this.particles = [];

  this.active = true;
  this.pos = position.duplicate();
  this.origPosition = this.pos.duplicate();
  this.positionVariance = new Vector();

  this.angle = degreesToRadians(settings.ANGLE);

  this.emitCounter = 0;
  this.elapsedTime = 0;

  this.duration = settings.DURATION;

  this.ctx = ctx;

  this.w = 0;
  this.h = 0;
};

Emitter.prototype.fire = function()
{

  var r_Pos = this.pos.duplicate();
  r_Pos.x = r_Pos.x + this.positionVariance.x*randomPosNeg();
  r_Pos.y = r_Pos.y + this.positionVariance.y*randomPosNeg();

  var r_Angle = this.angle + degreesToRadians(settings.ANGLE_VARIANCE*randomPosNeg());
  var r_Speed = settings.SPEED + settings.SPEED_VARIANCE*randomPosNeg();

  var r_Dir = new Vector(Math.cos(r_Angle), Math.sin(r_Angle)).multiply(r_Speed);

  var r_Size = settings.SIZE + settings.SIZE_VARIANCE*randomPosNeg();
  r_Size = r_Size < 0 ? 0 : ~~r_Size;

  var r_EndSize = settings.END_SIZE + settings.END_SIZE_VARIANCE*randomPosNeg();
  r_EndSize = r_EndSize < 0 ? 0 : ~~r_EndSize;

  var r_Life = settings.LIFE + settings.LIFE_VARIANCE*randomPosNeg();

  var r_DeltaSize = (r_EndSize - r_Size) / r_Life;

  var r_Sharp = settings.RADIAL_SHARPNESS + settings.RADIAL_SHARPNESS_VARIANCE*randomPosNeg();
  r_Sharp = r_Sharp > 100 ? 100 : r_Sharp < 0 ? 0 : r_Sharp;

  var r_Inner = ~~( ( r_Size / 200 ) * r_Sharp);


  var start = [
      settings.COLOR_R + settings.COLOR_R_VARIANCE * randomPosNeg(),
      settings.COLOR_G + settings.COLOR_G_VARIANCE * randomPosNeg(),
      settings.COLOR_B + settings.COLOR_B_VARIANCE * randomPosNeg(),
      settings.COLOR_A + settings.COLOR_A_VARIANCE * randomPosNeg()
    ];

    var end = [
      settings.END_COLOR_R + settings.END_COLOR_R_VARIANCE * randomPosNeg(),
      settings.END_COLOR_G + settings.END_COLOR_G_VARIANCE * randomPosNeg(),
      settings.END_COLOR_B + settings.END_COLOR_B_VARIANCE * randomPosNeg(),
      settings.END_COLOR_A + settings.END_COLOR_A_VARIANCE * randomPosNeg()
    ];

  var r_Color = start;

  var r_DeltaColor = [];
  r_DeltaColor[ 0 ] = ( end[ 0 ] - start[ 0 ] ) / r_Life;
  r_DeltaColor[ 1 ] = ( end[ 1 ] - start[ 1 ] ) / r_Life;
  r_DeltaColor[ 2 ] = ( end[ 2 ] - start[ 2 ] ) / r_Life;
  r_DeltaColor[ 3 ] = ( end[ 3 ] - start[ 3 ] ) / r_Life;



  //var p = this.pos.duplicate();
  //var a_vec = new Vector(Math.cos(r_Angle)* this.w, Math.sin(r_Angle) * this.w);
  //var barrel_pos = p.add(a_vec);

  var proj = new Particle(
    r_Pos,
    r_Dir,
    r_Size,
    r_DeltaSize,
    r_Life,
    r_Sharp,
    r_Inner,
    r_Color,
    r_DeltaColor,
    this.ctx
  );

  this.particles.push(proj);
};

Emitter.prototype.step = function(dt)
{
  this.pos = emitterPos;

  if(settings.FOLLOW_MOUSE)
    this.pos = mousePos;
  else
    this.pos = emitterPos;

  if(settings.ROTATION_SPEED != 0)
    this.angle += settings.ROTATION_SPEED*(Math.PI/180);
  else
    this.angle = degreesToRadians(settings.ANGLE);

  this.angle = wrapAngle(this.angle);
  settings.ANGLE = radiansToDegrees(this.angle);

  this.emissionRate = settings.MAX_PARTICLES / settings.LIFE;

  this.positionVariance.x = settings.X_VARIANCE;
  this.positionVariance.y = settings.Y_VARIANCE;

  this.duration = settings.DURATION;

  if(this.active && this.emissionRate > 0)
  {
    var rate = 1 / this.emissionRate;
    this.emitCounter += dt;

    while(this.particles.length < settings.MAX_PARTICLES && this.emitCounter > rate)
    {
      this.fire();
      this.emitCounter -= rate;
    }

    this.elapsedTime += dt;
    if( this.duration != -1 && this.duration < this.elapsedTime ){
        this.disable();
    }
  }

  for (var i = this.particles.length;i--;) {
    if(this.particles[i].dead)
    {
      this.particles.splice(i, 1);
      continue;
    }

    this.particles[i].step(dt);

    this.particles[i].draw();
  }
};

Emitter.prototype.draw = function(){

  //this.ctx.beginPath();
  //this.ctx.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI, false);
  //this.ctx.fillStyle = "#333";
  //this.ctx.fill();

};

Emitter.prototype.disable = function()
{
  this.active = false;
  this.elapsedTime = 0;
  this.emitCounter = 0;
}

Emitter.prototype.enable = function()
{
  this.active = true;
}


var Particle = function(position, velocity, size, deltaSize, life, sharpness, inner, color, deltaColor, ctx){
  this.init(position, velocity, size, deltaSize, life, sharpness, inner, color, deltaColor, ctx);
};

Particle.prototype.init = function(position, velocity, size, deltaSize, life, sharpness, inner, color, deltaColor, ctx){
  this.pos = position.duplicate();
  this.velocity = velocity.duplicate();
  this.size = size;
  this.deltaSize = deltaSize;
  this.lifeTime = life;
  this.color = color;
  this.drawColor = "";
  this.deltaColor = deltaColor;
  this.sharpness = sharpness;
  this.inner = inner;

  this.ctx = ctx;

  this.birth = Date.now();
  this.age = 1;
};

Particle.prototype.step = function(dt)
{
  this.age += dt;

  if(this.age > this.lifeTime)
  {
    this.dead = true;
    return;
  }

  this.velocity = this.velocity.add(this.gravitate());
  this.pos = this.pos.add(this.velocity);

  //kill it if our movement brought it out of the picture
  if(this.outOfBounds())
  {
    this.dead = true;
    return;
  }

  //update our sizes
  this.size += this.deltaSize*dt;
  if(settings.RADIAL)
    this.inner = ~~( ( this.size / 200 ) * this.sharpness);

  //linear easing the color...
  //would be cool to add different easing options, but that would require a lot more processing
  //as the delta would not be constant...
  var r = this.color[0] += ( this.deltaColor[0] * dt );
  var g = this.color[1] += ( this.deltaColor[1] * dt );
  var b = this.color[2] += ( this.deltaColor[2] * dt );
  var a = this.color[3] += ( this.deltaColor[3] * dt );

  //clamp 'em
  r = ( r > 255 ? 255 : r < 0 ? 0 : ~~r ),
  g = ( g > 255 ? 255 : g < 0 ? 0 : ~~g ),
  b = ( b > 255 ? 255 : b < 0 ? 0 : ~~b ),
  a = (a > 1 ? 1 : a < 0 ? 0 : a.toFixed( 2 ) );

  this.drawColor = 'rgba('+r+','+g+','+b+','+a+')';
  this.drawColorTransparent = 'rgba('+r+','+g+','+b+', 0)';
};

Particle.prototype.gravitate = function()
{
  var g = new Vector();

  g.add(new Vector(settings.GRAVITY_X/100, settings.GRAVITY_Y/100));

  return g;
};

Particle.prototype.outOfBounds = function()
{
  var yMin = 0 - this.size;
  var xMin = 0 - this.size;
  var xMax = this.ctx.canvas.width + this.size;
  var yMax = this.ctx.canvas.height + this.size;

  if(this.pos.x < xMin || this.pos.x > xMax)
      return true;

  if(this.pos.y < yMin || this.pos.y > yMax)
    return true;

  return false;
};

Particle.prototype.draw = function(){

  if(this.dead)
    return;

  if(settings.RADIAL)
  {
    var halfSize = this.size >> 1;
    var x = ~~(this.pos.x + halfSize / 2);
    var y = ~~(this.pos.y + halfSize / 2);

    var radgrad = this.ctx.createRadialGradient( x + halfSize, y + halfSize, this.inner, x + halfSize, y + halfSize, halfSize);
    radgrad.addColorStop( 0, this.drawColor );
    radgrad.addColorStop( 1, this.drawColorTransparent );

    this.ctx.save();
    this.ctx.globalCompositeOperation = settings.BLEND_MODE;
    this.ctx.fillStyle = radgrad;
    this.ctx.fillRect( x, y, this.size,  this.size );
    this.ctx.restore();

  }else{
    this.ctx.save();
    this.ctx.globalCompositeOperation = settings.BLEND_MODE;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.drawColor;
    this.ctx.arc(this.pos.x, this.pos.y, this.size/2, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.restore();
  }

};


export default function initialize() {
  scene = new Scene("fire");
  scene.enable();
}

/* support functions */
var randomPosNeg = function()
{
  return Math.random()*2-1;
}

var degreesToRadians = function (degrees)
{
  return (degrees*Math.PI)/180;
}

var radiansToDegrees = function (radians)
{
  return (radians*180)/Math.PI;
}

var wrapAngle = function(angle)
{
  while (angle < -Math.PI)
  {
        angle += Math.PI*2;
  }
  while (angle > Math.PI)
  {
      angle -= Math.PI*2;
  }

  return angle;
}

//vector object adapted from https://github.com/hornairs/blog/blob/master/assets/coffeescripts/flocking/vector.coffee
var Vector = (function() {
  var name, _fn, _i, _len, _ref;

  _ref = ['add', 'subtract', 'multiply', 'divide'];

  _fn = function(name) {
    return Vector[name] = function(a, b) {
      return a.duplicate()[name](b);
    };
  };

  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    name = _ref[_i];
    _fn(name);
  }

  function Vector(x, y) {

    if (x == null)
      x = 0;

    if (y == null)
      y = 0;

    this.x = x, this.y = y;
  }

  Vector.prototype.duplicate = function() {
    return new Vector(this.x, this.y);
  };

  Vector.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  Vector.prototype.normalize = function() {
    var m;

    m = this.magnitude();

    if (m > 0)
      this.divide(m);

    return this;
  };

  Vector.prototype.limit = function(max) {
    if (this.magnitude() > max) {
      this.normalize();

      return this.multiply(max);
    } else {

      return this;
    }
  };

  Vector.prototype.heading = function() {
    return -1 * Math.atan2(-1 * this.y, this.x);
  };

  Vector.prototype.eucl_distance = function(other) {
    var dx, dy;

    dx = this.x - other.x;
    dy = this.y - other.y;

    return Math.sqrt(dx * dx + dy * dy);
  };

  Vector.prototype.distance = function(other, dimensions) {
    var dx, dy;

    if (dimensions == null)
      dimensions = false;


    dx = Math.abs(this.x - other.x);
    dy = Math.abs(this.y - other.y);

    if (dimensions) {
      dx = dx < dimensions.width / 2 ? dx : dimensions.width - dx;
      dy = dy < dimensions.height / 2 ? dy : dimensions.height - dy;
    }

    return Math.sqrt(dx * dx + dy * dy);
  };

  Vector.prototype.subtract = function(other) {
    this.x -= other.x;
    this.y -= other.y;

    return this;
  };

  Vector.prototype.add = function(other) {
    this.x += other.x;
    this.y += other.y;

    return this;
  };

  Vector.prototype.divide = function(n) {
    this.x = this.x/n, this.y = this.y/n;

    return this;
  };

  Vector.prototype.multiply = function(n) {
    this.x = this.x*n, this.y = this.y*n;

    return this;
  };

  Vector.prototype.dot = function(other) {
    return this.x * other.x + this.y * other.y;
  };

  Vector.prototype.projectOnto = function(other) {
    return other.duplicate().multiply(this.dot(other));
  };

  Vector.prototype.wrapRelativeTo = function(position, dimensions) {
    var a, d, key, map_d, v, _ref1;

    v = this.duplicate();
    _ref1 = {
      x: "width",
      y: "height"
    };

    for (a in _ref1) {
      key = _ref1[a];
      d = this[a] - position[a];
      map_d = dimensions[key];
      if (Math.abs(d) > map_d / 2) {
        if (d > 0) {
          v[a] = (map_d - this[a]) * -1;
        } else {
          v[a] = this[a] + map_d;
        }
      }
    }
    return v;
  };

  Vector.prototype.invalid = function() {
    return (this.x === Infinity) || isNaN(this.x) || this.y === Infinity || isNaN(this.y);
  };

  return Vector;

})();