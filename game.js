import {Scene,Game, GameObjects, ANIMATION_STOP} from "phaser"
import {createConfig} from "./config.js"

//simple is better

const h = "hello";

console.log(h,h,h);
///*


function ghost_jump(){

}

//WIP class
class GhostSprite extends GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.setTexture("ghost");
        this.setPosition(x, y);
        this.jump = false;
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

    }

}

class PlayerScene extends Scene
{
    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        //this.load.image("ghost", "./spookily.png");
    }

    create ()
    {
        this.anims.createFromAseprite("ghost");
        //const ghost = new GhostSprite(this,400,300);
        //this.sprite = this.add.existing(ghost);
        
        this.sprite = this.add.sprite(400, 300, "ghost");
        this.sprite.play({ key: "normal", repeat: -1 });
        this.input.on("pointerdown", (e) =>
        {
            this.sprite
                .play({ key: "jump", frameRate: 5 })
                .once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
                {
                    this.sprite.play({ key: "normal", repeat: -1 });
                });
        });
        
    }

    update (t,dt){
        //this.input.key()
    }
}


function runGame (conf){
    const g = new Game(conf);
}

const conf = createConfig(PlayerScene)
runGame(conf);
