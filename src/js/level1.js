'use strict';

var
  Button = require('./sprites/button.js'),
  Circuit = require('./sprites/circuit.js'),
  Charger = require('./sprites/charger.js'),
  Eye = require('./sprites/eye.js'),
  Light = require('./sprites/light.js'),
  BatteryTimer = require('./battery_timer.js'),
  Level1
;

Level1 = {
  init: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.sfx = {
      jump: this.game.add.audio('jump'),
      timeover: this.game.add.audio('timeover'),
      on: this.game.add.audio('on'),
      charge: this.game.add.audio('charge')
    };
    this.backgroundMusic = this.game.add.audio('background');
    this.backgroundMusic.fadeIn(1200, true);
    this.backgroundMusic.play();
  },

  create: function () {
    this.game.add.sprite(0, 0, 'background:level1');

    this.light = new Light(this.game, 583, 180);
    this.game.add.existing(this.light);

    this.charger = new Charger(this.game, 583, 430);
    this.game.add.existing(this.charger);

    this.circuit = new Circuit(this.game, 393, 200);
    this.game.add.existing(this.circuit);

    this.button = new Button(this.game, 380, this.game.world.height - 100 - 30, 'button1');
    this.game.add.existing(this.button);

    this.ground = this.game.add.sprite(0, this.game.world.height - 100, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;

    this.eye = new Eye(this.game, 32, this.game.world.height - 150, this.keys, this.sfx);
    this.game.add.existing(this.eye);

    this.timer = new BatteryTimer(this.game, 10);
    this.timer.start();

    this.recycledItems = {
      batterytimer: BatteryTimer,
    };
  },

  update: function () {
    var
      hitGround = this.game.physics.arcade.collide(this.eye, this.ground),
      hitButton = this.game.physics.arcade.collide(this.eye, this.button),
      hitCharger = this.game.physics.arcade.collide(this.eye, this.charger)
    ;

    this.eye.update(hitGround);

    if (hitButton && this.button.body.touching.up) {
      this.sfx.on.play();
      this.button.press();
      this.circuit.close();
      this.light.turnOn();
    }

    if (this.timer.stopped && !this.circuit.closed) {
      this.sfx.timeover.play();
      this.repeatLevel();
    }

    if (hitCharger && this.circuit.closed) {
      this.sfx.charge.play();
      this.eye.charge(this.charger.center());
      this.timer.stop();
      this.game.time.events.add(this.eye.chargeTimeInSeconds, this.nextLevel, this);
    }
  },

  repeatLevel: function () {
    this.backgroundMusic.stop();
    this.game.state.restart(true, false);
  },

  nextLevel: function () {
    this.backgroundMusic.stop();
    this.game.state.start('level2', true, false, this.recycledItems);
  },
};

module.exports = Level1;
