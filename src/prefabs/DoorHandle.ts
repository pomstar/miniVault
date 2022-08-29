import { Container, Sprite } from "pixi.js";
import { addSprite } from "../utils/helpers";
import gsap from "gsap";

export class DoorHandle extends Container {

    doorHandle:         Sprite;
    doorHandleShadow:   Sprite;

    constructor() {
        super();
        this.addSprites();
    }

    public rotate(dir: string) {
        return gsap.timeline().to(
            [this.doorHandle, this.doorHandleShadow], 
            {
                duration: .5,
                angle: `+= ${dir === 'left' ? -60 : 60}`
            }
        );
    }

    public spin() {
        const duration = 2;
        const spins = 5;
        const angle = duration * spins * 360;

        return gsap.timeline().to(
            [this.doorHandle, this.doorHandleShadow], 
            {
                angle: `+=${angle}`,
                duration: duration,
                ease: "power3.inOut"
            }
        );
    }

    private addSprites() {
        this.doorHandle = addSprite(
            {
                name: 'handle', 
                center: true,
            }
        ) as Sprite;

        this.doorHandleShadow = addSprite(
            {
                name: 'handleShadow', 
                center: true,
                x: 30,
                y: 30
            }
        ) as Sprite;

        this.addChild(this.doorHandleShadow, this.doorHandle);
    }
}