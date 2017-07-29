'use strict';

function Charger(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'charger');

  this.game.physics.arcade.enable(this);
  this.body.immovable = true;
  this.body.customSeparateX = true;
  this.body.customSeparateY = true;
};

Charger.prototype = Object.create(Phaser.Sprite.prototype);
Charger.prototype.constructor = Charger;

Charger.prototype.center = function() {
  return {
    x: this.x + (this.width/2),
    y: this.y + (this.height/2)
  };
};

module.exports = Charger;
