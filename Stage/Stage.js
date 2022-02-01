/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("screen", "./Stage/costumes/screen.svg", {
        x: 240,
        y: 180.62866
      }),
      new Costume("black", "./Stage/costumes/black.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "fade out" },
        this.whenIReceiveFadeOut
      )
    ];

    this.vars.optionsVerticalScreens = "false";
    this.vars.styleHoverMessage = "Play your ROM!";
    this.vars.romTitle = "NDS.TinyFB";
    this.vars.arm7Cycles = 0;
    this.vars.arm9Cycles = 10;
    this.vars.displayScanX = 0;
    this.vars.displayScanY = 263;
    this.vars.arm7Rom = [4278190058];
    this.vars.arm9Rom = [
      17015011,
      51421411,
      36217059,
      2150670563,
      0,
      2684420096,
      68387045,
      2130149,
      1077051621,
      436576483,
      521183459,
      53059811,
      2987442400,
      17859042,
      18895586,
      4227858202,
      1346458451,
      4278190058
    ];
    this.vars.arm7Memory1 = [];
    this.vars.arm7Memory2 = [];
    this.vars.arm7Memory3 = [];
    this.vars.arm7Memory4 = [];
    this.vars.arm7Memory5 = [];
    this.vars.arm7Memory6 = [];
    this.vars.coreSharedWram = [];
    this.vars.arm7IoPorts = [];
    this.vars.arm7WirelessState0 = [];
    this.vars.arm7WirelessState1 = [];
    this.vars.arm7Vwram = [];
    this.vars.arm7Wram = [];
    this.vars.arm7Flags = ["false", "false", "false", "false"];
    this.vars.arm9Memory1 = [];
    this.vars.arm9Memory2 = [];
    this.vars.arm9Memory3 = [];
    this.vars.arm9Memory4 = [];
    this.vars.arm9Memory5 = [];
    this.vars.arm9Memory6 = [];
    this.vars.arm9IoPorts = [];
    this.vars.arm9StandardPalettes = [];
    this.vars.vramEngineABg = [];
    this.vars.vramEngineAObj = [];
    this.vars.vramEngineBBg = [];
    this.vars.vramEngineBObj = [];
    this.vars.vramLcdc = [];
    this.vars.oam = [];
    this.vars.displayScreen = [];
  }

  *whenGreenFlagClicked() {
    this.costume = "screen";
    this.effects.brightness = -100;
    for (let i = 0; i < 20; i++) {
      this.effects.brightness += 5;
      yield;
    }
    this.broadcast("settings");
  }

  *whenIReceiveFadeOut() {
    for (let i = 0; i < 20; i++) {
      this.effects.brightness += -5;
      yield;
    }
    this.costume = "black";
    this.effects.clear();
  }
}
