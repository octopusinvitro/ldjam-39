'use strict';

var Eye = require('./sprites/eye.js');

var PlayScene = {
  init: function (levelIndex) {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.groundPosition = this.game.world.height - 100;
    this.buttonPosition = this.groundPosition - 30
  },

  create: function () {
    this.game.add.sprite(0, 0, 'background:level1');
    this.game.add.sprite(583, 180, 'light');
    this.game.add.sprite(583, 430, 'connector');

    this.circuit = this.game.add.sprite(393, 200, 'circuit');
    this.circuit.angle = -45;

    this.ground = this.game.add.sprite(0, this.groundPosition, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;

    this.button = this.game.add.sprite(380, this.buttonPosition, 'button');
    this.game.physics.arcade.enable(this.button);
    this.button.body.immovable = true;

    this.eye = new Eye(this.game, 32, this.game.world.height - 150, this.keys);
    this.game.add.existing(this.eye);
  },

  update: function () {
    var hitGround = this.game.physics.arcade.collide(this.eye, this.ground);
    var hitButton = this.game.physics.arcade.collide(this.eye, this.button);

    this.eye.update(hitGround);

    if (hitButton && this.button.body.touching.up) {
      this.button.y += this.button.height;
      this.circuit.x = 393;
      this.circuit.y = 198;
      this.circuit.angle = 0;
    }
  }
};

module.exports = PlayScene;
