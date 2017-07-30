'use strict';

function BatteryTimer(game, maximumBattery) {
  this.game = game;
  this.maximumBattery = maximumBattery;
};

BatteryTimer.prototype.start = function() {
  this.battery = this.maximumBattery;
  this.batteryText = this.game.add.text(16, 16, 'BATTERY: ' + this.maximumBattery, { fontSize: '12px', fill: '#E99792' });
  this.batteryTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
  this.stopped = false;
};

BatteryTimer.prototype.tick = function() {
  this.battery -= 1;
  this.batteryText.text = 'BATTERY: ' + this.battery;
  if (this.battery == 0) {
    this.stop();
  }
};

BatteryTimer.prototype.stop = function() {
  this.game.time.events.remove(this.batteryTimer);
  this.stopped = true;
};

module.exports = BatteryTimer;
