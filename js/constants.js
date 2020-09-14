class Constants
{
    constructor(){
        this.SET_SCORE = "setScore";
        this.UP_POINTS = "upPoints";
        this.SCORE_UPDATED = "scoreUpdated";
        this.PLAY_SOUND = "playSound";
        this.MUSIC_CHANGED = "musicChanged";
        this.TOGGLE_SOUND = "toggleSound";
        this.TOGGLE_MUSIC = "toggleMusic";
        this.SILABA_SIZE = this.GetSilabaSize(); //model.isMobile>0? 30: 60;// 640 1024 2000 
        this.FONT_FAMILY = 'cursive';
        console.log("w", game.config.width, "h", game.config.height, "silabaSize", this.SILABA_SIZE);
    }

    GetSilabaSize = () => {        
        if(game.config.width < 800 && game.config.height < 800)
            return 50;
        if(game.config.width < 1500 && game.config.height < 1500)
            return 90;
        if(game.config.width >= 1500 && game.config.height >= 1500)
            return 60;        
    }
}