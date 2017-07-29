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

var PlayScene = {
  init: function (levelIndex) {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function () {
    var circuit, ground;

    this.game.add.sprite(0, 0, 'background:level1');
    this.game.add.sprite(380, this.game.world.height - 100 - 30, 'button');
    this.game.add.sprite(583, 180, 'light');
    this.game.add.sprite(583, 430, 'connector');

    // circuit = this.game.add.sprite(393, 198, 'circuit');
    circuit = this.game.add.sprite(393, 200, 'circuit');
    circuit.angle -= 45;

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    ground = this.platforms.create(0, this.game.world.height - 100, 'ground');
    ground.body.immovable = true;

    this.eye = this.game.add.sprite(32, this.game.world.height - 150, 'eye'),
    this.game.physics.arcade.enable(this.eye);
    this.eye.body.bounce.y = 0.2;
    this.eye.body.gravity.y = 300;
    this.eye.body.collideWorldBounds = true;
  },

  update: function () {
    this.game.physics.arcade.collide(this.eye, this.platforms);
  }
};

module.exports = PlayScene;

},{}]},{},[1]);
