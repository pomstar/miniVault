import { Sprite, Container } from "pixi.js";

type SpriteDescription = {
    name?       :   string;
	x?          :   number;
	y?          :   number;
	alpha?      :   number;
    center?     :   boolean;
}

export function addSprite (args: SpriteDescription): Sprite | Container {
    const {name, center = false, ...rest} = args;
    const sprite = name === undefined ? new Container() : Sprite.from(name);

    for (let prop in rest)  
        sprite[prop] = rest[prop];

    if (center) 
        sprite.pivot.set(sprite.width / 2, sprite.height / 2);
    
    return sprite;
}

export function getRandom (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}