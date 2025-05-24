"use strict";
import {Scene, GameObjects} from "phaser"
import { addGhostSprite } from "./playerSprite.js";
import { addCastle, castleIsOutOfBounds } from "./castleSprite.js";
import ECS from 'ecs'



function addEntities(w, objFactory, anims, i)
{
    const player = ECS.addEntity(w)
    const spr = addGhostSprite(objFactory, anims, i);
    ECS.addComponent(w, player, 'sprite', spr);
}

function jumpSprites(sprites)
{
    sprites.forEach((sprite) => {
        sprite.sprite.setVelocityY(-200);
    });
}


function addWorldUpdateEvents (w, input)
{
    console.log("world is", w);
    const ents = ECS.getEntities(w,['sprite']);
    input.on("pointerup", (e) => { jumpSprites(ents);});
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
        //this.queries = addQueries(this.world);
        addWorldUpdateEvents(this.world, this.input);
    }

    update (totalTime,dt)
    {       
        ECS.update(this.world, dt);
        ECS.cleanup(this.world);
    }
}


export {PlayerScene};