"use strict";
import {Scene} from "phaser"


/*
IMPORTANT! When you load from aseprite and select an animation
frame with .play(...) then the key (aseprite tag) MUST be unique.
There seems to be a bug in Phaser where a duplicate tag can play
an animation from a separate file
*/

class MenuScene extends Scene
{

    preload ()
    {
        this.load.aseprite("b", "start-button.png", "start-button.json");
    }

    launchNextScene ()
    {
        this.btn.destroy();
        this.scene.launch("main");
    }

    create ()
    {
        this.anims.createFromAseprite("b");
        this.btn = this.add.sprite(400,400,"b");
        this.btn.setInteractive();
        this.btn.on("pointerover",(e) =>
        {
            this.btn.play({ key: "hover", repeat: -1 });
        });
        this.btn.on("pointerout",(e) =>
        {
            this.btn.play({ key: "k", repeat: -1 });
        });
        this.btn.on("pointerdown", (e) =>
        {
            this.launchNextScene();
        });
        
    }

    update (totalTime,dt)
    {       
    }
}


export {MenuScene};