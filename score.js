"use strict";
import ECS from 'ecs'


function scoreSystem(w)
{
    const t = ECS.getEntity(w,['time']);
    const sc = ECS.getEntity(w,['score']);
    const ents = ECS.getEntities(w,['sprite', 'alive']);
    const onUpdate = function (dt)
    {
        if (ents != null && ents.length >= 1)
        {
            const newScore = t.time.sec;
            sc.score.setText("score:" + newScore.toString())
        }
    }
    return { onUpdate }
}

export {scoreSystem}


