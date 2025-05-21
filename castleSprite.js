"use strict";


function castleIsOutOfBounds (castle){
    return castle.inCamera && (castle.x < 600);
}



function addCastle (objFactory, sprite, physicsWorld){
    const castle = objFactory.sprite(800,400, "dark_castle").setScale(3,3);
    castle.setVelocityX(-100);
    castle.body.setAllowGravity(false);
    castle.body.setImmovable();
    objFactory.collider(sprite, castle);
    physicsWorld.on('collide', (go1, go2, b1, b2) =>
    {
        console.log("ghost is dead :/");
        sprite.setData("alive", "false");
        sprite.play({ key: "dead"});
        sprite.body.setCollidesWith([]);
        castle.setAlpha(0.5);
    });
    return castle;
}


export {addCastle, castleIsOutOfBounds};