'use strict';

var PlayScene = {
  init: function (levelIndex) {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.keys = this.game.input.keyboard.createCursorKeys();
  },

  create: function () {
    var circuit;

    this.game.add.sprite(0, 0, 'background:level1');
    this.game.add.sprite(583, 180, 'light');
    this.game.add.sprite(583, 430, 'connector');

    // circuit = this.game.add.sprite(393, 198, 'circuit');
    circuit = this.game.add.sprite(393, 200, 'circuit');
    circuit.angle -= 45;

    this.ground = this.game.add.sprite(0, this.game.world.height - 100, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;

    this.button = this.game.add.sprite(380, this.game.world.height - 100 - 30, 'button');
    this.game.physics.arcade.enable(this.button);
    this.button.body.immovable = true;

    this.eye = this.game.add.sprite(32, this.game.world.height - 150, 'eye'),
    this.game.physics.arcade.enable(this.eye);
    this.eye.body.bounce.y = 0.2;
    this.eye.body.gravity.y = 700;
    this.eye.body.collideWorldBounds = true;
    this.eye.animations.add('left', [0, 1, 2, 3], 10, true);
    this.eye.animations.add('right', [5, 6, 7, 8], 10, true);
  },

  update: function () {
    var hitGround = this.game.physics.arcade.collide(this.eye, this.ground);
    var hitButton = this.game.physics.arcade.collide(this.eye, this.button);

    this.eye.body.velocity.x = 0;

    if (this.keys.left.isDown) {
      this.eye.body.velocity.x = -300;
      this.eye.animations.play('left');
    } else if (this.keys.right.isDown) {
      this.eye.body.velocity.x = 300;
      this.eye.animations.play('right');
    } else {
      this.eye.animations.stop();
      this.eye.frame = 4;
    }

    if (this.keys.up.isDown && this.eye.body.touching.down && hitGround) {
      this.eye.body.velocity.y = -600;
    }
  }
};

module.exports = PlayScene;
