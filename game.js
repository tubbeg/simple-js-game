import {Scene,Game} from "phaser"
import {createConfig} from "./config.js"

//simple is better

const h = "hello";

console.log(h,h,h);
///*
class Example extends Scene
{
    preload ()
    {
        this.load.aseprite("ghost", "spookily.png", "spookily.json");
        //this.load.image("ghost", "./spookily.png");
    }

    create ()
    {
        this.anims.createFromAseprite("ghost");
        this.sprite = this.add.sprite(400, 300, "ghost");
        this.sprite.play({ key: "jump", repeat: -1 });
    }
}


function runGame (conf){
    const g = new Game(conf);
}

const conf = createConfig(Example)
runGame(conf);
