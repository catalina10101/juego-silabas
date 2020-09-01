let game;
let model;
let emitter;
let G;
let controller;
let pluginPath;
window.onload = function (){

    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

    if (isMobile == -1){//not mobile
        var config = {
            type: Phaser.AUTO, //graphics_mode: Canvas, WebGL, AUTO 
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
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
    G = new Constants();
    model = new Model();
    model.isMobile = isMobile;
	game = new Phaser.Game(config);
}