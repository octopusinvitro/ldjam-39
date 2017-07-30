(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function BatteryTimer(game, maximumBattery) {
  this.game = game;
  this.maximumBattery = maximumBattery;
};

BatteryTimer.prototype.start = function() {
  this.battery = this.maximumBattery;
  this.batteryText = this.game.add.text(16, 16, 'BATTERY: ' + this.maximumBattery, { fontSize: '12px', fill: '#E99792' });
  this.batteryTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
  this.stopped = false;
};

BatteryTimer.prototype.tick = function() {
  this.battery -= 1;
  this.batteryText.text = 'BATTERY: ' + this.battery;
  if (this.battery == 0) {
    this.stop();
  }
};

BatteryTimer.prototype.stop = function() {
  this.game.time.events.remove(this.batteryTimer);
  this.stopped = true;
};

module.exports = BatteryTimer;

},{}],2:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // image assets
    // this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('background:level1', 'images/bg1.png');
    this.game.load.image('button', 'images/button.png');
    this.game.load.image('circuit', 'images/circuit.png');
    this.game.load.image('charger', 'images/charger.png');
    this.game.load.image('light', 'images/light.png');
    this.game.load.image('ground', 'images/ground.png');
    this.game.load.spritesheet('eye', 'images/eye.png', 32, 48);
  },

  create: function () {
    this.game.state.start('play', true, false, 1);
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};

},{"./play_scene.js":3}],3:[function(require,module,exports){
'use strict';

var
  Button = require('./sprites/button.js'),
  Circuit = require('./sprites/circuit.js'),
  Charger = require('./sprites/charger.js'),
  Eye = require('./sprites/eye.js'),
  BatteryTimer = require('./battery_timer.js'),
  PlayScene
;

PlayScene = {
  init: function (levelIndex) {
    this.currentLevel = levelIndex;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.keys = this.game.input.keyboard.createCursorKeys();
  },

  create: function () {
    this.game.add.sprite(0, 0, 'background:level1');
    this.game.add.sprite(583, 180, 'light');

    this.charger = new Charger(this.game, 583, 430);
    this.game.add.existing(this.charger);

    this.circuit = new Circuit(this.game, 393, 200);
    this.game.add.existing(this.circuit);

    this.ground = this.game.add.sprite(0, this.game.world.height - 100, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;

    this.button = new Button(this.game, 380, this.game.world.height - 100 - 30);
    this.game.add.existing(this.button);

    this.eye = new Eye(this.game, 32, this.game.world.height - 150, this.keys);
    this.game.add.existing(this.eye);

    this.timer = new BatteryTimer(this.game, 10);
    this.timer.start();
  },

  update: function () {
    var
      hitGround = this.game.physics.arcade.collide(this.eye, this.ground),
      hitButton = this.game.physics.arcade.collide(this.eye, this.button),
      hitCharger = this.game.physics.arcade.collide(this.eye, this.charger)
    ;

    this.eye.update(hitGround);

    if (hitButton && this.button.body.touching.up) {
      this.button.press();
      this.circuit.close();
    }

    if (this.timer.stopped && !this.circuit.closed) {
      this.repeatLevel();
    }

    if (hitCharger && this.circuit.closed) {
      this.eye.charge(this.charger.center());
      this.timer.stop();
      this.game.time.events.add(this.eye.chargeTimeInSeconds, this.nextLevel, this);
    }
  },

  repeatLevel: function () {
    this.game.state.restart(true, false, this.currentLevel);
  },

  nextLevel: function () {
    this.game.state.restart(true, false, this.currentLevel + 1);
  },
};

module.exports = PlayScene;

},{"./battery_timer.js":1,"./sprites/button.js":4,"./sprites/charger.js":5,"./sprites/circuit.js":6,"./sprites/eye.js":7}],4:[function(require,module,exports){
'use strict';

function Button(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'button');

  this.game.physics.arcade.enable(this);
  this.body.immovable = true;
  this.body.collideWorldBounds = true;
};

Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.press = function() {
  this.y += this.height;
};

module.exports = Button;

},{}],5:[function(require,module,exports){
'use strict';

function Charger(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'charger');

  this.game.physics.arcade.enable(this);
  this.body.immovable = true;
  this.body.customSeparateX = true;
  this.body.customSeparateY = true;
};

Charger.prototype = Object.create(Phaser.Sprite.prototype);
Charger.prototype.constructor = Charger;

Charger.prototype.center = function() {
  return {
    x: this.x + (this.width/2),
    y: this.y + (this.height/2)
  };
};

module.exports = Charger;

},{}],6:[function(require,module,exports){
'use strict';

function Circuit(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'circuit');
  this.angle = -45;
  this.closed = false;
};

Circuit.prototype = Object.create(Phaser.Sprite.prototype);
Circuit.prototype.constructor = Circuit;

Circuit.prototype.close = function() {
  this.x = 393;
  this.y = 198;
  this.angle = 0;
  this.closed = true;
};

module.exports = Circuit;

},{}],7:[function(require,module,exports){
'use strict';

function Eye(game, x, y, keys) {
  Phaser.Sprite.call(this, game, x, y, 'eye');
  this.keys = keys;

  this.game.physics.arcade.enable(this);
  this.body.setSize(32, 48);
  this.body.bounce.y = 0.2;
  this.body.gravity.y = 700;
  this.body.collideWorldBounds = true;

  this.animations.add('left', [0, 1, 2, 3], 10, true);
  this.animations.add('right', [5, 6, 7, 8], 10, true);

  this.chargeTimeInSeconds = Phaser.Timer.SECOND * 4;
};

Eye.prototype = Object.create(Phaser.Sprite.prototype);
Eye.prototype.constructor = Eye;

Eye.prototype.update = function(hitGround) {
  this.body.velocity.x = 0;
  this._move();
  this._jump(hitGround);
};

Eye.prototype.charge = function(center) {
  this.x = center.x - (this.width/2);
  this.y = center.y - (this.height/2);
};

Eye.prototype._move = function() {
  if (this.keys.left.isDown) {
    this.body.velocity.x = -300;
    this.animations.play('left');
  } else if (this.keys.right.isDown) {
    this.body.velocity.x = 300;
    this.animations.play('right');
  } else {
    this.animations.stop();
    this.frame = 4;
  }
};

Eye.prototype._jump = function(hitGround) {
  if (this.keys.up.isDown && this.body.touching.down && hitGround) {
    this.body.velocity.y = -600;
  }
};

module.exports = Eye;

},{}]},{},[2]);
