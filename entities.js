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

function addEntities(w, objFactory, anims)
{
    addObjFactory(w, objFactory);
    addPlayerEntity(w,objFactory,anims);
}


export {addEntities}