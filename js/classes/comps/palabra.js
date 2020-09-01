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
             
        this.palabra = this.scene.add.text(0,this.back.displayHeight*0.5 + 5 , config.palabra, {color:'purple', fontSize:G.SILABA_SIZE});
        this.palabra.setOrigin(0.5,0);
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