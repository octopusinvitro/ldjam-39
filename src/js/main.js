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
    this.game.load.image('background:level1', 'images/bg1.jpg');
    this.game.load.image('button1', 'images/button1.gif');
    this.game.load.image('circuit', 'images/circuit.gif');
    this.game.load.image('charger', 'images/charger.png');
    this.game.load.spritesheet('light', 'images/light.png', 40, 40);
    this.game.load.image('ground', 'images/ground.jpg');
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
