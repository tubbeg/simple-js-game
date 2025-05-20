"use strict";
import {Physics} from "phaser"

//ghosts are technically always dead I suppose
function ghostIsAlive (spr){
    let data = spr.getData("alive");
    return (data === "true");
}



function addGhostJump (sceneInput, sprite){

    sprite.play({ key: "normal", repeat: -1 });
    //sprite.setInteractive();
    sprite.body.onCollide = true;
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

function addGhostSprite(objFactory, anims, sceneInput){
    
    anims.createFromAseprite("ghost");
    const spr = objFactory.sprite(400, 100, "ghost");
    spr.setData("alive","true");
    addGhostJump(sceneInput,spr);
    return spr;
}


export { addGhostSprite };