class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad'); //same as class name 
    }
    preload(){
        this.bar = new Bar({scene: this, x:game.config.width/2, y:game.config.height/2});
        this.progText = this.add.text(game.config.width/2,game.config.height/2, "0%", {color:'#ffffff', fontSize: game.config.width/20} );
        this.progText.setOrigin(0.5,0.5);
        this.load.on('progress', this.onProgress, this);

        //this.load.image("face", "images/face.png");
        pluginPath = ""; //wpa_data.plugin_path;
        this.load.image("title", pluginPath+ "images/title.png");
        this.load.image("button1", pluginPath+"images/ui/buttons/2/1.png");
        this.load.image("button2", pluginPath+"images/ui/buttons/2/5.png");
        this.load.audio('success', [pluginPath+"audio/success.mp3"]);
        // this.load.audio('cat', ["audio/meow.mp3","audio/meow.ogg"]);
        // this.load.audio('backgroundMusic', ["audio/background.mp3","audio/background.ogg"]);
        this.load.image('silabaBack', pluginPath+`images/ui/buttons/2/4.png`);
        this.load.spritesheet('celeb', pluginPath+'images/animations/celebrationFrames.png', { frameWidth: 700, frameHeight: 209, margin:0, spacing:0 });//margin: between rows 165
    }
    create(){
        this.scene.start("SceneTitle");
    }

    onProgress(value){
        //console.log(value);
        this.bar.setPercent(value);
        let per = Math.floor(value*100);
        this.progText.setText(per + "%");
    }
}