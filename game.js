"use strict";
import {Scene,Game, GameObjects, ANIMATION_STOP} from "phaser"
import {createConfig} from "./config.js"
import { PlayerScene } from "./playerScene.js";
import { MenuScene } from "./menuScene.js";

//simple is better

const h = "hello";

console.log(h,h,h);

function runGame (conf){
    console.log("Running game...");
    const g = new Game(conf);
}

const conf = createConfig([MenuScene, PlayerScene]);
runGame(conf);
