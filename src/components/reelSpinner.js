
const REEL_STARTING_SPEED = 10;

export default class ReelSpinner {

    constructor() {
        this.spinDelta = 0;
    }

    spin(delay){
        this.delay = delay;
        // alert(delay);
        this.tween = new PIXI.tween();
    }

    update(delta){
        if (this.delay > 0)
        {
            this.spinDelta += delta * 10;
        }

        PIXI.tween.Easing.inOutBack

        return this.spinDelta;
    }
}