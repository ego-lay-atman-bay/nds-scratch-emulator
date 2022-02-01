/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class CoreArm7Arm9 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./CoreArm7Arm9/costumes/costume1.svg", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("pop", "./CoreArm7Arm9/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "start game" },
        this.whenIReceiveStartGame
      )
    ];

    this.vars.arm7Pc = 1;
    this.vars.arm9Pc = 18;
    this.vars.coreByteReturn = 31;
    this.vars.arm7ReadReturn = 0;
    this.vars.coreConditionTest = "true";
    this.vars.coreInstructionFormat = 10;
    this.vars.coreLittleEndian = 3942645758;
    this.vars.coreDummyOp = 0;
    this.vars.coreReadReturn = 3;
    this.vars.coreDummy = 192;
    this.vars.coreDummy2 = 49183;
    this.vars.arm9ReadReturn = 31;
    this.vars.coreShiftReturn = 85899345920;
    this.vars.coreRotateReturn = 20;
    this.vars.coreOpDummy2 = 20;
    this.vars.coreOpDummy = 4294967295;
    this.vars.arm7Registers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.vars.arm9Registers = [];
    this.vars.arm9Flags = [true, "false", "false", "false"];
  }

  *whenIReceiveStartGame() {
    yield* this.coreResetMemory();
    this.vars.arm7Pc = 1;
    this.vars.arm9Pc = 1;
    this.stage.vars.arm7Cycles = 0;
    this.stage.vars.arm9Cycles = 0;
    this.restartTimer();
    yield* this.emulateFrame();
    this.broadcast("render_screen");
    this.say(this.timer);
    while (true) {
      null;
      yield;
    }
  }

  *arm7ListReadMemory(addr) {
    if (addr > 100663295) {
      if (addr > 134217727) {
        if (addr > 167772159) {
          null;
        } else {
          null;
        }
      } else {
        this.vars.arm7ReadReturn = this.stage.vars.arm7Vwram[
          1 + Math.floor((addr - 100663296) / 4) - 1
        ];
      }
    } else {
      if (addr > 58720255) {
        if (addr > 67108863) {
          if (addr > 75497471) {
            if (addr > 75530239) {
              this.vars.arm7ReadReturn = this.stage.vars.arm7WirelessState1[
                1 + Math.floor((addr - 75530240) / 4) - 1
              ];
            } else {
              this.vars.arm7ReadReturn = this.stage.vars.arm7WirelessState0[
                1 + Math.floor((addr - 75497472) / 4) - 1
              ];
            }
          } else {
            this.vars.arm7ReadReturn = this.stage.vars.arm7IoPorts[
              1 + Math.floor((addr - 67108864) / 4) - 1
            ];
          }
        } else {
          this.vars.arm7ReadReturn = this.stage.vars.arm7Wram[
            1 + Math.floor((addr - 58720256) / 4) - 1
          ];
        }
      } else {
        if (addr > 50331647) {
          this.vars.arm7ReadReturn = this.stage.vars.coreSharedWram[
            1 + Math.floor((addr - 50331648) / 4) - 1
          ];
        } else {
          if (addr > 34354431) {
            if (addr > 34554431) {
              if (addr > 34754431) {
                this.vars.arm7ReadReturn = this.stage.vars.arm7Memory6[
                  1 + Math.floor((addr - 34754432) / 4) - 1
                ];
              } else {
                this.vars.arm7ReadReturn = this.stage.vars.arm7Memory5[
                  1 + Math.floor((addr - 34554432) / 4) - 1
                ];
              }
            } else {
              this.vars.arm7ReadReturn = this.stage.vars.arm7Memory4[
                1 + Math.floor((addr - 34354432) / 4) - 1
              ];
            }
          } else {
            if (addr > 33754431) {
              if (addr > 34154431) {
                this.vars.arm7ReadReturn = this.stage.vars.arm7Memory3[
                  1 + Math.floor((addr - 34154432) / 4) - 1
                ];
              } else {
                this.vars.arm7ReadReturn = this.stage.vars.arm7Memory2[
                  1 + Math.floor((addr - 33754432) / 4) - 1
                ];
              }
            } else {
              this.vars.arm7ReadReturn = this.stage.vars.arm7Memory1[
                1 + Math.floor((addr - 33554432) / 4) - 1
              ];
            }
          }
        }
      }
    }
  }

  *coreGetByte(number, byte) {
    this.vars.coreByteReturn = Math.floor(
      (number / Math.round(Math.E ** (5.545177444479562 * (3 - (byte % 4))))) %
        256
    );
  }

  *coreResetMemory() {
    this.stage.vars.arm7Memory1 = [];
    this.stage.vars.arm7Memory2 = [];
    this.stage.vars.arm7Memory3 = [];
    this.stage.vars.arm7Memory4 = [];
    this.stage.vars.arm7Memory5 = [];
    for (let i = 0; i < 200000; i++) {
      this.stage.vars.arm7Memory1.push(0);
      this.stage.vars.arm7Memory2.push(0);
      this.stage.vars.arm7Memory3.push(0);
      this.stage.vars.arm7Memory4.push(0);
      this.stage.vars.arm7Memory5.push(0);
    }
    this.stage.vars.arm7Memory6 = [];
    for (let i = 0; i < 48576; i++) {
      this.stage.vars.arm7Memory6.push(0);
    }
    this.stage.vars.coreSharedWram = [];
    for (let i = 0; i < 8192; i++) {
      this.stage.vars.coreSharedWram.push(0);
    }
    this.stage.vars.arm7Wram = [];
    for (let i = 0; i < 16384; i++) {
      this.stage.vars.arm7Wram.push(0);
    }
    this.stage.vars.arm7IoPorts = [];
    for (let i = 0; i < 101; i++) {
      this.stage.vars.arm7IoPorts.push(0);
    }
    this.stage.vars.arm7WirelessState0 = [];
    for (let i = 0; i < 2048; i++) {
      this.stage.vars.arm7WirelessState0.push(0);
    }
    this.stage.vars.arm7WirelessState1 = [];
    for (let i = 0; i < 0; i++) {
      this.stage.vars.arm7WirelessState1.push(0);
    }
    this.stage.vars.arm7Vwram = [];
    for (let i = 0; i < 65536; i++) {
      this.stage.vars.arm7Vwram.push(0);
    }
    this.stage.vars.arm7Flags = [];
    for (let i = 0; i < 4; i++) {
      this.stage.vars.arm7Flags.push("false");
    }
    this.vars.arm7Registers = [];
    for (let i = 0; i < 16; i++) {
      this.vars.arm7Registers.push(0);
    }
    this.stage.vars.arm9Memory1 = [];
    this.stage.vars.arm9Memory2 = [];
    this.stage.vars.arm9Memory3 = [];
    this.stage.vars.arm9Memory4 = [];
    this.stage.vars.arm9Memory5 = [];
    for (let i = 0; i < 200000; i++) {
      this.stage.vars.arm9Memory1.push(0);
      this.stage.vars.arm9Memory2.push(0);
      this.stage.vars.arm9Memory3.push(0);
      this.stage.vars.arm9Memory4.push(0);
      this.stage.vars.arm9Memory5.push(0);
    }
    this.stage.vars.arm9Memory6 = [];
    for (let i = 0; i < 48576; i++) {
      this.stage.vars.arm9Memory6.push(0);
    }
    this.stage.vars.arm9IoPorts = [];
    for (let i = 0; i < 1051; i++) {
      this.stage.vars.arm9IoPorts.push(0);
    }
    this.stage.vars.vramEngineABg = [];
    for (let i = 0; i < 131072; i++) {
      this.stage.vars.vramEngineABg.push(0);
    }
    this.stage.vars.vramEngineBBg = [];
    for (let i = 0; i < 32768; i++) {
      this.stage.vars.vramEngineBBg.push(0);
    }
    this.stage.vars.vramEngineAObj = [];
    for (let i = 0; i < 65536; i++) {
      this.stage.vars.vramEngineAObj.push(0);
    }
    this.stage.vars.vramEngineBObj = [];
    for (let i = 0; i < 32768; i++) {
      this.stage.vars.vramEngineBObj.push(0);
    }
    this.stage.vars.vramLcdc = [];
    for (let i = 0; i < 167936; i++) {
      this.stage.vars.vramLcdc.push(0);
    }
    this.stage.vars.oam = [];
    for (let i = 0; i < 512; i++) {
      this.stage.vars.oam.push(0);
    }
    this.vars.arm9Flags = [];
    for (let i = 0; i < 4; i++) {
      this.vars.arm9Flags.push("false");
    }
    this.vars.arm9Registers = [];
    for (let i = 0; i < 16; i++) {
      this.vars.arm9Registers.push(0);
    }
    this.stage.vars.displayScreen = [];
    for (let i = 0; i < 98304; i++) {
      this.stage.vars.displayScreen.push(0);
    }
  }

  *arm7ListWriteMemory(addr2, value) {
    if (addr2 > 100663295) {
      if (addr2 > 134217727) {
        if (addr2 > 167772159) {
          null;
        } else {
          null;
        }
      } else {
        this.stage.vars.arm7Vwram.splice(
          1 + Math.floor((addr2 - 100663296) / 4) - 1,
          1,
          value
        );
      }
    } else {
      if (addr2 > 58720255) {
        if (addr2 > 67108863) {
          if (addr2 > 75497471) {
            if (addr2 > 75530239) {
              this.stage.vars.arm7WirelessState1.splice(
                1 + Math.floor((addr2 - 75530240) / 4) - 1,
                1,
                value
              );
            } else {
              this.stage.vars.arm7WirelessState0.splice(
                1 + Math.floor((addr2 - 75497472) / 4) - 1,
                1,
                value
              );
            }
          } else {
            this.stage.vars.arm7IoPorts.splice(
              1 + Math.floor((addr2 - 67108864) / 4) - 1,
              1,
              value
            );
          }
        } else {
          this.stage.vars.arm7Wram.splice(
            1 + Math.floor((addr2 - 58720256) / 4) - 1,
            1,
            value
          );
        }
      } else {
        if (addr2 > 50331647) {
          this.stage.vars.coreSharedWram.splice(
            1 + Math.floor((addr2 - 50331648) / 4) - 1,
            1,
            value
          );
        } else {
          if (addr2 > 34354431) {
            if (addr2 > 34554431) {
              if (addr2 > 34754431) {
                this.stage.vars.arm7Memory6.splice(
                  1 + Math.floor((addr2 - 34754432) / 4) - 1,
                  1,
                  value
                );
              } else {
                this.stage.vars.arm7Memory5.splice(
                  1 + Math.floor((addr2 - 34554432) / 4) - 1,
                  1,
                  value
                );
              }
            } else {
              this.stage.vars.arm7Memory4.splice(
                1 + Math.floor((addr2 - 34354432) / 4) - 1,
                1,
                value
              );
            }
          } else {
            if (addr2 > 33754431) {
              if (addr2 > 34154431) {
                this.stage.vars.arm7Memory3.splice(
                  1 + Math.floor((addr2 - 34154432) / 4) - 1,
                  1,
                  value
                );
              } else {
                this.stage.vars.arm7Memory2.splice(
                  1 + Math.floor((addr2 - 33754432) / 4) - 1,
                  1,
                  value
                );
              }
            } else {
              this.stage.vars.arm7Memory1.splice(
                1 + Math.floor((addr2 - 33554432) / 4) - 1,
                1,
                value
              );
            }
          }
        }
      }
    }
  }

  *arm7Instruction(opcode) {
    this.stage.vars.arm7Cycles += 1;
    yield* this.arm7CheckCondition(Math.floor(opcode / 16) % 16);
    if (this.vars.coreConditionTest == 0) {
      return;
    }
    yield* this.coreGetFormat(opcode);
    if (this.vars.coreInstructionFormat < 8) {
      if (this.vars.coreInstructionFormat < 4) {
        if (this.vars.coreInstructionFormat < 2) {
          if (this.vars.coreInstructionFormat < 1) {
            if (this.vars.coreLittleEndian % 67108864 > 33554431) {
              yield* this.coreRotateRight(
                this.vars.coreLittleEndian % 256,
                2 * (Math.floor(this.vars.coreLittleEndian / 256) % 16)
              );
              this.vars.coreOpDummy2 = this.vars.coreRotateReturn;
            } else {
              yield* this.arm7ReadRegister(this.vars.coreLittleEndian % 16);
              yield* this._(
                this.vars.arm7ReadReturn,
                Math.floor(this.vars.coreLittleEndian / 16) % 256
              );
              this.vars.coreOpDummy2 = this.vars.coreShiftReturn;
            }
            this.vars.coreDummyOp = Math.floor(
              (this.vars.coreLittleEndian % 33554432) / 2097152
            );
            if (this.vars.coreDummyOp < 8) {
              if (this.vars.coreDummyOp < 4) {
                if (this.vars.coreDummyOp < 2) {
                  if (this.vars.coreDummyOp < 1) {
                    null;
                  } else {
                    null;
                  }
                } else {
                  if (this.vars.coreDummyOp < 3) {
                    yield* this.arm7ReadRegister(
                      Math.floor(this.vars.coreLittleEndian / 65536) % 16
                    );
                    this.vars.coreOpDummy =
                      this.vars.arm7ReadReturn - this.vars.coreOpDummy2;
                    if (this.vars.coreLittleEndian % 2097152 > 1048575) {
                      this.stage.vars.arm7Flags.splice(
                        1 - 1,
                        1,
                        this.vars.coreOpDummy < 0
                      );
                    }
                    if (this.vars.coreOpDummy < 0) {
                      this.vars.coreOpDummy += 4294967296;
                    }
                    yield* this.arm7WriteRegister(
                      Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                      this.vars.coreOpDummy
                    );
                  } else {
                    null;
                  }
                }
              } else {
                if (this.vars.coreDummyOp < 6) {
                  if (this.vars.coreDummyOp < 5) {
                    yield* this.arm7ReadRegister(
                      Math.floor(this.vars.coreLittleEndian / 65536) % 16
                    );
                    this.vars.coreOpDummy =
                      this.vars.arm7ReadReturn + this.vars.coreOpDummy2;
                    if (this.vars.coreOpDummy > 4294967295) {
                      this.vars.coreOpDummy += "-0x100000000";
                    }
                    yield* this.arm7WriteRegister(
                      Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                      this.vars.coreOpDummy
                    );
                  } else {
                    null;
                  }
                } else {
                  if (this.vars.coreDummyOp < 7) {
                    null;
                  } else {
                    null;
                  }
                }
              }
            } else {
              if (this.vars.coreDummyOp < 12) {
                if (this.vars.coreDummyOp < 10) {
                  if (this.vars.coreDummyOp < 9) {
                    null;
                  } else {
                    null;
                  }
                } else {
                  if (this.vars.coreDummyOp < 11) {
                    null;
                  } else {
                    null;
                  }
                }
              } else {
                if (this.vars.coreDummyOp < 14) {
                  if (this.vars.coreDummyOp < 13) {
                    null;
                  } else {
                    yield* this.arm7WriteRegister(
                      Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                      this.vars.coreOpDummy2
                    );
                  }
                } else {
                  if (this.vars.coreDummyOp < 15) {
                    null;
                  } else {
                    null;
                  }
                }
              }
            }
            this.stage.vars.arm7Cycles += 1;
          } else {
            this.stage.vars.arm7Cycles += 1;
          }
        } else {
          if (this.vars.coreInstructionFormat < 3) {
            this.stage.vars.arm7Cycles += 3;
          } else {
            null;
          }
        }
      } else {
        if (this.vars.coreInstructionFormat < 6) {
          if (this.vars.coreInstructionFormat < 5) {
            null;
          } else {
            null;
          }
        } else {
          if (this.vars.coreInstructionFormat < 7) {
            this.vars.coreOpDummy2 =
              0 -
              (16 * (Math.floor(this.vars.coreLittleEndian / 256) % 16) +
                (this.vars.coreLittleEndian % 16));
            if (this.vars.coreLittleEndian % 16777216 > 8388607) {
              this.vars.coreOpDummy2 = 0 - this.vars.coreOpDummy2;
            }
            yield* this.arm7ReadRegister(
              Math.floor(this.vars.coreLittleEndian / 65536) % 16
            );
            this.vars.coreOpDummy2 += this.vars.arm7ReadReturn;
            if (this.vars.coreLittleEndian % 4194304 > 2097151) {
              yield* this.arm7WriteRegister(
                Math.floor(this.vars.coreLittleEndian / 65536) % 16,
                this.vars.coreOpDummy2
              );
            }
            if (this.vars.coreLittleEndian % 2097152 > 1048575) {
              yield* this.arm7ReadMemory(this.vars.coreOpDummy2);
              yield* this.arm7WriteRegister(
                Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                this.vars.arm9ReadReturn
              );
            } else {
              yield* this.arm7ReadRegister(
                Math.floor(this.vars.coreLittleEndian / 4096) % 16
              );
              this.vars.coreOpDummy = this.vars.arm7ReadReturn;
              yield* this.arm7WriteByte(
                this.vars.coreOpDummy2,
                Math.floor(this.vars.coreOpDummy / 256)
              );
              yield* this.arm7WriteByte(
                this.vars.coreOpDummy2 + 1,
                this.vars.coreOpDummy % 256
              );
            }
            this.stage.vars.arm7Cycles += 1;
          } else {
            if (this.vars.coreLittleEndian % 67108864 > 33554431) {
              yield* this.arm7ReadRegister(this.vars.coreLittleEndian % 16);
              yield* this._(
                this.vars.arm7ReadReturn,
                Math.floor(this.vars.coreLittleEndian / 16) % 256
              );
              this.vars.coreOpDummy2 = this.vars.coreShiftReturn;
            } else {
              this.vars.coreOpDummy2 = this.vars.coreLittleEndian % 4096;
            }
            if (this.vars.coreLittleEndian % 16777216 > 16777215) {
              this.vars.coreOpDummy2 = 0 - this.vars.coreOpDummy2;
            }
            if (this.vars.coreLittleEndian % 2097152 > 1048575) {
              yield* this.arm7ReadRegister(
                Math.floor(this.vars.coreLittleEndian / 65536) % 16
              );
              yield* this.arm7ReadMemory(
                this.vars.arm9ReadReturn + this.vars.coreOpDummy2
              );
              yield* this.arm7WriteRegister(
                Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                this.vars.arm9ReadReturn
              );
            } else {
              yield* this.arm7ReadRegister(
                Math.floor(this.vars.coreLittleEndian / 65536) % 16
              );
              this.vars.coreOpDummy = this.vars.arm7ReadReturn;
              yield* this.arm7ReadRegister(
                Math.floor(this.vars.coreLittleEndian / 4096) % 16
              );
              yield* this.arm7WriteMemory(
                this.vars.coreOpDummy + this.vars.coreOpDummy2,
                this.vars.arm9ReadReturn
              );
            }
          }
        }
      }
    } else {
      if (this.vars.coreInstructionFormat < 12) {
        if (this.vars.coreInstructionFormat < 10) {
          if (this.vars.coreInstructionFormat < 9) {
            null;
          } else {
            null;
          }
        } else {
          if (this.vars.coreInstructionFormat < 11) {
            if (this.vars.coreLittleEndian % 33554432 > 16777215) {
              yield* this.arm7WriteRegister(14, this.vars.arm7Pc - 1);
            }
            if (this.vars.coreLittleEndian % 16777216 > 9437183) {
              this.vars.arm7Pc +=
                -1 * (16777215 - (this.vars.coreLittleEndian % 16777216));
            } else {
              this.vars.arm7Pc += this.vars.coreLittleEndian % 16777216;
            }
            this.stage.vars.arm7Cycles += 3;
          } else {
            null;
          }
        }
      } else {
        if (this.vars.coreInstructionFormat < 14) {
          if (this.vars.coreInstructionFormat < 13) {
            null;
          } else {
            null;
          }
        } else {
          if (this.vars.coreInstructionFormat < 15) {
            null;
          } else {
            null;
          }
        }
      }
    }
  }

  *arm7CheckCondition(cond) {
    if (cond < 8) {
      if (cond < 4) {
        if (cond < 2) {
          if (cond < 1) {
            this.vars.coreConditionTest = this.stage.vars.arm7Flags[1 - 1];
          } else {
            this.vars.coreConditionTest = 1 - this.stage.vars.arm7Flags[1 - 1];
          }
        } else {
          if (cond < 3) {
            this.vars.coreConditionTest = this.stage.vars.arm7Flags[2 - 1];
          } else {
            this.vars.coreConditionTest = 1 - this.stage.vars.arm7Flags[2 - 1];
          }
        }
      } else {
        if (cond < 6) {
          if (cond < 5) {
            this.vars.coreConditionTest = this.stage.vars.arm7Flags[3 - 1];
          } else {
            this.vars.coreConditionTest = 1 - this.stage.vars.arm7Flags[3 - 1];
          }
        } else {
          if (cond < 7) {
            this.vars.coreConditionTest = this.stage.vars.arm7Flags[4 - 1];
          } else {
            this.vars.coreConditionTest = 1 - this.stage.vars.arm7Flags[4 - 1];
          }
        }
      }
    } else {
      if (cond < 12) {
        if (cond < 10) {
          if (cond < 9) {
            this.vars.coreConditionTest =
              this.stage.vars.arm7Flags[2 - 1] -
                this.stage.vars.arm7Flags[1 - 1] >
              0;
          } else {
            this.vars.coreConditionTest =
              this.stage.vars.arm7Flags[1 - 1] -
                this.stage.vars.arm7Flags[2 - 1] >
              0;
          }
        } else {
          if (cond < 11) {
            this.vars.coreConditionTest =
              this.stage.vars.arm7Flags[3 - 1] ==
              this.stage.vars.arm7Flags[4 - 1];
          } else {
            this.vars.coreConditionTest = !(
              this.stage.vars.arm7Flags[3 - 1] ==
              this.stage.vars.arm7Flags[4 - 1]
            );
          }
        }
      } else {
        if (cond < 14) {
          if (cond < 13) {
            this.vars.coreConditionTest =
              (1 - this.stage.vars.arm7Flags[1 - 1]) *
              (this.stage.vars.arm7Flags[3 - 1] ==
                this.stage.vars.arm7Flags[4 - 1]);
          } else {
            this.vars.coreConditionTest =
              this.stage.vars.arm7Flags[1 - 1] +
                !(
                  this.stage.vars.arm7Flags[3 - 1] ==
                  this.stage.vars.arm7Flags[4 - 1]
                ) >
              0;
          }
        } else {
          if (cond < 15) {
            this.vars.coreConditionTest = "true";
          } else {
            this.vars.coreConditionTest = "true";
          }
        }
      }
    }
  }

  *arm9Instruction(opcode2) {
    this.stage.vars.arm9Cycles += 1;
    yield* this.arm9CheckCondition(Math.floor(opcode2 / 16) % 16);
    if (this.vars.coreConditionTest == 0) {
      return;
    }
    yield* this.coreGetFormat(opcode2);
    if (this.vars.coreInstructionFormat < 8) {
      if (this.vars.coreInstructionFormat < 4) {
        if (this.vars.coreInstructionFormat < 2) {
          if (this.vars.coreInstructionFormat < 1) {
            if (this.vars.coreLittleEndian % 67108864 > 33554431) {
              yield* this.coreRotateRight(
                this.vars.coreLittleEndian % 256,
                2 * (Math.floor(this.vars.coreLittleEndian / 256) % 16)
              );
              this.vars.coreOpDummy2 = this.vars.coreRotateReturn;
            } else {
              yield* this.arm9ReadRegister(this.vars.coreLittleEndian % 16);
              yield* this._(
                this.vars.arm9ReadReturn,
                Math.floor(this.vars.coreLittleEndian / 16) % 256
              );
              this.vars.coreOpDummy2 = this.vars.coreShiftReturn;
            }
            this.vars.coreDummyOp = Math.floor(
              (this.vars.coreLittleEndian % 33554432) / 2097152
            );
            if (this.vars.coreDummyOp < 8) {
              if (this.vars.coreDummyOp < 4) {
                if (this.vars.coreDummyOp < 2) {
                  if (this.vars.coreDummyOp < 1) {
                    null;
                  } else {
                    null;
                  }
                } else {
                  if (this.vars.coreDummyOp < 3) {
                    yield* this.arm9ReadRegister(
                      Math.floor(this.vars.coreLittleEndian / 65536) % 16
                    );
                    this.vars.coreOpDummy =
                      this.vars.arm9ReadReturn - this.vars.coreOpDummy2;
                    if (this.vars.coreLittleEndian % 2097152 > 1048575) {
                      this.vars.arm9Flags.splice(
                        1 - 1,
                        1,
                        this.vars.coreOpDummy < 0
                      );
                    }
                    if (this.vars.coreOpDummy < 0) {
                      this.vars.coreOpDummy += 4294967296;
                    }
                    yield* this.arm9WriteRegister(
                      Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                      this.vars.coreOpDummy
                    );
                  } else {
                    null;
                  }
                }
              } else {
                if (this.vars.coreDummyOp < 6) {
                  if (this.vars.coreDummyOp < 5) {
                    yield* this.arm9ReadRegister(
                      Math.floor(this.vars.coreLittleEndian / 65536) % 16
                    );
                    this.vars.coreOpDummy =
                      this.vars.arm9ReadReturn + this.vars.coreOpDummy2;
                    if (this.vars.coreOpDummy > 4294967295) {
                      this.vars.coreOpDummy += "-0x100000000";
                    }
                    yield* this.arm9WriteRegister(
                      Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                      this.vars.coreOpDummy
                    );
                  } else {
                    null;
                  }
                } else {
                  if (this.vars.coreDummyOp < 7) {
                    null;
                  } else {
                    null;
                  }
                }
              }
            } else {
              if (this.vars.coreDummyOp < 12) {
                if (this.vars.coreDummyOp < 10) {
                  if (this.vars.coreDummyOp < 9) {
                    null;
                  } else {
                    null;
                  }
                } else {
                  if (this.vars.coreDummyOp < 11) {
                    null;
                  } else {
                    null;
                  }
                }
              } else {
                if (this.vars.coreDummyOp < 14) {
                  if (this.vars.coreDummyOp < 13) {
                    null;
                  } else {
                    yield* this.arm9WriteRegister(
                      Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                      this.vars.coreOpDummy2
                    );
                  }
                } else {
                  if (this.vars.coreDummyOp < 15) {
                    null;
                  } else {
                    null;
                  }
                }
              }
            }
            this.stage.vars.arm9Cycles += 1;
          } else {
            this.stage.vars.arm9Cycles += 1;
          }
        } else {
          if (this.vars.coreInstructionFormat < 3) {
            this.stage.vars.arm9Cycles += 3;
          } else {
            null;
          }
        }
      } else {
        if (this.vars.coreInstructionFormat < 6) {
          if (this.vars.coreInstructionFormat < 5) {
            this.stage.vars.arm9Cycles += 3;
          } else {
            null;
          }
        } else {
          if (this.vars.coreInstructionFormat < 7) {
            this.vars.coreOpDummy2 =
              0 -
              (16 * (Math.floor(this.vars.coreLittleEndian / 256) % 16) +
                (this.vars.coreLittleEndian % 16));
            if (this.vars.coreLittleEndian % 16777216 > 8388607) {
              this.vars.coreOpDummy2 = 0 - this.vars.coreOpDummy2;
            }
            yield* this.arm9ReadRegister(
              Math.floor(this.vars.coreLittleEndian / 65536) % 16
            );
            this.vars.coreOpDummy2 += this.vars.arm9ReadReturn;
            if (this.vars.coreLittleEndian % 4194304 > 2097151) {
              yield* this.arm9WriteRegister(
                Math.floor(this.vars.coreLittleEndian / 65536) % 16,
                this.vars.coreOpDummy2
              );
            }
            if (this.vars.coreLittleEndian % 2097152 > 1048575) {
              yield* this.arm9ReadMemory(this.vars.coreOpDummy2);
              yield* this.arm9WriteRegister(
                Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                this.vars.arm9ReadReturn
              );
            } else {
              yield* this.arm9ReadRegister(
                Math.floor(this.vars.coreLittleEndian / 4096) % 16
              );
              this.vars.coreOpDummy = this.vars.arm9ReadReturn;
              yield* this.arm9WriteByte(
                this.vars.coreOpDummy2,
                Math.floor(this.vars.coreOpDummy / 256) % 256
              );
              yield* this.arm9WriteByte(
                this.vars.coreOpDummy2 + 1,
                this.vars.coreOpDummy % 256
              );
            }
            this.stage.vars.arm9Cycles += 1;
          } else {
            if (this.vars.coreLittleEndian % 67108864 > 33554431) {
              yield* this.arm9ReadRegister(this.vars.coreLittleEndian % 16);
              yield* this._(
                this.vars.arm9ReadReturn,
                Math.floor(this.vars.coreLittleEndian / 16) % 256
              );
              this.vars.coreOpDummy2 = this.vars.coreShiftReturn;
            } else {
              this.vars.coreOpDummy2 = this.vars.coreLittleEndian % 4096;
            }
            if (this.vars.coreLittleEndian % 16777216 > 16777215) {
              this.vars.coreOpDummy2 = 0 - this.vars.coreOpDummy2;
            }
            if (this.vars.coreLittleEndian % 2097152 > 1048575) {
              yield* this.arm9ReadRegister(
                Math.floor(this.vars.coreLittleEndian / 65536) % 16
              );
              yield* this.arm9ReadMemory(
                this.vars.arm9ReadReturn + this.vars.coreOpDummy2
              );
              yield* this.arm9WriteRegister(
                Math.floor(this.vars.coreLittleEndian / 4096) % 16,
                this.vars.arm9ReadReturn
              );
            } else {
              yield* this.arm9ReadRegister(
                Math.floor(this.vars.coreLittleEndian / 65536) % 16
              );
              this.vars.coreOpDummy = this.vars.arm9ReadReturn;
              yield* this.arm9ReadRegister(
                Math.floor(this.vars.coreLittleEndian / 4096) % 16
              );
              yield* this.arm9WriteMemory(
                this.vars.coreOpDummy + this.vars.coreOpDummy2,
                this.vars.arm9ReadReturn
              );
            }
          }
        }
      }
    } else {
      if (this.vars.coreInstructionFormat < 12) {
        if (this.vars.coreInstructionFormat < 10) {
          if (this.vars.coreInstructionFormat < 9) {
            null;
          } else {
            null;
          }
        } else {
          if (this.vars.coreInstructionFormat < 11) {
            if (this.vars.coreLittleEndian % 33554432 > 16777215) {
              yield* this.arm9WriteRegister(14, this.vars.arm9Pc - 1);
            }
            if (this.vars.coreLittleEndian % 16777216 > 8388607) {
              this.vars.arm9Pc +=
                -1 * (16777215 - (this.vars.coreLittleEndian % 16777216));
            } else {
              this.vars.arm9Pc += this.vars.coreLittleEndian % 16777216;
            }
            this.stage.vars.arm9Cycles += 3;
          } else {
            null;
          }
        }
      } else {
        if (this.vars.coreInstructionFormat < 14) {
          if (this.vars.coreInstructionFormat < 13) {
            null;
          } else {
            null;
          }
        } else {
          if (this.vars.coreInstructionFormat < 15) {
            this.vars.coreDummyOp = this.vars.coreDummyOp % 256;
            if (this.vars.coreDummyOp < 16) {
              if (this.vars.coreDummyOp < 8) {
                if (this.vars.coreDummyOp < 4) {
                  if (this.vars.coreDummyOp < 2) {
                    if (this.vars.coreDummyOp < 1) {
                      this.vars.arm9Pc = 1;
                    } else {
                      null;
                    }
                  } else {
                    if (this.vars.coreDummyOp < 3) {
                      null;
                    } else {
                      this.stage.vars.arm9Cycles +=
                        93 * (this.vars.arm9Registers[1 - 1] / 4189);
                    }
                  }
                } else {
                  if (this.vars.coreDummyOp < 6) {
                    if (this.vars.coreDummyOp < 5) {
                      null;
                    } else {
                      null;
                    }
                  } else {
                    if (this.vars.coreDummyOp < 7) {
                      null;
                    } else {
                      null;
                    }
                  }
                }
              } else {
                if (this.vars.coreDummyOp < 12) {
                  if (this.vars.coreDummyOp < 10) {
                    if (this.vars.coreDummyOp < 9) {
                      if (this.vars.arm9Registers[1 - 1] > 2147483647) {
                        this.vars.coreOpDummy =
                          4294967295 -
                          (this.vars.arm9Registers[1 - 1] % 2147483648);
                      } else {
                        this.vars.coreOpDummy =
                          this.vars.arm9Registers[1 - 1] % 2147483648;
                      }
                      if (this.vars.arm9Registers[2 - 1] > 2147483647) {
                        this.vars.coreOpDummy2 =
                          2147483647 -
                          (this.vars.arm9Registers[2 - 1] % 2147483648);
                      } else {
                        this.vars.coreOpDummy2 =
                          this.vars.arm9Registers[2 - 1] % 2147483648;
                      }
                      if (this.vars.coreOpDummy / this.vars.coreOpDummy2 < 0) {
                        this.vars.arm9Registers.splice(
                          1 - 1,
                          1,
                          4294967295 +
                            Math.floor(
                              this.vars.coreOpDummy / this.vars.coreOpDummy2
                            )
                        );
                        this.vars.arm9Registers.splice(
                          2 - 1,
                          1,
                          4294967295 +
                            (this.vars.coreOpDummy % this.vars.coreOpDummy2)
                        );
                      } else {
                        this.vars.arm9Registers.splice(
                          1 - 1,
                          1,
                          Math.floor(
                            this.vars.coreOpDummy / this.vars.coreOpDummy2
                          )
                        );
                        this.vars.arm9Registers.splice(
                          2 - 1,
                          1,
                          this.vars.coreOpDummy % this.vars.coreOpDummy2
                        );
                      }
                      this.vars.arm9Registers.splice(
                        3 - 1,
                        1,
                        Math.abs(
                          Math.floor(
                            this.vars.coreOpDummy / this.vars.coreOpDummy2
                          )
                        )
                      );
                    } else {
                      null;
                    }
                  } else {
                    if (this.vars.coreDummyOp < 11) {
                      null;
                    } else {
                      null;
                    }
                  }
                } else {
                  if (this.vars.coreDummyOp < 14) {
                    if (this.vars.coreDummyOp < 13) {
                      null;
                    } else {
                      null;
                    }
                  } else {
                    if (this.vars.coreDummyOp < 15) {
                      null;
                    } else {
                      null;
                    }
                  }
                }
              }
            } else {
              if (this.vars.coreDummyOp < 24) {
                if (this.vars.coreDummyOp < 20) {
                  if (this.vars.coreDummyOp < 18) {
                    if (this.vars.coreDummyOp < 17) {
                      null;
                    } else {
                      null;
                    }
                  } else {
                    if (this.vars.coreDummyOp < 19) {
                      null;
                    } else {
                      null;
                    }
                  }
                } else {
                  if (this.vars.coreDummyOp < 22) {
                    if (this.vars.coreDummyOp < 21) {
                      null;
                    } else {
                      null;
                    }
                  } else {
                    if (this.vars.coreDummyOp < 23) {
                      null;
                    } else {
                      null;
                    }
                  }
                }
              } else {
                if (this.vars.coreDummyOp < 28) {
                  if (this.vars.coreDummyOp < 26) {
                    if (this.vars.coreDummyOp < 25) {
                      null;
                    } else {
                      null;
                    }
                  } else {
                    if (this.vars.coreDummyOp < 27) {
                      null;
                    } else {
                      null;
                    }
                  }
                } else {
                  if (this.vars.coreDummyOp < 30) {
                    if (this.vars.coreDummyOp < 29) {
                      null;
                    } else {
                      null;
                    }
                  } else {
                    if (this.vars.coreDummyOp < 31) {
                      null;
                    } else {
                      null;
                    }
                  }
                }
              }
            }
          } else {
            this.say("[ARM9] Illegal Opcode");
          }
        }
      }
    }
  }

  *coreGetFormat(opcode3) {
    this.vars.coreDummyOp = opcode3;
    this.vars.coreLittleEndian = 0;
    for (let i = 0; i < 4; i++) {
      this.vars.coreLittleEndian =
        256 * this.vars.coreLittleEndian + (this.vars.coreDummyOp % 256);
      this.vars.coreDummyOp = Math.floor(this.vars.coreDummyOp / 256);
    }
    if (this.vars.coreLittleEndian % 268435456 < 134217728) {
      if (this.vars.coreLittleEndian % 134217728 < 67108864) {
        if (this.vars.coreLittleEndian % 67108864 < 33554432) {
          if (Math.floor(this.vars.coreLittleEndian / 16) == 1245169) {
            this.vars.coreInstructionFormat = 4;
          } else {
            if (
              this.vars.coreLittleEndian % 32 > 15 &&
              this.vars.coreLittleEndian % 256 > 127
            ) {
              if (Math.floor(this.vars.coreLittleEndian / 16) % 16 == 9) {
                if (this.vars.coreLittleEndian % 33554432 > 16777215) {
                  this.vars.coreInstructionFormat = 3;
                } else {
                  if (this.vars.coreLittleEndian % 16777216 > 8388607) {
                    this.vars.coreInstructionFormat = 2;
                  } else {
                    this.vars.coreInstructionFormat = 1;
                  }
                }
              } else {
                if (this.vars.coreLittleEndian % 8388608 > 4194303) {
                  this.vars.coreInstructionFormat = 6;
                } else {
                  if (Math.floor(this.vars.coreLittleEndian / 256) % 16 == 0) {
                    this.vars.coreInstructionFormat = 5;
                  } else {
                    this.vars.coreInstructionFormat = 15;
                  }
                }
              }
            } else {
              this.vars.coreInstructionFormat = 0;
            }
          }
        } else {
          if (
            this.vars.coreLittleEndian % 32 > 15 &&
            this.vars.coreLittleEndian % 256 > 127
          ) {
            if (this.vars.coreLittleEndian % 8388608 > 4194303) {
              this.vars.coreInstructionFormat = 6;
            } else {
              if (Math.floor(this.vars.coreLittleEndian / 256) % 16 == 0) {
                this.vars.coreInstructionFormat = 5;
              } else {
                this.vars.coreInstructionFormat = 15;
              }
            }
          } else {
            this.vars.coreInstructionFormat = 0;
          }
        }
      } else {
        this.vars.coreInstructionFormat = 7;
      }
    } else {
      if (this.vars.coreLittleEndian % 251658240 < 201326592) {
        if (this.vars.coreLittleEndian % 268435456 < 167772160) {
          this.vars.coreInstructionFormat = 9;
        } else {
          this.vars.coreInstructionFormat = 10;
        }
      } else {
        if (Math.floor(this.vars.coreLittleEndian / 16777216) % 16 == 15) {
          this.vars.coreInstructionFormat = 14;
        } else {
          this.vars.coreInstructionFormat = 15;
        }
      }
    }
  }

  *arm7WriteRegister(register, value2) {
    this.vars.arm7Registers.splice(register + 1 - 1, 1, value2);
  }

  *arm9ReadRegister(register2) {
    if (register2 < 15) {
      this.vars.arm9ReadReturn = this.vars.arm9Registers[register2 + 1 - 1];
    } else {
      this.vars.arm9ReadReturn = this.vars.arm9Pc - 1;
    }
  }

  *arm7ReadRegister(register3) {
    if (register3 < 15) {
      this.vars.arm7ReadReturn = this.vars.arm7Registers[register3 + 1 - 1];
    } else {
      this.vars.arm7ReadReturn = this.vars.arm7Pc - 1;
    }
  }

  *arm9WriteRegister(register4, value3) {
    this.vars.arm9Registers.splice(register4 + 1 - 1, 1, value3);
  }

  *arm7ReadMemory(addr3) {
    yield* this.arm7ListReadMemory(addr3);
    if (addr3 % 4 > 0) {
      this.vars.coreDummy2 = Math.round(
        Math.E ** (5.545177444479562 * (3 - (addr3 % 4)))
      );
      this.vars.coreDummy = this.vars.arm7ReadReturn % this.vars.coreDummy2;
      yield* this.arm7ListReadMemory(addr3 + 4);
      this.vars.arm7ReadReturn =
        this.vars.coreDummy * (16777216 / this.vars.coreDummy2) +
        Math.floor(this.vars.arm7ReadReturn / this.vars.coreDummy2);
    }
  }

  *arm7WriteMemory(addr4, value4) {
    if (addr4 % 4 == 0) {
      yield* this.arm7ListWriteMemory(addr4, value4);
    } else {
      this.vars.coreDummy = Math.round(
        Math.E ** (5.545177444479562 * (addr4 % 4))
      );
      this.vars.coreDummy2 = Math.round(
        Math.E ** (5.545177444479562 * (3 - ((addr4 - 1) % 4)))
      );
      yield* this.arm7ListReadMemory(addr4);
      yield* this.arm7ListWriteMemory(
        addr4,
        this.vars.coreDummy *
          Math.floor(this.vars.arm7ReadReturn / this.vars.coreDummy) +
          Math.floor(value4 / this.vars.coreDummy2)
      );
      yield* this.arm7ListReadMemory(addr4 + 4);
      yield* this.arm7ListWriteMemory(
        addr4 + 4,
        (this.vars.arm7ReadReturn % this.vars.coreDummy) +
          this.vars.coreDummy * (value4 % this.vars.coreDummy2)
      );
    }
  }

  *arm9ListReadMemory(addr5) {
    if (addr5 > 102760447) {
      if (addr5 > 117440511) {
        if (addr5 > 134217727) {
          null;
        } else {
          this.vars.arm9ReadReturn = this.stage.vars.oam[
            1 + Math.floor((addr5 - 117440512) / 4) - 1
          ];
        }
      } else {
        if (addr5 > 106954751) {
          if (addr5 > 109051903) {
            this.vars.arm9ReadReturn = this.stage.vars.vramLcdc[
              1 + Math.floor((addr5 - 109051904) / 4) - 1
            ];
          } else {
            this.vars.arm9ReadReturn = this.stage.vars.vramEngineBObj[
              1 + Math.floor((addr5 - 106954752) / 4) - 1
            ];
          }
        } else {
          if (addr5 > 104857599) {
            this.vars.arm9ReadReturn = this.stage.vars.vramEngineAObj[
              1 + Math.floor((addr5 - 104857600) / 4) - 1
            ];
          } else {
            this.vars.arm9ReadReturn = this.stage.vars.vramEngineBBg[
              1 + Math.floor((addr5 - 102760448) / 4) - 1
            ];
          }
        }
      }
    } else {
      if (addr5 > 67108863) {
        if (addr5 > 100663295) {
          this.vars.arm9ReadReturn = this.stage.vars.vramEngineABg[
            1 + Math.floor((addr5 - 100663296) / 4) - 1
          ];
        } else {
          if (addr5 > 83886079) {
            this.vars.arm9ReadReturn = this.stage.vars.arm9StandardPalettes[
              1 + Math.floor((addr5 - 83886080) / 4) - 1
            ];
          } else {
            this.vars.arm9ReadReturn = this.stage.vars.arm9IoPorts[
              1 + Math.floor((addr5 - 67108864) / 4) - 1
            ];
          }
        }
      } else {
        if (addr5 > 33554431) {
          if (addr5 > 50331647) {
            this.vars.arm9ReadReturn = this.stage.vars.coreSharedWram[
              1 + Math.floor((addr5 - 50331648) / 4) - 1
            ];
          } else {
            if (addr5 > 34354431) {
              if (addr5 > 34554431) {
                if (addr5 > 34754431) {
                  this.vars.arm9ReadReturn = this.stage.vars.arm9Memory6[
                    1 + Math.floor((addr5 - 34754432) / 4) - 1
                  ];
                } else {
                  this.vars.arm9ReadReturn = this.stage.vars.arm9Memory5[
                    1 + Math.floor((addr5 - 34554432) / 4) - 1
                  ];
                }
              } else {
                this.vars.arm9ReadReturn = this.stage.vars.arm9Memory4[
                  1 + Math.floor((addr5 - 34354432) / 4) - 1
                ];
              }
            } else {
              if (addr5 > 33754431) {
                if (addr5 > 34154431) {
                  this.vars.arm9ReadReturn = this.stage.vars.arm9Memory3[
                    1 + Math.floor((addr5 - 34154432) / 4) - 1
                  ];
                } else {
                  this.vars.arm9ReadReturn = this.stage.vars.arm9Memory2[
                    1 + Math.floor((addr5 - 33754432) / 4) - 1
                  ];
                }
              } else {
                this.vars.arm9ReadReturn = this.stage.vars.arm9Memory1[
                  1 + Math.floor((addr5 - 33554432) / 4) - 1
                ];
              }
            }
          }
        } else {
          if (addr5 > "0xXXXXFFFF") {
            null;
          } else {
            null;
          }
        }
      }
    }
  }

  *arm9ListWriteMemory(addr6, value5) {
    if (addr6 > 102760447) {
      if (addr6 > 117440511) {
        if (addr6 > 134217727) {
          null;
        } else {
          this.stage.vars.oam.splice(
            1 + Math.floor((addr6 - 117440512) / 4) - 1,
            1,
            value5
          );
        }
      } else {
        if (addr6 > 106954751) {
          if (addr6 > 109051903) {
            this.stage.vars.vramLcdc.splice(
              1 + Math.floor((addr6 - 109051904) / 4) - 1,
              1,
              value5
            );
          } else {
            this.stage.vars.vramEngineBObj.splice(
              1 + Math.floor((addr6 - 106954752) / 4) - 1,
              1,
              value5
            );
          }
        } else {
          if (addr6 > 104857599) {
            this.stage.vars.vramEngineAObj.splice(
              1 + Math.floor((addr6 - 104857600) / 4) - 1,
              1,
              value5
            );
          } else {
            this.stage.vars.vramEngineBBg.splice(
              1 + Math.floor((addr6 - 102760448) / 4) - 1,
              1,
              value5
            );
          }
        }
      }
    } else {
      if (addr6 > 67108863) {
        if (addr6 > 100663295) {
          this.stage.vars.vramEngineABg.splice(
            1 + Math.floor((addr6 - 100663296) / 4) - 1,
            1,
            value5
          );
        } else {
          if (addr6 > 83886079) {
            this.stage.vars.arm9StandardPalettes.splice(
              1 + Math.floor((addr6 - 83886080) / 4) - 1,
              1,
              value5
            );
          } else {
            this.stage.vars.arm9IoPorts.splice(
              1 + Math.floor((addr6 - 67108864) / 4) - 1,
              1,
              value5
            );
          }
        }
      } else {
        if (addr6 > 33554431) {
          if (addr6 > 50331647) {
            this.stage.vars.coreSharedWram.splice(
              1 + Math.floor((addr6 - 50331648) / 4) - 1,
              1,
              value5
            );
          } else {
            if (addr6 > 34354431) {
              if (addr6 > 34554431) {
                if (addr6 > 34754431) {
                  this.stage.vars.arm9Memory6.splice(
                    1 + Math.floor((addr6 - 34754432) / 4) - 1,
                    1,
                    value5
                  );
                } else {
                  this.stage.vars.arm9Memory5.splice(
                    1 + Math.floor((addr6 - 34554432) / 4) - 1,
                    1,
                    value5
                  );
                }
              } else {
                this.stage.vars.arm9Memory4.splice(
                  1 + Math.floor((addr6 - 34354432) / 4) - 1,
                  1,
                  value5
                );
              }
            } else {
              if (addr6 > 33754431) {
                if (addr6 > 34154431) {
                  this.stage.vars.arm9Memory3.splice(
                    1 + Math.floor((addr6 - 34154432) / 4) - 1,
                    1,
                    value5
                  );
                } else {
                  this.stage.vars.arm9Memory2.splice(
                    1 + Math.floor((addr6 - 33754432) / 4) - 1,
                    1,
                    value5
                  );
                }
              } else {
                this.stage.vars.arm9Memory1.splice(
                  1 + Math.floor((addr6 - 33554432) / 4) - 1,
                  1,
                  value5
                );
              }
            }
          }
        } else {
          if (addr6 > "0xXXXXFFFF") {
            null;
          } else {
            null;
          }
        }
      }
    }
  }

  *arm9ReadMemory(addr7) {
    yield* this.arm9ListReadMemory(addr7);
    if (addr7 % 4 > 0) {
      this.vars.coreDummy2 = Math.round(
        Math.E ** (5.545177444479562 * (3 - (addr7 % 4)))
      );
      this.vars.coreDummy = this.vars.arm7ReadReturn % this.vars.coreDummy2;
      yield* this.arm9ListReadMemory(addr7 + 4);
      this.vars.arm9ReadReturn =
        this.vars.coreDummy * (16777216 / this.vars.coreDummy2) +
        Math.floor(this.vars.arm9ReadReturn / this.vars.coreDummy2);
    }
  }

  *arm9WriteMemory(addr8, value6) {
    if (addr8 % 4 == 0) {
      yield* this.arm9ListWriteMemory(addr8, value6);
    } else {
      this.vars.coreDummy = Math.round(
        Math.E ** (5.545177444479562 * (addr8 % 4))
      );
      this.vars.coreDummy2 = Math.round(
        Math.E ** (5.545177444479562 * (3 - ((addr8 - 1) % 4)))
      );
      yield* this.arm9ListReadMemory(addr8);
      yield* this.arm9ListWriteMemory(
        addr8,
        this.vars.coreDummy *
          Math.floor(this.vars.arm9ReadReturn / this.vars.coreDummy) +
          Math.floor(value6 / this.vars.coreDummy2)
      );
      yield* this.arm9ListReadMemory(addr8 + 4);
      yield* this.arm9ListWriteMemory(
        addr8 + 4,
        (this.vars.arm9ReadReturn % this.vars.coreDummy) +
          this.vars.coreDummy * (value6 % this.vars.coreDummy2)
      );
    }
  }

  *coreRotateRight(x, y) {
    yield* this._2(x, y);
    this.vars.coreDummy = this.vars.coreShiftReturn;
    yield* this._(x, 32 - y);
    this.vars.coreRotateReturn =
      (this.vars.coreShiftReturn + this.vars.coreDummy) % 4294967296;
  }

  *coreRotateLeft(x2, y2) {
    yield* this._2(x2, 32 - y2);
    this.vars.coreDummy = this.vars.coreShiftReturn;
    yield* this._(x2, y2);
    this.vars.coreRotateReturn =
      (this.vars.coreShiftReturn + this.vars.coreDummy) % 4294967296;
  }

  *_(x3, y3) {
    this.vars.coreShiftReturn =
      x3 * Math.round(Math.E ** (y3 * 0.6931471805599453));
  }

  *_2(x4, y4) {
    this.vars.coreShiftReturn = Math.floor(
      x4 / Math.round(Math.E ** (y4 * 0.6931471805599453))
    );
  }

  *arm9CheckCondition(cond2) {
    if (cond2 < 8) {
      if (cond2 < 4) {
        if (cond2 < 2) {
          if (cond2 < 1) {
            this.vars.coreConditionTest = this.vars.arm9Flags[1 - 1];
          } else {
            this.vars.coreConditionTest = 1 - this.vars.arm9Flags[1 - 1];
          }
        } else {
          if (cond2 < 3) {
            this.vars.coreConditionTest = this.vars.arm9Flags[2 - 1];
          } else {
            this.vars.coreConditionTest = 1 - this.vars.arm9Flags[2 - 1];
          }
        }
      } else {
        if (cond2 < 6) {
          if (cond2 < 5) {
            this.vars.coreConditionTest = this.vars.arm9Flags[3 - 1];
          } else {
            this.vars.coreConditionTest = 1 - this.vars.arm9Flags[3 - 1];
          }
        } else {
          if (cond2 < 7) {
            this.vars.coreConditionTest = this.vars.arm9Flags[4 - 1];
          } else {
            this.vars.coreConditionTest = 1 - this.vars.arm9Flags[4 - 1];
          }
        }
      }
    } else {
      if (cond2 < 12) {
        if (cond2 < 10) {
          if (cond2 < 9) {
            this.vars.coreConditionTest =
              this.vars.arm9Flags[2 - 1] - this.vars.arm9Flags[1 - 1] > 0;
          } else {
            this.vars.coreConditionTest =
              this.vars.arm9Flags[1 - 1] - this.vars.arm9Flags[2 - 1] > 0;
          }
        } else {
          if (cond2 < 11) {
            this.vars.coreConditionTest =
              this.vars.arm9Flags[3 - 1] == this.vars.arm9Flags[4 - 1];
          } else {
            this.vars.coreConditionTest = !(
              this.vars.arm9Flags[3 - 1] == this.vars.arm9Flags[4 - 1]
            );
          }
        }
      } else {
        if (cond2 < 14) {
          if (cond2 < 13) {
            this.vars.coreConditionTest =
              (1 - this.vars.arm9Flags[1 - 1]) *
              (this.vars.arm9Flags[3 - 1] == this.vars.arm9Flags[4 - 1]);
          } else {
            this.vars.coreConditionTest =
              this.vars.arm9Flags[1 - 1] +
                !(this.vars.arm9Flags[3 - 1] == this.vars.arm9Flags[4 - 1]) >
              0;
          }
        } else {
          if (cond2 < 15) {
            this.vars.coreConditionTest = "true";
          } else {
            this.vars.coreConditionTest = "true";
          }
        }
      }
    }
  }

  *arm7ReadByte(addr9) {
    yield* this.arm7ListReadMemory(addr9);
    yield* this.coreGetByte(this.vars.arm7ReadReturn, addr9 % 4);
    this.vars.arm7ReadReturn = this.vars.coreByteReturn;
  }

  *arm9ReadByte(addr10) {
    yield* this.arm9ListReadMemory(addr10);
    yield* this.coreGetByte(this.vars.arm9ReadReturn, addr10 % 4);
    this.vars.arm9ReadReturn = this.vars.coreByteReturn;
  }

  *arm7WriteByte(addr11, value7) {
    this.vars.coreDummy = 0;
    this.vars.coreDummy2 = 0;
    for (let i = 0; i < 4; i++) {
      if (this.vars.coreDummy == addr11 % 4) {
        this.vars.coreDummy2 = 256 * this.vars.coreDummy2 + value7;
      } else {
        yield* this.arm7ReadByte(
          4 * Math.floor(addr11 / 4) + this.vars.coreDummy
        );
        this.vars.coreDummy2 =
          256 * this.vars.coreDummy2 + this.vars.arm7ReadReturn;
      }
      this.vars.coreDummy += 1;
    }
    yield* this.arm7WriteMemory(
      4 * Math.floor(addr11 / 4),
      this.vars.coreDummy2
    );
  }

  *arm9WriteByte(addr12, value8) {
    this.vars.coreDummy = 0;
    this.vars.coreDummy2 = 0;
    for (let i = 0; i < 4; i++) {
      if (this.vars.coreDummy == addr12 % 4) {
        this.vars.coreDummy2 = 256 * this.vars.coreDummy2 + value8;
      } else {
        yield* this.arm9ReadByte(
          4 * Math.floor(addr12 / 4) + this.vars.coreDummy
        );
        this.vars.coreDummy2 =
          256 * this.vars.coreDummy2 + this.vars.arm9ReadReturn;
      }
      this.vars.coreDummy += 1;
    }
    yield* this.arm9ListWriteMemory(addr12, this.vars.coreDummy2);
  }

  *emulateFrame() {
    this.stage.vars.displayScanX = 0;
    this.stage.vars.displayScanY = 0;
    while (!(this.stage.vars.displayScanY == 263)) {
      while (!(this.stage.vars.arm7Cycles > this.stage.vars.arm9Cycles / 2)) {
        yield* this.arm7Instruction(
          this.stage.vars.arm7Rom[this.vars.arm7Pc - 1]
        );
        this.vars.arm7Pc += 1;
      }
      while (!(this.stage.vars.arm9Cycles / 2 > this.stage.vars.arm7Cycles)) {
        yield* this.arm9Instruction(
          this.stage.vars.arm9Rom[this.vars.arm9Pc - 1]
        );
        this.vars.arm9Pc += 1;
      }
      if (this.stage.vars.arm9Cycles > 16) {
        this.stage.vars.arm9Cycles =
          this.stage.vars.arm9Cycles - this.stage.vars.arm7Cycles;
        this.stage.vars.arm7Cycles = 0;
        if (this.stage.vars.arm9IoPorts[145 - 1] % 256 > 127) {
          yield* this.arm9ReadByte(109051906);
          this.vars.coreDummy = this.vars.arm9ReadReturn;
          yield* this.arm9ReadByte(109051907);
          if (
            this.stage.vars.displayScanX < 256 &&
            this.stage.vars.displayScanY < 192
          ) {
            this.stage.vars.displayScreen.splice(
              1 +
                (this.stage.vars.displayScanX +
                  256 * this.stage.vars.displayScanY) -
                1,
              1,
              256 * this.vars.coreDummy + this.vars.arm9ReadReturn
            );
          }
        }
        this.stage.vars.displayScanX += 1;
      }
      if (this.stage.vars.displayScanX == 355) {
        this.stage.vars.displayScanX = 0;
        this.stage.vars.displayScanY += 1;
      }
    }
  }
}
