"use strict";
import ECS from 'ecs'
import { addGhostSprite } from "./playerSprite.js"

function addObjFactory(w, objFactory)
{
    const ent = ECS.addEntity(w);
    const fact = objFactory;
    ECS.addComponent(w, ent, 'factory', fact);
}

function addPlayerEntity(w, objFactory, anims)
{
    const player = ECS.addEntity(w);
    const spr = addGhostSprite(objFactory, anims);
    ECS.addComponent(w, player, 'sprite', spr);
    ECS.addComponent(w, player, 'alive', {})
}

function addEntities(w, objFactory, anims,scoreAdd)
{
    const scp = scoreAdd.text(500, 8, "score:0", { font: '16px Courier', fill: '#00ff00' }).setOrigin(0.5, 0);
    const escore = ECS.addEntity(w);
    ECS.addComponent(w, escore, 'score',  scp);
    const etime = ECS.addEntity(w);
    ECS.addComponent(w, etime, 'time', {dt : 0, sec : 0});
    const ediff = ECS.addEntity(w);
    ECS.addComponent(w, ediff, 'diff', "easy");
    addObjFactory(w, objFactory);
    addPlayerEntity(w,objFactory,anims);
}


export {addEntities}