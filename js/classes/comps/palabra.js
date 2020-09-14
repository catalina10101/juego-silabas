class Palabra extends Phaser.GameObjects.Container{

    constructor(config){
        super(config.scene);
        this.scene = config.scene;

        if(!config.palabra)
            config.palabra = '-';
        if(config.x)
            this.x = config.x;
        if(config.y)
            this.y = config.y;
        this.config = config;

        this.AddBackImage();
        let palabraXpos, palabraYpos, origX;
        if(game.config.height < 350){//put to the right
            palabraXpos = this.back.displayWidth*0.5 + 15;
            palabraYpos = 0;
            origX = 0;
        }
        else {//put below
            palabraXpos = 0;
            palabraYpos = this.back.displayHeight*0.5 + G.SILABA_SIZE/2;
            origX = 0.5;
        }
        this.palabra = this.scene.add.text(palabraXpos, palabraYpos, config.palabra, 
            {color:'purple', fontSize:G.SILABA_SIZE, fontFamily: G.FONT_FAMILY});
        
        //this.palabra = this.scene.add.text(0, this.back.displayHeight*0.5 + G.SILABA_SIZE/2, config.palabra, {color:'purple', fontSize:G.SILABA_SIZE});
        this.palabra.setOrigin(origX,0.5);
        this.add(this.palabra);
        
        this.scene.add.existing(this);        
    }

    AddBackImage = () => {
        this.back = this.scene.add.image(0,0, this.config.palabra);
        this.back.setOrigin(0.5,0.5);        
        this.back.setInteractive();
        this.back.on('pointerdown', this.onPointerDown);
        this.add(this.back);   
        Align.scaleToGameH(this.back, 0.4);
    }

    onPointerDown = () => {
        //console.log("Palabra onDown", this.config.palabra);
        emitter.emit(G.PLAY_SOUND, this.config.palabra);
    }
}