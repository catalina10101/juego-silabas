let game;
let model;
let emitter;
let G;
let controller;
let pluginPath;
window.onload = function () {

    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

    if (isMobile == -1){//not mobile
        var config = {
            type: Phaser.AUTO, //graphics_mode: Canvas, WebGL, AUTO 
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            parent: 'juego-silabas', //id of element where you want to load the game in the html.
            scene: [SceneLoad, SceneTitle, SceneMain, SceneOver] //[nameOfScene]  class name not file name.
        };
    }
    else {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            parent: 'juego-silabas',
            scene: [SceneLoad, SceneTitle, SceneMain, SceneOver]
        };
    }
    model = new Model();    
    model.isMobile = isMobile;      
    game = new Phaser.Game(config);
    G = new Constants();  
    game.scale.forceOrientation(true, false);//landscape, portrait
    game.scale.enterIncorrectOrientation.add(ShowOrientationError, null);
    game.scale.leaveIncorrectOrientation.add(RemoveOrientationError,null);
}

ShowOrientationError = () => {

}

RemoveOrientationError = () => {

}