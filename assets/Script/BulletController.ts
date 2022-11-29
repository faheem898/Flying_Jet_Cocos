// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MainController, { GameStatus } from "./MainController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletController extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    BulletPrefab: cc.Prefab;

    @property(MainController)
    maincontroller: MainController = null;

    @property(cc.Node)
    BulletParent: cc.Node = null;

    timer: number=0;
    gameStatus: GameStatus = GameStatus.Game_Playing;

    generateBullet(){
        
        console.log('Generate Bullet ');
        let bullet = cc.instantiate(this.BulletPrefab);
        this.BulletParent.addChild(bullet);
        bullet.x = this.node.x;
        bullet.y = this.node.y + 96;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt: number) {

        if(this.maincontroller.gameStatus !== GameStatus.Game_Playing){
            return;
        }

        this.timer += dt;
        if(this.timer > 1){
            this.generateBullet();
            this.timer=0;
        }     
    }
}
