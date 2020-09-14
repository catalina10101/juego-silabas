class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain'); //same as class name 
        this.tema = 'casa';        
        this.wordsLong = palabras_casa;
        this.words = [this.wordsLong[0], this.wordsLong[1]];
    }
    preload()
    {
        //load imgs or sounds        
        let wordKeys = this.words.map(x=> x.key);

        let silabs = this.words.map(x=> x.silabas);
        this.silabasKeys = []; //[].concat(silabs);
        silabs.forEach(x=> {
            this.silabasKeys = [].concat(this.silabasKeys, x);
        });
        //console.log(wordKeys, this.silabasKeys);

        //LOADING WORD RELATED
        wordKeys.forEach(key=>{
            this.load.audio(key, [pluginPath + `audio/${this.tema}/${key}.mp3`]);//"audio/meow.ogg"
            this.load.image(key, pluginPath+`images/${this.tema}/${key}.jpg`);
        });

        this.silabasKeys.forEach(key=>{
            this.load.audio(key, [pluginPath+`audio/${this.tema}/${key}.mp3`]);//"audio/meow.ogg"            
        });
        //this.load.audio("cat", ["audio/" +this.tema + "/" + meow +".mp3"]); 
        
        //OTHERS
        
    }
    create() {
        //define objects        
        //this.CreateScoreBox();
        console.log("Ready!");
        emitter = new Phaser.Events.EventEmitter();
        let minorLenght = game.config.width < game.config.height ? game.config.width : game.config.height;
        this.celebration = new Celebration({scene:this, width: minorLenght*0.9, height: minorLenght*0.9});
        //controller = new Controller();
        this.pointedSilab = null;
        this.spaceWidth = game.config.width*0.15; //model.isMobile? 70: 150;
        this.spaceHeight = this.spaceWidth*0.6;
        this.silY = game.config.height*0.85;
        this.spaceY = game.config.height*0.65;
        this.nextID = 0;
        this.currWordIdx = 0;
        //this.PutButtons();
        // let gridConfig = {rows:16, cols:8, scene: this};
        // this.alignGrid = new AlignGrid(gridConfig);     
        
        //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //game.height = window.outerHeight;
        
        // if(model.isMobile >= 0)
        //     this.scale.startFullscreen();
        let mediaManager = new MediaManager({scene: this});
        //mediaManager.setBackgroundMusic('backgroundMusic');
        //let sb = new SoundButtons({scene: this});          

        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointerup', this.onPointerup, this);
        this.ShowNextWord(this.currWordIdx);
    }
    update() {
        //this is running constantly.
        //console.log("update", game.input.activePointer.worldX, "-", game.input.activePointer.position);
        if(this.pointedSilab != null){
            let dx = game.input.activePointer.worldX - this.whenDown.x; //game.input.mousePointer.x
            let dy = game.input.activePointer.worldY - this.whenDown.y; 

            this.pointedSilab.x = this.pointedSilabOrigPos.x + dx;
            this.pointedSilab.y = this.pointedSilabOrigPos.y + dy;            
        }            
    }
    //PUT WORD 
    ShowNextWord = (wordIdx) => {
        let wordObj = this.words[wordIdx];
        this.palabra = new Palabra({scene: this, palabra: wordObj.key, x: game.config.width/2, y: game.config.height*0.2 });// this.add.image(game.config.width/2, game.config.height*0.2, wordObj.key);
        //word spaces
        this.currSpaces = [];
        //silabas 
        this.currSilabas = [];
        let marginPer = game.config.width < 450 ? 0.05 : 0.1;
        this.silabasLeftMargin = game.config.width*marginPer;
        
        //console.log("this.silabaSpace", this.silabaSpace);
        
        this.PutSilabaSpaces(wordObj.silabas);
        this.PutSilabas(wordObj.silabas);
    }

    PutSilabaSpaces = (silabas) => {        
        this.spaceLeftMargin = game.config.width*0.3;
        this.spaceSpace = (game.config.width - (2*this.spaceLeftMargin))/ silabas.length;        
        silabas.forEach( (s, idx) => {
            let silX = this.spaceLeftMargin + idx*this.spaceSpace + this.spaceSpace/2;
            this.currSpaces[idx] = new Espacio({scene: this, silaba: s, x: silX, y: this.spaceY, width: this.spaceWidth, height: this.spaceHeight});           
       });
    }

    PutSilabas = (silabas) => {                
        let randomSilabas = [];
        let excludedSilabas = [...silabas];
        for(let i =0; i < 2; i++) {
            randomSilabas[i] = this.GetRandomSilaba(excludedSilabas);
            excludedSilabas.push(randomSilabas[i]);
        }        
        randomSilabas = [].concat(randomSilabas, silabas);
        randomSilabas = this.ShuffleArray(randomSilabas);
        
        this.silabaSpace = (game.config.width - (2*this.silabasLeftMargin))/ randomSilabas.length;

        randomSilabas.forEach( (s, idx) => {
            let silX = this.silabasLeftMargin + idx*this.silabaSpace + this.silabaSpace/2;
            this.currSilabas[idx] = new Silaba({scene: this, silaba: s, x: silX, y: this.silY, id: this.GetNextId()});
       });
       this.silabaWidth = this.currSilabas[0].width;
       this.silabaHeight = this.currSilabas[0].height;
    }

    ShuffleArray = (inputArray) => {
        let endArray = [];
        let deckLenght = inputArray.length;
        endArray.length = deckLenght;
        for(let i=0; i < deckLenght; i++){
            let random = Math.floor(Math.random()*(deckLenght-i));
            endArray[i] = inputArray[random];
            inputArray.splice(random, 1);
        }    
        return endArray;
    }

    GetRandomSilaba = (excludedWords) => {
        let found = false;
        let tries = 0;
        let ranWord ="";
        while(!found && tries <= this.silabasKeys.length){
            let ran = Math.floor( Math.random()* this.silabasKeys.length);
            if( excludedWords.includes(this.silabasKeys[ran] ))
                tries++;
            else {
                found = true;
                ranWord = this.silabasKeys[ran];
            } 
        }

        if(!found)
            ranWord = 'sa';
        return ranWord;
    }
    // put handlers
    onPointerDown(pointer){
        //sconsole.log(game.input, game.input.worldX);
        this.whenDown = {x: pointer.x, y: pointer.y }
        this.pointedSilab = this.GetPointedSilaba(this.whenDown.x, this.whenDown.y);
        this.pointedSilabOrigPos = this.pointedSilab==null? null : {x: this.pointedSilab.x, y: this.pointedSilab.y};        
        //console.log("pointedSilab", this.pointedSilab==null? "null" : this.pointedSilab.id);      
    }
   
    onPointerup(pointer){
        this.whenUp = {x: pointer.x, y: pointer.y };               
        
        //let distance = this.GetDistance(this.whenUp.x, this.whenDown.x, this.whenUp.y, this.whenDown.y); 
        this.pointedSpace = this.GetPointedSpace(this.whenUp.x, this.whenUp.y);
        //console.log("pointedSpace", this.pointedSpace);
        if(this.pointedSpace != null && this.pointedSilab != null){
            let isMatch = this.pointedSpace.CheckSilabaMatch(this.pointedSilab.silaba);
            if(isMatch == true) {
                //check word
                let idx = this.currSilabas.map(x=> x.ID).indexOf(this.pointedSilab.ID );
                this.currSilabas.splice(idx,1);
                this.pointedSilab.destroy();
                let isWordComplete = this.currSpaces.reduce( (prev, curr, idx)=> {return prev && curr.match}, true);
                if(isWordComplete){
                    this.time.addEvent({ delay: 1500, callback: this.OnWordCompleted, callbackScope: this, loop: false });                    
                }
            }
            else {
                this.pointedSilab.x = this.pointedSilabOrigPos.x;
                this.pointedSilab.y = this.pointedSilabOrigPos.y;
            }
        }

        this.pointedSilab = null;
    }

    OnWordCompleted = () => {
        this.celebration.PlayAnimation("¡MUY BIEN!", this.OnCelebrationFinished);
        this.celebration.depth = 200; //this.GetNextDepth();
    }

    GetPointedSilaba(x, y){
        return this.GetPointedObj(x, y, this.currSilabas, this.silabaWidth, this.silabaHeight);
    }

    GetPointedSpace(x, y){
        return this.GetPointedObj(x, y, this.currSpaces, this.spaceWidth, this.spaceHeight);
    }

    GetPointedObj = (x, y, objArr, objWidth, objHeight) =>{
        let found = false;
        let index =0;
        let obj = null; 
        while(!found && index < objArr.length){
            let c = objArr[index];            
            //console.log(x, c.x);
            let distX = Math.abs(x - c.x);
            let distY = Math.abs(y - c.y);
            if(distX <= objWidth/2 && distY <= objHeight/2){
                found = true;
                obj = c;
            }
            index++;
        }
        return obj;
    }

    GetNextId = () =>{
        return this.nextID++;
    }

    OnCelebrationFinished = () => {
        this.palabra.destroy();
        this.currSpaces.forEach(s=> s.destroy());
        this.currSilabas.forEach(s=> s.destroy());
        this.currWordIdx++;
        if(this.words.length > this.currWordIdx)
            this.ShowNextWord(this.currWordIdx);
        else 
            this.scene.start("SceneOver");
    }
    // GetDistance(x1, x2, y1, y2){
    //     let distX = x1-x2;
    //     let distY = y1-y2;
    //     let distance = Math.sqrt((distX*distX) + (distY*distY));
    //     return distance;
    // }
    ///buttons
    
}