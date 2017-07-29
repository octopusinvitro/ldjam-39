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
