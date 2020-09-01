class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        // this.load.image("button1", "images/ui/buttons/2/1.png");
        // this.load.image("button2", "images/ui/buttons/2/5.png");
    }
    create() {        

        console.log("SceneTitle!");
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene: this});
        //this.alignGrid.showNumbers();

        let title = this.add.image(0,0, 'title');
        this.alignGrid.placeAtIndex(38, title);
        Align.scaleToGameW(title, 0.8);

        let btnStart = new FlatButton({scene: this, key: 'button1', text:'jugar', event:'start_game',textConfig: {color:'white', fontSize:40}, scale:0.3 });
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this );
    }
    update() {}

    startGame(){
        this.scene.start('SceneMain');
    }
}