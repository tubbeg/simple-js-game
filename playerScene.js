"use strict";
import {Scene, GameObjects, ANIMATION_STOP} from "phaser"
import { addGhostSprite } from "./playerSprite.js";

function addCastle (objFactory, sprite, physicsWorld){
    const castle = objFactory.image(400,400, "dark_castle").setScale(3,3);
    castle.body.setAllowGravity(false);
    castle.body.setImmovable();
    objFactory.collider(sprite, castle);
    physicsWorld.on('collide', (go1, go2, b1, b2) =>
    {
        console.log("ghost is dead :/");
        sprite.setData("alive", "false");
        sprite.play({ key: "dead"});
        sprite.body.setCollidesWith([]);
        castle.setAlpha(0.5);
    });
    return castle;
}

class PlayerScene extends Scene
{
    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        this.load.image("dark_castle", "happy_tower.png")
    }

    create ()
    {
        this.sprite = addGhostSprite(this.physics.add, this.anims, this.input);
        this.castle = addCastle(this.physics.add, this.sprite, this.physics.world);
    }

    update (t,dt){
        //this.input.key()
    }
}


export {PlayerScene};