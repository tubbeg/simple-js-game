"use strict";
import ECS from 'ecs'

function getPos()
{
    const m = 600;
    const r = Math.random() * m;
    return Math.floor(r);
}


function addCloud (objFactory)
{
    const y = getPos();
    const s = objFactory.sprite(800,y, "cloud");
    s.body.setAllowGravity(false);
    s.body.setImmovable();
    s.setVelocityX(-20);
    return s;
}


function okToSpawnCloud(w)
{
    const ents = ECS.getEntities(w, [ 'cloud']);
    let r = true;
    ents.forEach((entity) =>
    {
        const spr = entity.cloud;
        if (spr.x > 500)
        {
            r = false;
        }
    });
    return r;
}

function killCloudSystem(w)
{
    const c = ECS.getEntities(w, ['cloud']);
    const onUpdate = function (dt)
    {
        c.forEach((entity) =>
        {
            const spr = entity.cloud;
            if (spr.x < (-30))
            {
                ECS.removeEntity(w, entity);
                spr.destroy();
            }
        });
    }

    return { onUpdate }
}

function spawnCloudSystem (w)
{
    const onUpdate = function (dt)
    {
        if (okToSpawnCloud(w))
        {
            const e = ECS.addEntity(w);
            const f = ECS.getEntity(w, [ 'factory' ]);
            const spr = addCloud(f.factory);
            ECS.addComponent(w, e, 'cloud', spr);
        }   
    }

    return { onUpdate }
}


export {spawnCloudSystem,killCloudSystem }