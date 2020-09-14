class Celebration extends Phaser.GameObjects.Container{

    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        this.aID = Math.floor(Math.random() *10);
        if(!config.color)
            config.color = 0xB833FF;
        if(!config.width)
            config.width = game.config.width*0.5 ;
        if(!config.height)
            config.height = game.config.height*0.7;  
        if(!config.playerNum)
            config.playerNum = "";  
        this.config = config;

        this.graphics = this.scene.add.graphics();
        this.AddBackground();
        this.AddMessage();
        this.PutButton();
        this.scene.add.existing(this);

        this.callBackFcn = null; 
        this.x = game.config.width/2 - this.config.width/2;
        this.y = game.config.height/2 - this.config.height/2;
        
        this.setSize(this.config.width, this.config.height);
        this.LoadAnimation();
        this.setVisible(false);
    }

    AddBackground(){        
        this.graphics.lineStyle(3, 0x000000);
        this.graphics.fillStyle(this.config.color, 1);//color, transparency
        this.graphics.fillRect(0,0, this.config.width, this.config.height);
        this.graphics.strokeRect(0,0, this.config.width, this.config.height);    
        this.add(this.graphics);            
    }   

    AddMessage(){        
        this.message1 = this.scene.add.text(this.config.width*0.5, this.config.height*0.1, "¡En hora buena!", {fontFamily: 'Anton', color:'white', fontSize:30});
        this.message1.setOrigin(0.5,0.5);                  
        this.add(this.message1);
    }

    LoadAnimation(){
        this.gif = this.scene.add.sprite(this.config.width*0.5, this.config.height*0.45, "celeb");
        this.gif.setOrigin(0.5,0.5);  
        //Align.scaleToObjW(this.gif, 0.8, this);
        this.gif.displayWidth= this.config.width*1.4 ; //game.config.width*0.3;
        this.gif.scaleY = this.gif.scaleX;
        this.add(this.gif);
        
		let frameNames = this.scene.anims.generateFrameNumbers('celeb');
		this.anim = this.scene.anims.create({
			key: 'celebrateAnim',
			frames: frameNames, //or walkingImgs			
			frameRate: 7,
			repeat: -1 // -1 to run forever, x number to run x times.
		});        
    }
    
    PlayAnimation(msg1, callBackFcn){
        this.callBackFcn = callBackFcn;
        if(msg1 != null)
            this.message1.setText(msg1);         
        this.gif.anims.play('celebrateAnim');
        this.setVisible(true);
    }    

    PutButton = () => {        
        let textConf = {color:'black', fontSize:20};
        this.okButton = new FlatButton({scene: this.scene, key: 'button1', text: 'Ok', x:this.config.width*0.5, y:this.config.height*0.9, 
            event:'ok_button_pressed', params:null, textConfig: textConf, scale: 0.2
        });        
        this.add(this.okButton);
        emitter.on('ok_button_pressed', this.btnOKPressed, this);
    }

    btnOKPressed = ()=> {
        //console.log("ok celeb", this.aID);
        if(this.gif.anims)
            this.gif.anims.stop(null, true);
        this.setVisible(false);
        if(this.callBackFcn)
            this.callBackFcn();
    }

}