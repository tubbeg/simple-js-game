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

//this.add.text(400, 8, 'Score', { font: '16px Courier', fill: '#00ff00' }).setOrigin(0.5, 0).setScale(3);
