'use strict';

function BatteryTimer(game, maximumBattery) {
  this.game = game;
  this.maximumBattery = maximumBattery;
};

BatteryTimer.prototype.start = function() {
  this.battery = this.maximumBattery;
  this.batteryText = this._setText();
  this.batteryTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
  this.stopped = false;
};

BatteryTimer.prototype.tick = function() {
  this.battery -= 1;
  this.batteryText.text = this.battery;
  if (this.battery == 0) {
    this.stop();
  }
};

BatteryTimer.prototype.stop = function() {
  this.game.time.events.remove(this.batteryTimer);
  this.stopped = true;
};

BatteryTimer.prototype._setText = function() {
  var fontStyle = {
    font: '12px "Graduate"',
    fill: '#E99792',
    fontSize: '32px'
  };
  return this.game.add.text(64, 58, this.maximumBattery, fontStyle);
}

module.exports = BatteryTimer;
