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
        this.castle = this.physics.add.image(400,400, "dark_castle").setScale(3,3);
        //this.castle.allowGravity = false;
        //this.castle.setGravityY(0);
        this.castle.body.setAllowGravity(false);
        //this.castle.setInteractive();
        this.sprite = addGhostSprite(this.physics.add, this.anims, this.input);
        this.physics.add.collider(this.sprite, this.castle);

        this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) =>
        {
            //gameObject1.setAlpha(1.5);
            gameObject2.setAlpha(0.5);
        });
    }

    update (t,dt){
        //this.input.key()
    }
}


export {PlayerScene};