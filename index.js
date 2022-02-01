import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Blank from "./Blank/Blank.js";
import CoreArm7Arm9 from "./CoreArm7Arm9/CoreArm7Arm9.js";
import Screens from "./Screens/Screens.js";
import LoadRoms from "./LoadRoms/LoadRoms.js";
import Sounds from "./Sounds/Sounds.js";
import LogoSettings from "./LogoSettings/LogoSettings.js";
import SayStuffAtMouse from "./SayStuffAtMouse/SayStuffAtMouse.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Blank: new Blank({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  CoreArm7Arm9: new CoreArm7Arm9({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Screens: new Screens({
    x: 119,
    y: 1,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  LoadRoms: new LoadRoms({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Sounds: new Sounds({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  LogoSettings: new LogoSettings({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  SayStuffAtMouse: new SayStuffAtMouse({
    x: -5,
    y: -90,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  })
};

const project = new Project(stage, sprites);
export default project;
