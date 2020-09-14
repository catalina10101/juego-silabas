class Silaba extends Phaser.GameObjects.Container{

    constructor(config){
        super(config.scene);
        this.scene = config.scene;

        this.ID = config.id;

        if(!config.silaba)
            config.silaba = '-';
        if(config.x)
            this.x = config.x;
        if(config.y)
            this.y = config.y;
        this.config = config;
        this.silaba = config.silaba

        this.back = this.scene.add.image(0,0, 'silabaBack');
        this.back.setInteractive();
        this.back.on('pointerdown', this.onDown);
        this.back.setOrigin(0.5,0.5);        
        this.add(this.back);
        let scale = game.config.width < 450 ? 0.2 : 0.15;
        Align.scaleToGameW(this.back, scale);

        this.silabaTxt = this.scene.add.text(0,0, config.silaba, {color:'black', fontSize: G.SILABA_SIZE, fontFamily: G.FONT_FAMILY});
        this.silabaTxt.setOrigin(0.5,0.55);
        this.add(this.silabaTxt);

        this.setSize(this.back.displayWidth, this.back.displayHeight);
        this.scene.add.existing(this);
    }

    onDown = () =>{
        //console.log("silaba down: ", this.config.silaba);
        emitter.emit(G.PLAY_SOUND, this.config.silaba);
    }
}