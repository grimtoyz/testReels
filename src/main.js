'use strict';


import * as PIXI from 'pixi.js';
import ReelsView from "./components/reelsView";
import MachineController from "./components/machineController";

let app = new PIXI.Application({width: 704, height: 368});
let machineController;

document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensityW = true;

var orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;
console.log(orientation);

screen.onorientationchange = resize;

window.onresize = resize;


PIXI.loader
    .add('./assets/assets.json')
    .load(setup);


function setup() {

    resize();

    fillBackGround();

    let machine = new ReelsView(app);
    app.stage.addChild(machine.view);

    machineController = new MachineController(machine.reels);

    createSpinButton();
}

function fillBackGround() {

    let sprite = new PIXI.Sprite(
        PIXI.utils.TextureCache["background.jpg"]
    );
    sprite.scale.x = 1.1;
    app.stage.addChild(sprite);
}

function createSpinButton() {

    function onClick() {
        machineController.spin();
    }

    let textureButton = PIXI.utils.TextureCache["spinButton.png"];
    var spinButton = new PIXI.Sprite(textureButton);
    spinButton.buttonMode = true;
    spinButton.interactive = true;
    spinButton.x = app.renderer.width - spinButton.width;
    spinButton.y = app.renderer.height - spinButton.height;
    app.stage.addChild(spinButton);

    spinButton.tap = onClick;
    spinButton.click = onClick;
}

function resize() {
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.left = ((window.innerWidth - app.renderer.width) >> 1) + 'px';
}

