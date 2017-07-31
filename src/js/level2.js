'use strict';

var Level2, BatteryTimer;

Level2 = {
  init: function(recycledItems) {
    BatteryTimer = recycledItems.batterytimer;
  },

  create: function () {
    this.game.add.sprite(0, 0, 'background:level2');

    this.timer = new BatteryTimer(this.game, 20);
    this.timer.start();
  },
};

module.exports = Level2;
