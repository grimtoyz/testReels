import Reel from "./reel";

const REEL_SPINING_SPEED = 30;
const REEL_BACK_SPINING_SPEED = -1;
const SPIN_DURATION = 50;
const ACCELERATION_MULTIPLIER = 0.5;

export default class ReelSpinner {

    constructor(reel) {
        this.reel = reel;
        this.symbolHeight = reel.symbolHeight;
        this.isStarted = false;
    }

    spin(delay){
        this.spinDelta = 0;
        this.delay = delay;
        this.duration = SPIN_DURATION;
        this.isStarted = true;
        this.spinnedBackDistance = 0;
        this.backTargetDistance = 0;
        this.speed = 0;
        this.totalSpinDelta = 0;
        this._finished = false;
        this.isBackEasing = false;
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
        else
        {
            if (this.isBackEasing && !this._finished)
                this.speed = REEL_BACK_SPINING_SPEED;

            this.updateStopping(deltaTime);
            return;
        }

        this.spinDelta = deltaTime * this.speed;
        this.totalSpinDelta += this.spinDelta;

        this.reel.updatePosition(this.spinDelta);

    }

    updateStopping(deltaTime){

        this.spinDelta = deltaTime * this.speed;

        let totalSpinDelta = this.totalSpinDelta + this.spinDelta;

        var divided = totalSpinDelta / this.reel.symbolHeight;
        var decimals = divided - Math.trunc(divided);

        if (!this.isBackEasing) {
            if (decimals > 0.1 && decimals < 0.3){
                this.speed = 0;
                this.spinDelta -= decimals * this.symbolHeight - 0.2 * this.symbolHeight;
                this.isBackEasing = true;
                this.backTargetDistance = 0.2 * this.symbolHeight;
            }
        }
        else {

            this.spinnedBackDistance += Math.abs(this.spinDelta);

            if (this.spinnedBackDistance >= this.backTargetDistance){
                this.speed = 0;

                this.spinDelta -= decimals * this.symbolHeight - this.symbolHeight;
                this._finished = true;
                this.isStarted = false;
            }
        }

        this.totalSpinDelta += this.spinDelta;

        this.reel.updatePosition(this.spinDelta);
    }

    get finished(){
        return this._finished;
    }
}