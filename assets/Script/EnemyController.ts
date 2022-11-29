// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MainController, { GameStatus }  from "./MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyController extends cc.Component {

    @property(cc.Prefab)
    EnemyPrefab: cc.Prefab = null;

    @property(MainController)
    mainController: MainController = null;

    timer: number = 0;

    generateEnemy(){
        console.log('generate enemy');
        let enemy = cc.instantiate(this.EnemyPrefab);
        this.node.addChild(enemy);
        enemy.y = 960;
        var minx = -440;
        var maxx = 440;
        enemy.x = minx + Math.random() * (maxx - minx);
    }

    update(dt: number) {
        if (this.mainController.gameStatus !== GameStatus.Game_Playing) {
            return;
        }
        this.timer += dt;
        if (this.timer > 1) {
           this.generateEnemy();
            this.timer = 0;
        }
    }
}


