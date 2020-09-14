class Espacio extends Phaser.GameObjects.Container{

    constructor(config){
        super(config.scene);
        this.scene = config.scene;

        if(!config.silaba)
            config.silaba = '';
        if(!config.width)
            config.width = 200;
        if(!config.height)
            config.height = 200;
        if(config.x)
            this.x = config.x;
        if(config.y)
            this.y = config.y;
        this.config = config;
        this.match = false;
        this.AddGraphics();

        this.text = this.scene.add.text(0, -G.SILABA_SIZE/3, "", {color:'black', fontSize: G.SILABA_SIZE, fontFamily: G.FONT_FAMILY});
        this.text.setOrigin(0.5,0.5);
        this.add(this.text);

        this.setSize(this.config.width, this.config.height);
        this.scene.add.existing(this);
    }

    AddGraphics= () => {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(4, 0x00FFFF);
        this.graphics.moveTo(-this.config.width/2, 0);
		this.graphics.lineTo(this.config.width/2, 0);
        this.graphics.strokePath();
        
        this.add(this.graphics);
    }

    CheckSilabaMatch = (silaba) =>{
        if(silaba.trim() === this.config.silaba.trim()){
            emitter.emit(G.PLAY_SOUND, 'success');
            this.match = true;
            this.text.setText(this.config.silaba);
            return true;
        }
        else
            return false;
    }
}