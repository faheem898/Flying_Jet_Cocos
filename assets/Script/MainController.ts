// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

export enum GameStatus {
    Game_Ready,
    Game_Playing,
    Game_Over
}
export const SPEED = -5;

@ccclass
export default class MainController extends cc.Component {

    @property(cc.Sprite)
    spBg: cc.Sprite[] = [null, null];



    @property(cc.Sprite)
    spGameOver: cc.Sprite = null;

    @property(cc.Label)
    labelScore: cc.Label = null;

    @property(cc.Button)
    btnStart: cc.Button = null;

    @property(cc.Button)
    btnReplay: cc.Button = null;

    @property(cc.Label)
    labelTimer: cc.Label = null;

    @property(cc.Label)
    labelHighScore: cc.Label = null;

    @property(cc.Sprite)
    Winner: cc.Sprite = null;

    @property(cc.Sprite)
    Loser: cc.Sprite = null;

    score: number = 0;

    highScore: number = 0;

    timer: number = 30;

    gameStatus: GameStatus = GameStatus.Game_Ready;

    onLoad() {
        //open Collision Systems
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        collisionManager.enabledDebugDraw = true;
        this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
        this.spGameOver.node.active = false;

        this.btnReplay.node.active = false;
        this.touchStarBtn();
        
        this.Winner = this.node.getChildByName("Winner").getComponent(cc.Sprite);
        this.Winner.node.active = false;

        this.Loser = this.node.getChildByName("Loser").getComponent(cc.Sprite);
        this.Loser.node.active = false;
    }

    touchStarBtn() {
        this.btnStart.node.active = false;
        this.gameStatus = GameStatus.Game_Playing;
        this.spGameOver.node.active = false;
        this.score = 0;
        this.labelScore.string = this.score.toString();
        

    }

    gameOver() {

        this.spGameOver.node.active = true;
        this.gameStatus = GameStatus.Game_Over;

        this.btnReplay.node.active = true;

        if(+cc.sys.localStorage.getItem("highScore")<this.score){
            this.highScore = this.score;

            cc.sys.localStorage.setItem("highScore",this.score);

            this.Winner.node.active = true;
        }
        else{
            this.Loser.node.active = true;
        }

        this.highScore = cc.sys.localStorage.getItem("highScore");

        this.scoreHigh();

    
    }

    replay(){
        
        
        cc.director.loadScene("Main");

        

        // this.gameStatus = GameStatus.Game_Playing;
        // this.spGameOver.node.active = false;
        // this.score = 0;
        // this.labelScore.string = this.score.toString();
    
    }

    addScore(){
        this.score++;
        this.labelScore.string = "SCORE:" +this.score.toString();
    }

    scoreHigh(){
        this.labelHighScore.string= "HighScore : " + this.highScore.toString();
    }


    update(dt: number) {
        if (this.gameStatus !== GameStatus.Game_Playing) {
            return;
        }
        for (let i = 0; i < this.spBg.length; i++) {
            this.spBg[i].node.y -= 2.0;
            if (this.spBg[i].node.y <= -1920) {
                this.spBg[i].node.y = 1920;
            }
        }

        this.timer -= dt;
        this.labelTimer.string ="Time-Left: " + Math.round(this.timer).toString();

        if(this.timer < 0){
            this.gameOver();
        }

        
        
    }
}
