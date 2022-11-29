// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MainController, { GameStatus } from "./MainController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    speed: number = 5;

    @property(MainController)
    mainController: MainController;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.mainController=cc.Canvas.instance.node.getComponent("MainController");
    }

    start () {

    }

    update (dt: number) {
        
        this.node.y += this.speed;
    }
}
