"use strict";
import ECS from 'ecs'
import * as Phaser from "phaser"

function getShurikenPos()
{
    const m = 600;
    const r = Math.random() * m;
    return Math.floor(r);
}

function diffToSpeed(diff)
{
    if (diff == "medium")
    {
        return -250;
    }
    if (diff == "hard")
    {
        return -500;
    }
    if (diff == "impossible")
    {
        return -1000;
    }
    return -100;
}

//Components
function addShuriken (objFactory,diff)
{
    const y = getShurikenPos();
    const d = diffToSpeed(diff);
    const s = objFactory.sprite(800,y, "shuriken");
    s.setSize(30,40,true);
    s.body.setAllowGravity(false);
    s.body.setImmovable();
    s.setVelocityX(d);
    return s;
}


function okToSpawnEnemy(w)
{
    const ents = ECS.getEntities(w, [ 'shuriken']);
    let r = true;
    ents.forEach((entity) =>
    {
        const spr = entity.shuriken;
        if (spr.x > 400)
        {
            r = false;
        }
    });
    return r;
}

function removeShurikenSystem (w)
{
    const e = ECS.getEntities(w, ['shuriken']);
    const onUpdate = function (dt)
    {
        e.forEach((entity) =>
        {
            const spr = entity.shuriken;
            //console.log("spritex",spr.x);
            if (spr.x < (-30))
            {
                ECS.removeEntity(w, entity);
                spr.destroy();
            }
        });
    }

    return { onUpdate }
}

//This function/system could actually be a good fit for
//inheritance. The animation will basically never change.
//You could extend the Sprite class and override the preUpdate
//function. One of the few cases where it makes sense
function rotateShurikenSystem (w)
{    
    const e = ECS.getEntities(w, ['shuriken']);
    const onUpdate = function (dt)
    {
        e.forEach((entity) =>
        {
            const spr = entity.shuriken;
            spr.angle += 0.6;
        });
    }

    return { onUpdate }

}

function spawnShurikenSystem (w)
{
    const player = ECS.getEntity(w, [ 'sprite']);
    const d = ECS.getEntity(w, [ 'diff']);
    const onUpdate = function (dt)
    {
        if (okToSpawnEnemy(w))
        {
            const e = ECS.addEntity(w);
            const f = ECS.getEntity(w, [ 'factory' ]);
            const spr = addShuriken(f.factory,d.diff);
            f.factory.collider(spr, player.sprite);
            ECS.addComponent(w, e, 'shuriken', spr);
            ECS.addComponent(w, e, 'moving', {moving : false});
        }   
    }

    return { onUpdate }
}

export {spawnShurikenSystem,rotateShurikenSystem,removeShurikenSystem}