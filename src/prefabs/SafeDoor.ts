import { Container, Sprite }    from "pixi.js";
import { addSprite }            from "../utils/helpers";
import gsap                     from "gsap";
import { DoorHandle }           from "./DoorHandle";

export class SafeDoor extends Container {

    door: Sprite;
    openDoor: Container;
    doorContainer: Container;
    doorHandle: DoorHandle;

    constructor() {
        super();

        this.addSprites();
    }

    public getHandleInstance(): DoorHandle {
        return this.doorHandle;
    }

    public open() {
        const duration = 1.5;

        return gsap.timeline().to(
            this.doorContainer,
            {
                duration: duration,
                alpha: 0
            }
        ).to (
            this.openDoor, 
            {
                duration: duration,
                alpha: 1,
            }, 0
        );
    }

    public close() {
        const duration = 1;
        const delay = 5;

        return gsap.timeline().delay(delay)
        .to(
            this.doorContainer,
            {
                duration: duration,
                alpha: 1
            }
        ).to (
            this.openDoor, 
            {
                duration: duration,
                alpha: 0,
            }, 0
        );
    }
    
    private addSprites() {
        this.doorContainer = addSprite(
            {
                x: 2070, 
                y: 570,
            }
        );

        this.doorHandle = new DoorHandle();
        this.doorHandle.x = 910;
        this.doorHandle.y = 910;

        const door = Sprite.from('door');
        this.openDoor = addSprite(
            {
                x: 3800, 
                y: 570,
                alpha: 0
            }
        );
 
        this.addChild(this.doorContainer, this.openDoor);
        this.doorContainer.addChild(door, this.doorHandle);

        const doorShadow    =   Sprite.from('doorOpenShadow');
        const doorOpen      =   Sprite.from('doorOpen');

        this.openDoor.addChild(doorShadow, doorOpen);
    }
    
}