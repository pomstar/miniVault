import { Scene }                from "../core/SceneManager";
import { SafeDoor }             from "../prefabs/SafeDoor";
import { Container, Sprite }    from "pixi.js";
import Keyboard                 from "../core/Keyboard";
import { DoorHandle }           from "../prefabs/DoorHandle";
import { getRandom }            from "../utils/helpers";
import { Glitter }              from "../prefabs/Glitter";
import { SimpleTimer }          from "../prefabs/SimpleTimer";

export default class Game extends Container implements Scene {
	name = "Minigame";
	private keyboard = Keyboard.getInstance();
    private doorHandle: DoorHandle;
    private safeDoor: SafeDoor;
    private glitter: Glitter;
    private timer:   SimpleTimer;

    // private doorState: string       = 'closed';
    private handleState: string     = 'still';
    private gameState: string       = 'stopped';
    private sequence: Array<string> = [];

	load() { 
        const bg = Sprite.from("bg");
        this.glitter = new Glitter()  
        this.safeDoor = new SafeDoor();
        this.timer = new SimpleTimer();

        this.addChild(bg, this.glitter, this.safeDoor, this.timer);
        this.doorHandle = this.safeDoor.getHandleInstance();

        this.keyboard.onAction(({ action, buttonState }) => {
            if (buttonState === "released") this.onActionRelease(action);
		});

        this.startGame();
    }

    startGame() {
        this.sequence = this.generateSequence();
        this.gameState = 'on';
        this.timer.start();
    }

    generateSequence(): Array<string> {
        let sequence: Array<string> = [];
        let message = 'The secret combination is: ';
        for (let dir of getRandom(0, 1) ? ['L', 'R', 'L'] : ['R', 'L', 'R']) {
            let steps = getRandom(1, 9);
            message += `${dir}${steps} `;
            for (let i = 0; i < steps; i++)
                sequence.push(dir);
        }
        console.log(message);
        return sequence;
    }

    resetGame() {
        this.gameState = 'stopped';
        this.timer.reset();
        this.doorHandle.spin().then(() => {
            this.startGame();
        })
    }

    checkStep(dir: string) {
        console.log(dir)
        if (this.sequence.shift() === dir) {
            if (!this.sequence.length) {
                this.timer.stop();
                console.log('YOU WON!');
                this.gameState = 'won';
                this.safeDoor.open()
                    .then(() => this.glitter.shine())
                    .then(() => this.safeDoor.close())
                    .then(() => this.resetGame());
            }
        } else {
            console.log('YOU LOST!');
            this.timer.stop();
            this.resetGame();
        }
    }

    onActionRelease(action: keyof typeof Keyboard.actions) { 
		switch (action) {
			case "LEFT":
                if (this.gameState === 'on' && this.handleState === 'still') {
                    this.handleState = 'moving';
                    this.doorHandle.rotate('left').then(() => {
                        this.handleState = 'still';
                        this.checkStep('L');
                    });
                }
                break;

			case "RIGHT":
                if (this.gameState === 'on' && this.handleState === 'still') {
                    this.handleState = 'moving';
                    this.doorHandle.rotate('right').then(() => {
                        this.handleState = 'still';
                        this.checkStep('R');
                    });
                }
                break;

            default:
            	break;
		}
	}

}
    