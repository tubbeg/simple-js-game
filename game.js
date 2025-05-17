"use strict";
import {Scene,Game, GameObjects, ANIMATION_STOP} from "phaser"
import {createConfig} from "./config.js"

//simple is better

const h = "hello";

console.log(h,h,h);
///*


function ghost_jump(){

}

//WIP class
class GhostSprite extends GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.setTexture("ghost");
        this.setPosition(x, y);
        this.jump = false;
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

    }

}



function addGhostJump (sceneInput, sprite){

    sprite.play({ key: "normal", repeat: -1 });
    sceneInput.on("pointerup", (e) => { sprite.setVelocityY(-200);});
    sceneInput.on("pointerdown", (e) => {
        sprite
            .play({ key: "jump", frameRate: 2 })
            .once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
            {
                sprite.play({ key: "normal", repeat: -1 });
            });
    });
}



function addGhostSprite(objFactory, anims, sceneInput){
    
    anims.createFromAseprite("ghost");
    const spr = objFactory.sprite(400, 300, "ghost");
    addGhostJump(sceneInput,spr);
    return spr;
}


class PlayerScene extends Scene
{
    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        //this.load.image("ghost", "./spookily.png");
    }

    create ()
    {
        this.sprite = addGhostSprite(this.physics.add, this.anims, this.input);
    }

    update (t,dt){
        //this.input.key()
    }
}


function runGame (conf){
    const g = new Game(conf);
}

const conf = createConfig(PlayerScene)
runGame(conf);
