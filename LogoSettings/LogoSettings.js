/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class LogoSettings extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("screens", "./LogoSettings/costumes/screens.svg", {
        x: 81.75000499999999,
        y: 154
      }),
      new Costume("options", "./LogoSettings/costumes/options.svg", {
        x: 71.78830249999999,
        y: -70.69158999999999
      }),
      new Costume("small", "./LogoSettings/costumes/small.svg", { x: 0, y: 0 }),
      new Costume("big", "./LogoSettings/costumes/big.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./LogoSettings/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "settings" },
        this.whenIReceiveSettings
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "fade out" },
        this.whenIReceiveFadeOut
      )
    ];
  }

  *whenIReceiveSettings() {
    this.costume = "screens";
    this.effects.clear();
    this.visible = true;
    this.effects.ghost = 100;
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += -5;
      yield;
    }
    this.createClone();
  }

  *whenGreenFlagClicked() {
    /* TODO: Implement data_hidevariable */ null;
    this.goto(0, 0);
    this.size = 100;
    this.visible = false;
  }

  *startAsClone() {
    this.costume = "options";
    /* TODO: Implement looks_gotofrontback */ null;
    this.effects.ghost = 100;
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += -5;
      yield;
    }
    /* TODO: Implement data_showvariable */ null;
    while (true) {
      if (this.touching("mouse")) {
        if (this.mouse.x < -25) {
          this.stage.vars.styleHoverMessage = "Load a ROM";
          if (this.mouse.down) {
            yield* this.broadcastAndWait("load rom");
          }
        } else {
          if (this.mouse.x < 16) {
            this.stage.vars.styleHoverMessage = "Play your ROM!";
            if (this.mouse.down) {
              this.broadcast("fade out");
              this.deleteThisClone();
            }
          } else {
            this.stage.vars.styleHoverMessage = "Choose Some Settings!";
          }
        }
      } else {
        this.stage.vars.styleHoverMessage = 0;
      }
      this.broadcast("say something");
      yield;
    }
  }

  *whenIReceiveFadeOut() {
    /* TODO: Implement data_hidevariable */ null;
    this.effects.brightness = 0;
    for (let i = 0; i < 20; i++) {
      this.effects.brightness += 5;
      yield;
    }
    yield* this.wait(0.1);
    this.effects.ghost = 0;
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += 5;
      yield;
    }
    this.visible = false;
    this.broadcast("start game");
  }
}
