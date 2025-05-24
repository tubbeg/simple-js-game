"use strict";
import {Scene, GameObjects} from "phaser"
import { addGhostSprite, jumpSpritesAnim, jumpSpritesPos } from "./playerSprite.js"
import { addCastle } from "./castleSprite.js"
import ECS from 'ecs'

function addObjFactory(w, objFactory)
{
    const fact = ECS.addEntity(w);
    const acfact = objFactory
    ECS.addComponent(w, fact, 'factory', acfact);
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

function addWorldUpdateEvents (w, input)
{
    //The design/architecture is already waay cleaner
    //ECS => much better separation between data and behaviour
    const ents = ECS.getEntities(w,['sprite']);
    input.on("pointerup", (e) => { jumpSpritesPos(ents);});
    input.on("pointerdown", (e) => { jumpSpritesAnim(ents);});
}

function spawnCastleSystem (w)
{
    const ents = ECS.getEntities(w, [ 'tower'])
    const onUpdate = function (dt)
    {
        if (ents.length < 1)
        {
            const tower = ECS.addEntity(w);
            const f = ECS.getEntity(w, [ 'factory' ]);
            const spr = addCastle(f.factory);
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

function addSyncSystems(w)
{
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
        addWorldUpdateEvents(this.world, this.input);
        addSyncSystems(this.world);
        
    }

    update (totalTime,dt)
    {       
        ECS.update(this.world, dt);
        ECS.cleanup(this.world);
    }
}


export {PlayerScene};