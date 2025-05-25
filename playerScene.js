"use strict";
import {Scene} from "phaser"
import { killSprites, jumpSpritesAnim, jumpSpritesPos } from "./playerSprite.js"
import { spawnCastleSystem, moveCastleSystem, killCastleSystem } from "./castleSprite.js"
import { addEntities } from "./entities.js"
import ECS from 'ecs'


function addWorldUpdateEvents (w, input, physicsWorld)
{
    const ents = ECS.getEntities(w,['sprite', 'alive']);
    input.on("pointerup", (e) => { jumpSpritesPos(ents);});
    input.on("pointerdown", (e) => { jumpSpritesAnim(ents);});
    physicsWorld.on('collide', (go1,go2,b1,b2) => { killSprites(w,ents); });
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