"use strict";
import ECS from 'ecs'


//Systems
function jumpSpritesPos (sprites)
{
    sprites.forEach((sprite) =>
    {
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

function jumpSpritesAnim (sprites)
{
    sprites.forEach((sprite) =>
    {
        playJump(sprite.sprite);
    });
}

function killAnimationSystem (w)
{

    const ents = ECS.getEntities(w,['sprite', 'dead']);
    const onUpdate = function (dt)
    {
        ents.forEach((entity) =>
        {
            entity.sprite.play({ key: "dead"});
        });
    }
    return {onUpdate};
}


function killSprites (w,sprites)
{
    sprites.forEach((sprite) =>
    {
        ECS.removeComponent(w, sprite, 'alive');
        ECS.addComponent(w, sprite, 'dead');
    });
}


function jumpSpritesSystem (w,input)
{
    const ents = ECS.getEntities(w,['sprite', 'alive']);
    input.on("pointerup", (e) => { jumpSpritesPos(ents);});
    input.on("pointerdown", (e) => { jumpSpritesAnim(ents);});
}

function collideSystem (w, physicsWorld)
{
    const ents = ECS.getEntities(w,['sprite', 'alive']);
    physicsWorld.on('collide', (go1,go2,b1,b2) => { killSprites(w,ents); });
}


function pitKillSystem (w)
{

    const ents = ECS.getEntities(w,['sprite', 'alive']);
    const onUpdate = function (dt)
    {
        ents.forEach((entity) =>
        {
            if (entity.sprite.y > 570)
            {
                ECS.removeComponent(w, entity, 'alive');
                ECS.addComponent(w, entity, 'dead');
            }
        });
    }
    return {onUpdate};
}



//Components
function addGhostSprite (objFactory, anims)
{
    const spr = objFactory.sprite(400, 100, "ghost");
    spr.body.onCollide = true;
    spr.setSize(35,75,true);
    spr.play({ key: "normal", repeat: -1 });
    return spr;
}

//Exports
export { killAnimationSystem,pitKillSystem,addGhostSprite, collideSystem, jumpSpritesSystem };