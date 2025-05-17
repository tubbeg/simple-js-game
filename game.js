import {Scene,Game} from "phaser"
import {createConfig} from "./config.js"

//simple is better

const h = "hello";

console.log(h,h,h);

class Example extends Scene
{
    preload ()
    {

        this.load.image("ghost", "./spookily.png");
    }

    create ()
    {
        this.add.image(400, 300, "ghost");
    }
}


function runGame (conf){
    const g = new Game(conf);
}

const conf = createConfig(Example)
runGame(conf);
