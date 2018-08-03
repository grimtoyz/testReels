'use strict';

import ReelSpinner from "./reelSpinner";

const REEL_STOP_DELAY = 30;

var isSpinning = false;


export default class MachineController {

    constructor(reels){
        this.reels = reels;
        this.spinners = [];
        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.stop();
        this.ticker.add(this.update.bind(this));

        this.createSpinners();
    }

    createSpinners(){
        var i;
        for (i = 0; i < this.reels.length; i++) {
            let spinner = new ReelSpinner(this.reels[i]);
            this.spinners.push(spinner);
        }
    }

    spin(){
        if (isSpinning)
            return;

        isSpinning = true;

        var i;
        for (i = 0; i < this.spinners.length; i++) {
            this.spinners[i].spin(REEL_STOP_DELAY * i);
        }

        this.ticker.start();
    }

    update(deltaTime){

        var i;
        for (i = 0; i < this.spinners.length; i++) {
            this.spinners[i].update(deltaTime);
        }
    }
}