"use strict";
import {Scene, GameObjects} from "phaser"
import { addGhostSprite,killSpritesAnim, jumpSpritesAnim, jumpSpritesPos } from "./playerSprite.js"
import { spawnCastleSystem, moveCastleSystem, killCastleSystem } from "./castleSprite.js"
import ECS from 'ecs'
/*
castle.body.setImmovable();



    objFactory.collider(sprite, castle);


    physicsWorld.on('collide', (go1, go2, b1, b2) =>


    {


        sprite.play({ key: "dead"});


        sprite.body.setCollidesWith([]);


        castle.setAlpha(0.5);


    });*/
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
}

function addEntities(w, objFactory, anims)
{
    addObjFactory(w, objFactory);
    addPlayerEntity(w,objFactory,anims);
}

function addWorldUpdateEvents (w, input, physicsWorld)
{
    const ents = ECS.getEntities(w,['sprite']);
    input.on("pointerup", (e) => { jumpSpritesPos(ents);});
    input.on("pointerdown", (e) => { jumpSpritesAnim(ents);});
    physicsWorld.on('collide', (go1,go2,b1,b2) => { killSpritesAnim(ents); });
}

function addSyncSystems(w)
{
    //The design/architecture is already waay cleaner
    //ECS => much better separation between data and behaviour
    ECS.addSystem(w, spawnCastleSystem);
    ECS.addSystem(w, moveCastleSystem);
    ECS.addSystem(w, killCastleSystem);
}


class PlayerScene extends Scene
{

    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        this.load.image("dark_castle", "happy_tower.png");
    }

    create ()
    {
        this.world  = ECS.addWorld()
        addEntities(this.world, this.physics.add, this.anims);
        addWorldUpdateEvents(this.world, this.input, this.physics.world);
        addSyncSystems(this.world);
        
    }

    update (totalTime,dt)
    {       
        ECS.update(this.world, dt);
        ECS.cleanup(this.world);
    }
}


export {PlayerScene};