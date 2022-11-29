// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MainController , { GameStatus , SPEED } from "./MainController";
import ShipController from "./ShipController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {


    speed : number = -5;

    speedX: number = -8;

    mainController: MainController;

    @property(ShipController)
    playerController:ShipController = null;

    onLoad() {  
        this.mainController = cc.Canvas.instance.node.getComponent("MainController");
        this.speed = SPEED;
    }

    update (dt: number) {
        if (this.mainController.gameStatus !== GameStatus.Game_Playing) {
            return;
        }
        
        this.node.y += this.speed;
        if(this.node.x > 440 || this.node.x < -440){
            this.speedX = -this.speedX;
        }

        this.node.x +=this.speedX;

        
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag === 2) {
          this.mainController.addScore();
          this.node.destroy();
        }
        //this.node.destroy();
        else{
            this.mainController.gameOver();
        }
    }
}
