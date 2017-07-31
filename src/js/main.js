'use strict';

var
  startGame,
  BootScene,
  PreloaderScene,
  Level1 = require('./level1.js'),
  Level2 = require('./level2.js')
;


BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // image assets
    // this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('background:level1', 'images/bg1.jpg');
    this.game.load.image('background:level2', 'images/bg2.jpg');
    this.game.load.image('button1', 'images/button1.gif');
    this.game.load.image('circuit', 'images/circuit.gif');
    this.game.load.image('charger', 'images/charger.png');
    this.game.load.spritesheet('light', 'images/light.png', 40, 39);
    this.game.load.image('ground', 'images/ground.jpg');
    this.game.load.spritesheet('eye', 'images/eye.png', 32, 48);

    // audio assets
    var sfx = {
      'jump': 'jump.wav',
      'timeover': 'timeover.wav',
      'on': 'on.wav',
      'charge': 'charge.wav',
      'background': 'background.ogg'
    };
    Object.keys(sfx).forEach(function (key) {
      this.game.load.audio(key, 'audio/' + sfx[key]);
    }.bind(this));
  },

  create: function () {
    this.game.state.start('level1', true, false);
  }
};


startGame = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('level1', Level1);
  game.state.add('level2', Level2);

  game.state.start('boot');
};

window.onload = function () {
  document.getElementById('play').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('overlay').style.display = 'none';
    startGame();
  });
};
