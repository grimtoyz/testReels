import Reel from "./reel";

const REEL_SPINING_SPEED = 15;
const SPIN_DURATION = 100;
const ACCELERATION_MULTIPLIER = 0.5;

export default class ReelSpinner {

    constructor(reel) {
        this.reel = reel;
        this.symbolHeight = reel.symbolHeight;
        this.spinDelta = 0;
        this.isStarted = false;
        this.speed = 0;
        this.totalSpinDelta = 0;
    }

    spin(delay){
        this.delay = delay;
        this.duration = SPIN_DURATION;
        this.isStarted = true;
    }

    easingBackIn(t, b, c, d, s){
        return (c*(t/=d)*t*((s+1)*t - s) + b);
    }

    update(deltaTime){

        if (!this.isStarted)
            return;

        if (this.duration > 0)
        {
            this.duration -= deltaTime;

            if (this.speed < REEL_SPINING_SPEED)
                this.speed += deltaTime * ACCELERATION_MULTIPLIER;
        }
        else if (this.delay > 0)
        {
            this.delay -= deltaTime;
        }
        else if (this.speed > 0)
        {
            this.speed -= deltaTime * 2;
        }

        this.spin()
        this.spinDelta = deltaTime * this.speed;
        this.totalSpinDelta += this.spinDelta;

        if (this.speed < 0)
        {
            let divided = this.totalSpinDelta/this.reel.symbolHeight;
            let decimals = divided - Math.trunc(divided);
            if (decimals < 0.1)
                this.speed = 0;
        }

        this.reel.updatePosition(this.spinDelta);


        // if (this.spinDelta >= this.symbolHeight)
        // {
        //     this.spinDelta -= this.symbolHeight;
        //     this.reel.shiftSymbols(-1);
        // }
        // else
        // {
        //     this.symbolsSnap = 0;
        // }
    }
}