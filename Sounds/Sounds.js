/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sounds extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sounds/costumes/costume1.svg", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Sounds/sounds/pop.wav")];

    this.triggers = [];
  }
}
