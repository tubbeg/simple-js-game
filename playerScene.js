"use strict";
import {Scene} from "phaser"
import {  jumpSpritesSystem,collideSystem,pitKillSystem, killAnimationSystem } from "./playerSprite.js"
import { addEntities } from "./entities.js"
import {removeShurikenSystem,rotateShurikenSystem, spawnShurikenSystem} from "./enemy.js"
import ECS from 'ecs'
import { killCloudSystem, spawnCloudSystem } from "./environment.js";
import { countTimeSystem, difficultySystem } from "./difficulty.js";
import { scoreSystem } from "./score.js";

function addWorldUpdateEvents (w, input, physicsWorld)
{
    jumpSpritesSystem(w,input);
    collideSystem(w,physicsWorld);
}

function addSyncSystems(w)
{
    //The design/architecture is already waay cleaner
    //ECS => much better separation between data and behaviour
    //ECS.addSystem(w, spawnCastleSystem);
    //ECS.addSystem(w, moveCastleSystem);
    //ECS.addSystem(w, killCastleSystem);
    ECS.addSystem(w, pitKillSystem);
    ECS.addSystem(w, killAnimationSystem);
    ECS.addSystem(w, spawnShurikenSystem);
    ECS.addSystem(w, removeShurikenSystem);
    ECS.addSystem(w, rotateShurikenSystem);
    ECS.addSystem(w, spawnCloudSystem);
    ECS.addSystem(w, killCloudSystem);
    ECS.addSystem(w, countTimeSystem);
    ECS.addSystem(w, difficultySystem);
    ECS.addSystem(w, scoreSystem);
}


class PlayerScene extends Scene
{

    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        //this.load.aseprite("tower", "happy_tower2.png", "happy_tower2.json");
        //this.load.image("tower", "tall-obstacle.png");
        //this.load.image("tower", "happy_tower2.png");
        this.load.image("shuriken", "shuriken.png");
        this.load.image("moon", "moon.png");
        this.load.image("cloud", "evil-cloud.png");
        
    }

    create ()
    {
        this.anims.createFromAseprite("ghost");
        this.add.image(200,100,"moon");
        this.world = ECS.addWorld()
        addEntities(this.world, this.physics.add, this.anims, this.add);
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