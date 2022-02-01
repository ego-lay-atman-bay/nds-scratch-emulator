/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SayStuffAtMouse extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./SayStuffAtMouse/costumes/costume1.svg", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("pop", "./SayStuffAtMouse/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "say something" },
        this.whenIReceiveSaySomething
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "fade out" },
        this.whenIReceiveFadeOut
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.say(0);
  }

  *whenIReceiveSaySomething() {
    this.goto(this.mouse.x, this.mouse.y);
    this.say(this.stage.vars.styleHoverMessage);
  }

  *whenIReceiveFadeOut() {
    this.say(0);
  }
}
