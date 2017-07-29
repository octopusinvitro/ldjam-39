(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    this.game.load.image('connector', 'images/connector.png');
    this.game.load.image('light', 'images/light.png');
    this.game.load.image('ground', 'images/ground.png');
    this.game.load.spritesheet('eye', 'images/eye.png', 32, 48);
  },

  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};

},{"./play_scene.js":2}],2:[function(require,module,exports){
'use strict';

var
  Button = require('./sprites/button.js'),
  Circuit = require('./sprites/circuit.js'),
  Eye = require('./sprites/eye.js'),
  PlayScene
;

PlayScene = {
  init: function (levelIndex) {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.groundPosition = this.game.world.height - 100;
  },

  create: function () {
    this.game.add.sprite(0, 0, 'background:level1');
    this.game.add.sprite(583, 180, 'light');

    this.connector = this.game.add.sprite(583, 430, 'connector');
    this.game.physics.arcade.enable(this.connector);
    this.connector.body.immovable = true;
    this.connector.body.customSeparateX = true;
    this.connector.body.customSeparateY = true;

    this.circuit = new Circuit(this.game, 393, 200);
    this.game.add.existing(this.circuit);

    this.ground = this.game.add.sprite(0, this.groundPosition, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;

    this.button = new Button(this.game, 380, this.groundPosition - 30);
    this.game.add.existing(this.button);

    this.eye = new Eye(this.game, 32, this.game.world.height - 150, this.keys);
    this.game.add.existing(this.eye);
  },

  update: function () {
    var hitGround = this.game.physics.arcade.collide(this.eye, this.ground);
    var hitButton = this.game.physics.arcade.collide(this.eye, this.button);
    var hitConnector = this.game.physics.arcade.collide(this.eye, this.connector);

    this.eye.update(hitGround);

    if (hitButton && this.button.body.touching.up) {
      this.button.press();
      this.circuit.close();
    }

    if (hitConnector && this.circuit.closed) {
      var centerX = this.connector.x + (this.connector.width/2);
      var centerY = this.connector.y + (this.connector.height/2);
      this.eye.charge(centerX, centerY);
    }
  }
};

module.exports = PlayScene;

},{"./sprites/button.js":3,"./sprites/circuit.js":4,"./sprites/eye.js":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
};

Eye.prototype = Object.create(Phaser.Sprite.prototype);
Eye.prototype.constructor = Eye;

Eye.prototype.update = function(hitGround) {
  this.body.velocity.x = 0;
  this._move();
  this._jump(hitGround);
};

Eye.prototype.charge = function(centerX, centerY) {
  this.x = centerX - (this.width/2);
  this.y = centerY - (this.height/2);
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

},{}]},{},[1]);
