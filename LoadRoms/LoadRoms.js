/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class LoadRoms extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./LoadRoms/costumes/costume1.svg", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("pop", "./LoadRoms/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "load rom" },
        this.whenIReceiveLoadRom
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.importChar = 12;
    this.vars.importAscii =
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    this.vars.importStatus = "Importing ARM7 ROM... 650%";
    this.vars.importReadReturn = 0;
    this.vars.importDummy = 4278190058;
    this.vars.importRomLength = 4;
    this.vars.Rom = [
      1313100590,
      1416195705,
      1178730496,
      589505315,
      0,
      65279,
      4293525504,
      4,
      1879048192,
      2,
      2,
      1140850688,
      369098752,
      32771,
      32771,
      67108864,
      2684420096,
      0,
      2684420096,
      0,
      0,
      0,
      0,
      0,
      6313984,
      4161280000,
      0,
      0,
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
      18895586,
      4244635418,
      1346458451,
      4278190058,
      0,
      0,
      0,
      3361755106,
      24154082,
      402599905,
      307171656,
      306978912,
      1684044898,
      807155996,
      273285360,
      351809642,
      2149167466,
      4067033328,
      200814699,
      2149167467,
      4067098864,
      150499434,
      2003502924,
      1616918599,
      122409496,
      2588084043,
      2450051608,
      216004422,
      82845669,
      16678658,
      4043276034,
      4026597376,
      4278255616,
      4,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      446594027
    ];
  }

  *whenIReceiveLoadRom() {
    yield* this.askAndWait(
      "Please paste your ROM! (Please leave blank if you have already imported it into the ROM variable!)"
    );
    yield* this.loadRom();
  }

  *loadRom() {
    /* TODO: Implement data_showvariable */ null;
    if (!(this.answer == 0)) {
      this.vars.Rom = [];
      if (this.answer[2 - 1] == "x") {
        this.vars.importChar = 1;
        for (let i = 0; i < this.answer.length / 24; i++) {
          this.vars.Rom.push(
            0 +
              ("" +
                "0x" +
                ("" +
                  ("" +
                    ("" +
                      this.answer[this.vars.importChar + 2 - 1] +
                      this.answer[this.vars.importChar + 3 - 1]) +
                    ("" +
                      this.answer[this.vars.importChar + 8 - 1] +
                      this.answer[this.vars.importChar + 9 - 1])) +
                  ("" +
                    ("" +
                      this.answer[this.vars.importChar + 14 - 1] +
                      this.answer[this.vars.importChar + 15 - 1]) +
                    ("" +
                      this.answer[this.vars.importChar + 20 - 1] +
                      this.answer[this.vars.importChar + 21 - 1]))))
          );
          this.vars.importStatus =
            "" +
            "Importing ROM as list... " +
            ("" +
              Math.round(1000 * (this.vars.importChar / this.answer.length)) /
                10 +
              "%");
          this.vars.importChar += 24;
        }
      } else {
        this.vars.importChar = 1;
        for (let i = 0; i < this.answer.length / 8; i++) {
          this.vars.Rom.push(
            0 +
              ("" +
                "0x" +
                ("" +
                  ("" +
                    ("" +
                      this.answer[this.vars.importChar - 1] +
                      this.answer[this.vars.importChar + 1 - 1]) +
                    ("" +
                      this.answer[this.vars.importChar + 2 - 1] +
                      this.answer[this.vars.importChar + 3 - 1])) +
                  ("" +
                    ("" +
                      this.answer[this.vars.importChar + 4 - 1] +
                      this.answer[this.vars.importChar + 5 - 1]) +
                    ("" +
                      this.answer[this.vars.importChar + 6 - 1] +
                      this.answer[this.vars.importChar + 7 - 1]))))
          );
          this.vars.importStatus =
            "" +
            "Importing ROM as list... " +
            ("" +
              Math.round(1000 * (this.vars.importChar / this.answer.length)) /
                10 +
              "%");
          this.vars.importChar += 8;
        }
      }
    }
    this.stage.vars.arm9Rom = [];
    yield* this.readByte(32);
    this.vars.importChar = this.vars.importReadReturn;
    yield* this.readByte(44);
    this.vars.importRomLength = this.vars.importReadReturn;
    for (let i = 0; i < this.vars.importRomLength / 4; i++) {
      this.vars.importDummy = 0;
      for (let i = 0; i < 4; i++) {
        yield* this.readByte(this.vars.importChar);
        this.vars.importDummy =
          256 * this.vars.importDummy + this.vars.importReadReturn;
        this.vars.importChar += 1;
      }
      this.stage.vars.arm9Rom.push(this.vars.importDummy);
      this.vars.importStatus =
        "" +
        "Importing ARM9 ROM... " +
        ("" +
          Math.round(
            1000 * (this.vars.importChar / this.vars.importRomLength)
          ) /
            10 +
          "%");
    }
    this.stage.vars.arm7Rom = [];
    yield* this.readByte(48);
    this.vars.importChar = this.vars.importReadReturn;
    yield* this.readByte(60);
    this.vars.importRomLength = this.vars.importReadReturn;
    for (let i = 0; i < this.vars.importRomLength / 4; i++) {
      this.vars.importDummy = 0;
      for (let i = 0; i < 4; i++) {
        yield* this.readByte(this.vars.importChar);
        this.vars.importDummy =
          256 * this.vars.importDummy + this.vars.importReadReturn;
        this.vars.importChar += 1;
      }
      this.stage.vars.arm7Rom.push(this.vars.importDummy);
      this.vars.importStatus =
        "" +
        "Importing ARM7 ROM... " +
        ("" +
          Math.round(
            1000 * (this.vars.importChar / this.vars.importRomLength)
          ) /
            10 +
          "%");
    }
    this.stage.vars.romTitle = 0;
    this.vars.importChar = 0;
    for (let i = 0; i < 12; i++) {
      yield* this.readByte(this.vars.importChar);
      this.stage.vars.romTitle =
        "" +
        this.stage.vars.romTitle +
        this.vars.importAscii[this.vars.importReadReturn - 31 - 1];
      this.vars.importChar += 1;
    }
    /* TODO: Implement data_hidevariable */ null;
  }

  *whenGreenFlagClicked() {
    /* TODO: Implement data_hidevariable */ null;
  }

  *readByte(addr17) {
    this.vars.importReadReturn = Math.floor(
      (this.vars.Rom[1 + Math.floor(addr17 / 4) - 1] /
        Math.round(Math.E ** (5.545177444479562 * (3 - (addr17 % 4))))) %
        256
    );
  }
}
