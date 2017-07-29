'use strict';

var
  Button = require('./sprites/button.js'),
  Circuit = require('./sprites/circuit.js'),
  Connector = require('./sprites/connector.js'),
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

    this.connector = new Connector(this.game, 583, 430);
    this.game.add.existing(this.connector);

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
      this.eye.charge(this.connector.center());
    }
  }
};

module.exports = PlayScene;
