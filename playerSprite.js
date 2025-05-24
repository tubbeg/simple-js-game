"use strict";
import {Physics} from "phaser"

function addGhostJump (sceneInput, sprite){

    //sprite.setInteractive();
    sceneInput.on("pointerup", (e) => { if (ghostIsAlive(sprite)) { sprite.setVelocityY(-200);}});
    sceneInput.on("pointerdown", (e) => {
        if (ghostIsAlive(sprite)){
            sprite
                .play({ key: "jump", frameRate: 2 })
                .once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
                {
                    sprite.play({ key: "normal", repeat: -1 });
                });
        }
    });
}

function addGhostSprite(objFactory, anims)
{
    anims.createFromAseprite("ghost");
    const spr = objFactory.sprite(400, 100, "ghost");
    spr.body.onCollide = true;
    spr.play({ key: "normal", repeat: -1 });
    return spr;
}


export { addGhostSprite };