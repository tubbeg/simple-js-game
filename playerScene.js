"use strict";
import {Scene, GameObjects, ANIMATION_STOP} from "phaser"
import { addGhostSprite } from "./playerSprite.js";
import { addCastle, castleIsOutOfBounds } from "./castleSprite.js";


function timeToUpdate (t)
{
    let d = t % 1000;
    return (d < 1);
}

class PlayerScene extends Scene
{


    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        this.load.image("dark_castle", "happy_tower.png")
    }

    create ()
    {
        this.towers = [];
        this.sprite = addGhostSprite(this.physics.add, this.anims, this.input);
    }

    update (t,dt)
    {
        this.towers.filter((tower) => {return (tower == null);});

        this.towers.forEach((tower) =>
        {
            if (castleIsOutOfBounds(tower))
            {
                console.log("Destroying tower");
                tower.destroy();
            }
        });

        if (this.towers.length < 3 && timeToUpdate(t)){
            console.log("towers,",this.towers)
            console.log("Creating tower")
            let newTower =  addCastle(this.physics.add, this.sprite, this.physics.world);
            this.towers.push(newTower);
        }

    }
}


export {PlayerScene};