'use strict';

function Connector(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'connector');

  this.game.physics.arcade.enable(this);
  this.body.immovable = true;
  this.body.customSeparateX = true;
  this.body.customSeparateY = true;
};

Connector.prototype = Object.create(Phaser.Sprite.prototype);
Connector.prototype.constructor = Connector;

Connector.prototype.center = function() {
  return {
    x: this.x + (this.width/2),
    y: this.y + (this.height/2)
  };
};

module.exports = Connector;
