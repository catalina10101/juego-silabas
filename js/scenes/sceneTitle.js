class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {        
        // this.load.image("button1", "images/ui/buttons/2/1.png");
        // this.load.image("button2", "images/ui/buttons/2/5.png");
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        //controller= new Controller();

        console.log("SceneTitle!");
        if(model.isMobile >= 0)
            this.scale.startFullscreen();
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene: this});
        //this.alignGrid.showNumbers();

        let title = this.add.image(0,0, 'title');
        this.alignGrid.placeAtIndex(38, title);
        Align.scaleToGameW(title, 0.8);

        let btnStart = new FlatButton({scene: this, key: 'button1', text:'jugar', event:'start_game',
        textConfig: {color:'white', fontSize:60, fontFamily: G.FONT_FAMILY}
        ,scale: game.config.width < 650? 0.5: 0.3 });
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this );
    }
    update() {}

    startGame(){
        this.scene.start('SceneMain');
    }
}