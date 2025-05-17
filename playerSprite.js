"use strict";

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


export { addGhostSprite };