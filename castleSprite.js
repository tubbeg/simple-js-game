"use strict";
import ECS from 'ecs'

//Systems
function spawnCastleSystem (w)
{
    const ents = ECS.getEntities(w, [ 'tower']);
    const player = ECS.getEntity(w, [ 'sprite']);
    const onUpdate = function (dt)
    {
        if (ents.length < 1)
        {
            const tower = ECS.addEntity(w);
            const f = ECS.getEntity(w, [ 'factory' ]);
            const spr = addCastle(f.factory);
            f.factory.collider(spr, player.sprite);
            ECS.addComponent(w, tower, 'tower', spr);
            ECS.addComponent(w, tower, 'moving', {moving : false});
        }   
    }

    return { onUpdate }
}

function killCastleSystem(w)
{
    const towers = ECS.getEntities(w, ['tower']);
    const onUpdate = function (dt)
    {
        towers.forEach((entity) =>
        {
            const spr = entity.tower;
            //console.log("spritex",spr.x);
            if (spr.x < 50)
            {
                ECS.removeEntity(w, entity);
                spr.destroy();
            }
        });
    }

    return { onUpdate }
}

function moveCastleSystem (w)
{
    const towers = ECS.getEntities(w, ['tower', 'moving']);
    console.log("nr of towers", towers);
    const onUpdate = function (dt)
    {
        for (const entity of towers)
        {
            if (!entity.moving.moving)
            {
                entity.tower.setVelocityX(-100);
                entity.moving = true;
            }
        }
    }

    return { onUpdate }
}


//Components
function addCastle (objFactory){
    const castle = objFactory.sprite(800,400, "dark_castle").setScale(3,3);
    //Not all properties need to be added as components
    //Some things are better to be left for Phaser to handle
    castle.body.setAllowGravity(false);
    castle.body.setImmovable();
    return castle;
}

//Exports
export {spawnCastleSystem, killCastleSystem, moveCastleSystem};