'use strict';

var PlayScene = {
  create: function () {
    var circuit;

    this.game.add.sprite(0, 0, 'background:level1');
    this.game.add.sprite(380, 475, 'button');
    this.game.add.sprite(583, 180, 'light');
    this.game.add.sprite(583, 430, 'connector');

    // circuit = this.game.add.sprite(393, 198, 'circuit');
    circuit = this.game.add.sprite(393, 200, 'circuit');
    circuit.angle -= 45;
  }
};

module.exports = PlayScene;
