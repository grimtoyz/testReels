
const REEL_WIDTH = 123;
const ALL_SYMBOLS_AMOUNT = 50;
const UNIQUE_SYMBOLS_AMOUNT = 13;
const SYMBOL_SCALE = 1.889;


export default class Reel {

    constructor(screenHeight){

        this.screenHeight = screenHeight;
        this._symbolsContainer = new PIXI.Container;
        this.symbolIDs = [];

        this.generateSymbolIDs();

        this.currentSymbols = [0, 1, 2, 3, 4];
        this.createSymbols(this.currentSymbols);

        let texture = PIXI.utils.TextureCache['M0_000.jpg'];
        this._symbolHeight = Math.floor(texture.height * SYMBOL_SCALE);
    }

    generateSymbolIDs(){
        var i;
        for (i = 0; i < ALL_SYMBOLS_AMOUNT; i++) {
            let id = Math.floor(Math.random() * UNIQUE_SYMBOLS_AMOUNT);
            this.symbolIDs.push(id);
        }
    }

    createSymbols(symbolsToShow){
        var i;
        for (i = 0; i < symbolsToShow.length; i++) {
            let id = this.symbolIDs[symbolsToShow[i]];
            let texture = PIXI.utils.TextureCache[`M${id}_000.jpg`];
            var symbol = new PIXI.Sprite(texture);

            symbol.scale.x = SYMBOL_SCALE;
            symbol.scale.y = SYMBOL_SCALE;

            symbol.y = -2 * Math.floor(symbol.height) + i * Math.floor(symbol.height);

            this._symbolsContainer.addChild(symbol);
        }
    }


    updatePosition(spinDelta){

        var shouldAdd = false;
        var i;
        var bottomSymbolY = 0;

        for (i=0; i < this._symbolsContainer.children.length; i++){
            let symbol = this._symbolsContainer.children[i];
            // symbol.y += Math.floor(spinDelta);
            symbol.y += spinDelta;

            if (symbol.y > this.screenHeight){
                this.shiftSymbols(-1);
                bottomSymbolY = symbol.y;
                shouldAdd = true;

                this._symbolsContainer.removeChild(symbol);
            }
        }

        if (shouldAdd)
        {
            let offset = bottomSymbolY - (this._symbolsContainer.children.length + 1) * this._symbolHeight;
            this.addSymbolToTop(this.currentSymbols[0], offset);
        }
    }

    addSymbolToTop(index, offset){
        let id = this.symbolIDs[index];
        let texture = PIXI.utils.TextureCache[`M${id}_000.jpg`];
        var symbol = new PIXI.Sprite(texture);

        symbol.scale.x = SYMBOL_SCALE;
        symbol.scale.y = SYMBOL_SCALE;

        symbol.y = offset;

        this._symbolsContainer.addChildAt(symbol, 0);
        this._symbolsContainer;
    }

    shiftSymbols(direction){

        var i;
        for (i=0; i < this.currentSymbols.length; i++){
            this.currentSymbols[i] += direction;

            if (this.currentSymbols[i] < 0)
                this.currentSymbols[i] = this.symbolIDs.length - 1;

            if (this.currentSymbols[i] > this.symbolIDs.length - 1)
                this.currentSymbols[i] = 0;
        }
    }

    get reelContainer(){
        return this._symbolsContainer;
    }

    get width(){

        return REEL_WIDTH;
    }

    get symbolHeight(){
        return this._symbolHeight;
    }
}