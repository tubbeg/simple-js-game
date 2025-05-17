"use strict";
import {Scene, GameObjects, ANIMATION_STOP} from "phaser"
import { addGhostSprite } from "./playerSprite.js";

class PlayerScene extends Scene
{
    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        this.load.image("dark_castle", "happy_tower.png")
    }

    create ()
    {
        this.add.image(200,300, "dark_castle").setScale(3,3);
        this.sprite = addGhostSprite(this.physics.add, this.anims, this.input);
    }

    update (t,dt){
        //this.input.key()
    }
}


export {PlayerScene};