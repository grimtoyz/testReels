'use strict';

import Reel from "./reel";
import * as PIXI from "pixi.js";

const REELS_AMOUNT = 5;
const REELS_PADDING_X = 10;


export default class ReelsView {

    constructor(app){

        this.app = app;
        this.container = new PIXI.Container;
        this._reels = [];

        this.createReels();
    }

    createReels(){

        var i;
        for (i = 0; i < REELS_AMOUNT; i++) {
            let reel = new Reel(this.app.renderer.height);
            this._reels.push(reel);

            var gap = this.app.renderer.width - REELS_PADDING_X * 2 - reel.width * REELS_AMOUNT;
            var offset = REELS_PADDING_X + reel.width * i + i * gap / (REELS_AMOUNT - 1);

            reel.reelContainer.x = offset;
            this.container.addChild(reel.reelContainer);
        }
    }

    get view(){

        return this.container;
    }

    get reels(){

        return this._reels;
    }
}