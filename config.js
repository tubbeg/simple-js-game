import { AUTO } from "phaser";


export const createConfig = (scenes) =>
{
    const config = {
        type: AUTO,
        width: 800,
        height: 600,
        scene: scenes,
         pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        }
    };
    return config;
}
