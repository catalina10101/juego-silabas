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
    }

    GetSilabaSize = () => {
        console.log(game.config.width);
        if(game.config.width < 800)
            return 30;
        if(game.config.width < 1500)
            return 60;
        if(game.config.width < 800)
            return 60;

    }
}