
import ReelSpinner from "./reelSpinner";

const REEL_WIDTH = 123;
const ALL_SYMBOLS_AMOUNT = 50;
const UNIQUE_SYMBOLS_AMOUNT = 13;
const SYMBOL_SCALE = 1.889;


export default class Reel {

    constructor(){

        this._symbolsContainer = new PIXI.Container;
        this.symbolIDs = [];

        this.generateSymbolIDs();

        let symbols = [0, 1, 2, 3, 4, 5];
        this.updateSymbols(symbols);

        this.spinner = new ReelSpinner();
    }

    generateSymbolIDs(){
        var i;
        for (i = 0; i < ALL_SYMBOLS_AMOUNT; i++) {
            let id = Math.floor(Math.random() * UNIQUE_SYMBOLS_AMOUNT);
            this.symbolIDs.push(id);
            console.log(id);
        }
    }

    updateSymbols(symbolsToShow){

        this._symbolsContainer.removeChildren();

        var i;
        for (i = 0; i < symbolsToShow.length; i++) {
            let id = this.symbolIDs[i];
            let texture = PIXI.utils.TextureCache[`M${id}_000.jpg`];
            var symbol = new PIXI.Sprite(texture);

            symbol.scale.x = SYMBOL_SCALE;
            symbol.scale.y = SYMBOL_SCALE;

            symbol.y = i * symbol.height;

            this._symbolsContainer.addChild(symbol);
        }

        console.log(this._symbolsContainer.children.length);
    }

    update(delta){
        this.reelContainer.y = this.spinner.update(delta);
    }

    get reelContainer(){
        return this._symbolsContainer;
    }

    get width(){

        return REEL_WIDTH;
    }

    // get spinner(){
    //
    //     return this.spinner;
    // }
}