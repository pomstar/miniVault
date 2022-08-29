import { Container, Sprite }    from "pixi.js";
import { addSprite }            from "../utils/helpers";
import gsap                     from "gsap";
import { getRandom } from "../utils/helpers";

export class Glitter extends Container {

    glitterContainer: Container;
    sparks: Array<Sprite> = [];
    sparksLayout: Array<Object>;

    constructor() {
        super();

        this.sparksLayout = [
            {name: 'blink', x: 0,   y: 0,   alpha: 0, center: true},
            {name: 'blink', x: 200, y: 100, alpha: 0, center: true},
            {name: 'blink', x: 550, y: 280, alpha: 0, center: true},
            {name: 'blink', x: 710, y: 350, alpha: 0, center: true},
        ];
        this.addSprites();
    }

    public shine() {
        const shineAnim = gsap.timeline();
        const offset = .15;
        const duration = .5;
        for (let i in this.sparks) {
            shineAnim.to(this.sparks[i], 
                            {
                                duration: duration, 
                                alpha: 1, 
                                width: '*=1.5', 
                                height: '*=1.5', 
                                angle: '+=180', 
                                ease: 'none'
                            }, 
                            offset * parseInt(i))
                     .to(this.sparks[i], 
                            {
                                duration: duration, 
                                alpha: 0,
                                width: '*=0.7', 
                                height: '*=0.7', 
                                angle: '+=180', 
                                ease: 'none'
                            }, 
                            offset * parseInt(i) + duration
                        );
        }
        return shineAnim;
    }

    private addSprites() {
        this.glitterContainer = addSprite (
            {
                x: 2550, 
                y: 1350
            }
        );
        this.addChild(this.glitterContainer);
        for(let i in this.sparksLayout) {
            this.sparksLayout[i]['angle'] = getRandom(0, 360);
            let spark = addSprite(this.sparksLayout[i]) as Sprite;
            this.sparks.push(spark);
            this.glitterContainer.addChild(spark);
        }
    }
}
