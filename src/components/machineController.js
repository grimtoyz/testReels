'use strict';

const REEL_DELAY = 600;

var isSpinning = false;


export default class MachineController {

    constructor(reels){
        this.reels = reels;
        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.stop();
        this.ticker.add(this.update);
    }

    spin(){
        if (isSpinning)
            return;

        isSpinning = true;

        var i;
        for (i = 0; i < this.reels.length; i++) {
            this.reels[i].spinner.spin(REEL_DELAY * i);
        }
        this.ticker.start();
    }

    update(delta){

        var i;

        // if (!this.reels)
        //     return;

        for (i = 0; i < this.reels.length; i++) {
            this.reels[i].update(delta);
        }
    }
}