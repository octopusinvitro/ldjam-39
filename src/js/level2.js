'use strict';

var Level2, BatteryTimer;

Level2 = {
  init: function(recycledItems) {
    BatteryTimer = recycledItems.batterytimer;
  },

  create: function () {
    this.game.add.sprite(0, 0, 'background:level2');

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    this.ground = this.platforms.create(0, this.game.world.height - 100, 'ground');
    this.ground.body.immovable = true;

    this.platform = this.platforms.create(12, 290, 'platform');
    this.platform.body.immovable = true;

    this.timer = new BatteryTimer(this.game, 20);
    this.timer.start();
  },
};

module.exports = Level2;
