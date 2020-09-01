class Align
{
    static scaleToGameW(obj, per){
        obj.displayWidth = game.config.width * per;//percentage
        obj.scaleY = obj.scaleX;
    }

    static scaleToGameH(obj, per){
        obj.displayHeight = game.config.height * per;//percentage
        obj.scaleX = obj.scaleY;
    }

    static scaleToObjW(objToScale, per, refObj){
        objToScale.displayWidth = refObj.displayWidth * per;//percentage
        objToScale.scaleY = objToScale.scaleX;
    }

    static center(obj){
        obj.x = game.config.width/2;
        obj.y = game.config.height/2;
    }

    static centerH(obj){
        obj.x = game.config.width/2;
    }

    static centerV(obj){
        obj.y = game.config.height/2;
    }
}