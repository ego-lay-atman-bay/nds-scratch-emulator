/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Screens extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Screens/costumes/costume1.svg", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Screens/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "render_screen" },
        this.whenIReceiveRenderScreen
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "1" }, this.whenKey1Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "2" }, this.whenKey2Pressed)
    ];

    this.vars.x5 = 256;
    this.vars.y5 = 192;
    this.vars.arm9ReadReturn2 = 0;
    this.vars.arm7ReadReturn2 = 0;
    this.vars.coreByteReturn2 = 0;
    this.vars.renderDummy = 49183;
  }

  *gotoPixelAtOnScreen(x6, y6, screen) {
    if (this.stage.vars.optionsVerticalScreens == "true") {
      this.goto(
        Math.round(x6 / 1.06666667 - 240 * (1 - screen)),
        Math.round(102.4 - y6 / 1.06666667)
      );
    } else {
      this.goto(
        Math.round(x6 / 1.06666667 - 120),
        Math.round(180 - y6 / 1.06666667 - 180 * screen)
      );
    }
  }

  *whenGreenFlagClicked() {
    this.clearPen();
    this.penSize = 2;
  }

  *whenIReceiveRenderScreen() {
    yield* this.displayRenderScreen();
  }

  *arm9ListReadMemory(addr13) {
    if (addr13 > 102760447) {
      if (addr13 > 117440511) {
        if (addr13 > 134217727) {
          null;
        } else {
          this.vars.arm9ReadReturn2 = this.stage.vars.oam[
            1 + Math.floor((addr13 - 117440512) / 4) - 1
          ];
        }
      } else {
        if (addr13 > 106954751) {
          if (addr13 > 109051903) {
            this.vars.arm9ReadReturn2 = this.stage.vars.vramLcdc[
              1 + Math.floor((addr13 - 109051904) / 4) - 1
            ];
          } else {
            this.vars.arm9ReadReturn2 = this.stage.vars.vramEngineBObj[
              1 + Math.floor((addr13 - 106954752) / 4) - 1
            ];
          }
        } else {
          if (addr13 > 104857599) {
            this.vars.arm9ReadReturn2 = this.stage.vars.vramEngineAObj[
              1 + Math.floor((addr13 - 104857600) / 4) - 1
            ];
          } else {
            this.vars.arm9ReadReturn2 = this.stage.vars.vramEngineBBg[
              1 + Math.floor((addr13 - 102760448) / 4) - 1
            ];
          }
        }
      }
    } else {
      if (addr13 > 67108863) {
        if (addr13 > 100663295) {
          this.vars.arm9ReadReturn2 = this.stage.vars.vramEngineABg[
            1 + Math.floor((addr13 - 100663296) / 4) - 1
          ];
        } else {
          if (addr13 > 83886079) {
            this.vars.arm9ReadReturn2 = this.stage.vars.arm9StandardPalettes[
              1 + Math.floor((addr13 - 83886080) / 4) - 1
            ];
          } else {
            this.vars.arm9ReadReturn2 = this.stage.vars.arm9IoPorts[
              1 + Math.floor((addr13 - 67108864) / 4) - 1
            ];
          }
        }
      } else {
        if (addr13 > 33554431) {
          if (addr13 > 50331647) {
            this.vars.arm9ReadReturn2 = this.stage.vars.coreSharedWram[
              1 + Math.floor((addr13 - 50331648) / 4) - 1
            ];
          } else {
            if (addr13 > 34354431) {
              if (addr13 > 34554431) {
                if (addr13 > 34754431) {
                  this.vars.arm9ReadReturn2 = this.stage.vars.arm9Memory6[
                    1 + Math.floor((addr13 - 34754432) / 4) - 1
                  ];
                } else {
                  this.vars.arm9ReadReturn2 = this.stage.vars.arm9Memory5[
                    1 + Math.floor((addr13 - 34554432) / 4) - 1
                  ];
                }
              } else {
                this.vars.arm9ReadReturn2 = this.stage.vars.arm9Memory4[
                  1 + Math.floor((addr13 - 34354432) / 4) - 1
                ];
              }
            } else {
              if (addr13 > 33754431) {
                if (addr13 > 34154431) {
                  this.vars.arm9ReadReturn2 = this.stage.vars.arm9Memory3[
                    1 + Math.floor((addr13 - 34154432) / 4) - 1
                  ];
                } else {
                  this.vars.arm9ReadReturn2 = this.stage.vars.arm9Memory2[
                    1 + Math.floor((addr13 - 33754432) / 4) - 1
                  ];
                }
              } else {
                this.vars.arm9ReadReturn2 = this.stage.vars.arm9Memory1[
                  1 + Math.floor((addr13 - 33554432) / 4) - 1
                ];
              }
            }
          }
        } else {
          if (addr13 > "0xXXXXFFFF") {
            null;
          } else {
            null;
          }
        }
      }
    }
  }

  *arm7ListReadMemory(addr14) {
    if (addr14 > 100663295) {
      if (addr14 > 134217727) {
        if (addr14 > 167772159) {
          null;
        } else {
          null;
        }
      } else {
        this.vars.arm7ReadReturn2 = this.stage.vars.arm7Vwram[
          1 + Math.floor((addr14 - 100663296) / 4) - 1
        ];
      }
    } else {
      if (addr14 > 58720255) {
        if (addr14 > 67108863) {
          if (addr14 > 75497471) {
            if (addr14 > 75530239) {
              this.vars.arm7ReadReturn2 = this.stage.vars.arm7WirelessState1[
                1 + Math.floor((addr14 - 75530240) / 4) - 1
              ];
            } else {
              this.vars.arm7ReadReturn2 = this.stage.vars.arm7WirelessState0[
                1 + Math.floor((addr14 - 75497472) / 4) - 1
              ];
            }
          } else {
            this.vars.arm7ReadReturn2 = this.stage.vars.arm7IoPorts[
              1 + Math.floor((addr14 - 67108864) / 4) - 1
            ];
          }
        } else {
          this.vars.arm7ReadReturn2 = this.stage.vars.arm7Wram[
            1 + Math.floor((addr14 - 58720256) / 4) - 1
          ];
        }
      } else {
        if (addr14 > 50331647) {
          this.vars.arm7ReadReturn2 = this.stage.vars.coreSharedWram[
            1 + Math.floor((addr14 - 50331648) / 4) - 1
          ];
        } else {
          if (addr14 > 34354431) {
            if (addr14 > 34554431) {
              if (addr14 > 34754431) {
                this.vars.arm7ReadReturn2 = this.stage.vars.arm7Memory6[
                  1 + Math.floor((addr14 - 34754432) / 4) - 1
                ];
              } else {
                this.vars.arm7ReadReturn2 = this.stage.vars.arm7Memory5[
                  1 + Math.floor((addr14 - 34554432) / 4) - 1
                ];
              }
            } else {
              this.vars.arm7ReadReturn2 = this.stage.vars.arm7Memory4[
                1 + Math.floor((addr14 - 34354432) / 4) - 1
              ];
            }
          } else {
            if (addr14 > 33754431) {
              if (addr14 > 34154431) {
                this.vars.arm7ReadReturn2 = this.stage.vars.arm7Memory3[
                  1 + Math.floor((addr14 - 34154432) / 4) - 1
                ];
              } else {
                this.vars.arm7ReadReturn2 = this.stage.vars.arm7Memory2[
                  1 + Math.floor((addr14 - 33754432) / 4) - 1
                ];
              }
            } else {
              this.vars.arm7ReadReturn2 = this.stage.vars.arm7Memory1[
                1 + Math.floor((addr14 - 33554432) / 4) - 1
              ];
            }
          }
        }
      }
    }
  }

  *arm7ReadByte(addr15) {
    yield* this.arm7ListReadMemory(addr15);
    yield* this.coreGetByte(this.vars.arm7ReadReturn2, addr15 % 4);
    this.vars.arm7ReadReturn2 = this.vars.coreByteReturn2;
  }

  *arm9ReadByte(addr16) {
    yield* this.arm9ListReadMemory(addr16);
    yield* this.coreGetByte(this.vars.arm9ReadReturn2, addr16 % 4);
    this.vars.arm9ReadReturn2 = this.vars.coreByteReturn2;
  }

  *coreGetByte(number2, byte2) {
    this.vars.coreByteReturn2 = Math.floor(
      (number2 /
        Math.round(Math.E ** (5.545177444479562 * (3 - (byte2 % 4))))) %
        256
    );
  }

  *displayRenderScreen() {
    this.vars.y5 = 0;
    for (let i = 0; i < 192; i++) {
      this.vars.x5 = 0;
      for (let i = 0; i < 256; i++) {
        yield* this.gotoPixelAtOnScreen(this.vars.x5, this.vars.y5, 0);
        this.vars.renderDummy = this.stage.vars.displayScreen[
          1 + (this.vars.x5 + 256 * this.vars.y5) - 1
        ];
        this.penColor = Color.num(
          524288 * (this.vars.renderDummy % 32) +
            (2048 * (Math.floor(this.vars.renderDummy / 32) % 32) +
              8 * (Math.floor(this.vars.renderDummy / 1024) % 32))
        );
        this.penDown = true;
        this.vars.x5 += 1;
      }
      this.penDown = false;
      this.vars.y5 += 1;
    }
  }

  *whenKey1Pressed() {
    this.clearPen();
    this.stage.vars.optionsVerticalScreens = "false";
    yield* this.displayRenderScreen();
  }

  *whenKey2Pressed() {
    this.clearPen();
    this.stage.vars.optionsVerticalScreens = "true";
    yield* this.displayRenderScreen();
  }
}
