"use strict";
import {Physics} from "phaser"

//Systems
function jumpSpritesPos(sprites)
{
    sprites.forEach((sprite) => {
        sprite.sprite.setVelocityY(-200);
    });
}

function playJump (sprite)
{
    sprite
        .play({ key: "jump", frameRate: 2 })
        .once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        {
            sprite.play({ key: "normal", repeat: -1 });
        });
        
}

function jumpSpritesAnim(sprites)
{
    sprites.forEach((sprite) => {
        playJump(sprite.sprite);
    });
}


//Components
function addGhostSprite(objFactory, anims)
{
    anims.createFromAseprite("ghost");
    const spr = objFactory.sprite(400, 100, "ghost");
    spr.body.onCollide = true;
    spr.play({ key: "normal", repeat: -1 });
    return spr;
}


export { addGhostSprite, jumpSpritesAnim, jumpSpritesPos };