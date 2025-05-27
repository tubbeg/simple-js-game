"use strict";
import ECS from 'ecs'


function countTimeSystem(w)
{
    const t = ECS.getEntity(w,['time']);
    const onUpdate = function (dt)
    {
        t.time.dt += dt;
        if (t.time.dt > 1000)
        {
            console.log("sec");
            t.time.dt = 0;
            t.time.sec += 1;
        }
    }

    return { onUpdate }
}

function difficultySystem(w)
{
    const d = ECS.getEntity(w,['diff']);
    const t = ECS.getEntity(w,['time']);
    const onUpdate = function (dt)
    {
        if (t.time.sec > 5)
        {
            d.diff = "medium";
        }
        if (t.time.sec > 10)
        {
            d.diff = "hard";
        }
        if (t.time.sec > 15)
        {
            d.diff = "impossible";
        }
    }

    return { onUpdate }
}

export {countTimeSystem,difficultySystem}