"use strict";
import {Scene} from "phaser"
import {  jumpSpritesSystem,collideSystem,pitKillSystem, killAnimationSystem } from "./playerSprite.js"
import { spawnCastleSystem, moveCastleSystem, killCastleSystem } from "./castleSprite.js"
import { addEntities } from "./entities.js"
import ECS from 'ecs'


function addWorldUpdateEvents (w, input, physicsWorld)
{
    jumpSpritesSystem(w,input);
    collideSystem(w,physicsWorld);
}

function addSyncSystems(w)
{
    //The design/architecture is already waay cleaner
    //ECS => much better separation between data and behaviour
    ECS.addSystem(w, spawnCastleSystem);
    ECS.addSystem(w, moveCastleSystem);
    ECS.addSystem(w, killCastleSystem);
    ECS.addSystem(w, pitKillSystem);
    ECS.addSystem(w, killAnimationSystem);
}


class PlayerScene extends Scene
{

    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        //this.load.aseprite("tower", "happy_tower2.png", "happy_tower2.json");
        this.load.image("tower", "tall-obstacle.png");
    }

    create ()
    {
        this.anims.createFromAseprite("ghost");
        this.anims.createFromAseprite("tower");
        this.world = ECS.addWorld()
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