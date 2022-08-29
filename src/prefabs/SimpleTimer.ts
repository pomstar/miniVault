import { Container, Text, TextStyle } from "pixi.js";

export class SimpleTimer extends Container {

    private timer: Text;
    private elapsedTime: number = 0;
    private running: boolean = false;
    private xx: number = 1910;
    constructor() {
        super();

        this.timer = new Text('0', {
            fontFamily: 'monospace', 
            fontSize: 100, 
            fill: 0xff1010,
            align: 'right', // doesn't seem to have any effect
            wordWrap: true
        });
        this.addChild(this.timer);
        this.timer.x = this.xx - this.timer.width; 
        this.timer.y = 1310;

        const tick = function() {
            if(this.elapsedTime < 999 && this.running) {
                this.elapsedTime++;
                this.timer.text = this.elapsedTime;
                this.timer.x = this.xx - this.timer.width; //quick and dirty fix
            }
        }
        const t = setInterval(tick.bind(this), 1000);
    }

    public start() {
        this.running = true;
    }

    public stop() {
        this.running = false;
    }

    public reset() {
        this.elapsedTime = 0;
    }
}