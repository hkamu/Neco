var itemsLayer;
var cat;
var xSpeed = 0; //カートの移動速度
var direction = 1; //猫

var touchOrigin; //タッチ開始したときに表示するスプライト
var touching = false; //タッチしているかFlag
var touchEnd; //タッチが終了したときに表示するスプライト

var time = 60;
var timelabel;

//スコア
var score_1 = 0;
var score_2 = 0;
var score_3 = 0;
var score_label1;
var score_label2;
var score_label3;

var muki;
var nekoval;
var musinekopos;
var nekox = 0;
var wark = 0;
var hiscore = 0;
var timeX = 0;
var timeY = 0;
var countdown = 4;

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
  }
});

var game = cc.Layer.extend({
  init: function() {
    this._super();

    //森の背景
    var background = new cc.Sprite(res.background_png);
    var size = cc.director.getWinSize();
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    backgroundLayer.addChild(background);
    this.addChild(backgroundLayer);

    countdown01 = cc.Sprite.create(res.count03_png);　
    countdown01.setPosition(250,200);　
    this.addChild(countdown01);

    //アイテムがおちてくるレイヤー
    itemsLayer = cc.Layer.create();
    this.addChild(itemsLayer);

    //ネコを操作するレイヤー
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    cat = cc.Sprite.create(res.cat_png);
    topLayer.addChild(cat, 2);
    cat.setPosition(280, 70);
    this.schedule(this.addItem, 1);

    //カゴ
    kago = cc.Sprite.create(res.basket1_png);
    cat.addChild(kago, -1);
    kago.setPosition(60, 60);

    //スコア
    scorebg = cc.Sprite.create(res.scorebg_png);
    topLayer.addChild(scorebg, 3);
    scorebg.setPosition(415, 25);

    score_label1 = new cc.LabelTTF( "0", "Arial", 25);
    score_label1.setPosition(cc.p(size.width * 0.962, size.height * 0.055));
    score_label1.fillStyle = "black";
    this.addChild(score_label1);

    score_label2 = new cc.LabelTTF( "0", "Arial", 25);
    score_label2.setPosition(cc.p(size.width * 0.9, size.height * 0.055));
    score_label2.fillStyle = "black";
    this.addChild(score_label2);

    score_label3 = new cc.LabelTTF( "0", "Arial", 25);
    score_label3.setPosition(cc.p(size.width * 0.838, size.height * 0.055));
    score_label3.fillStyle = "black";
    this.addChild(score_label3);

    //時間
    var timer_img = new cc.Sprite(res.time_png);
    timer_img.setPosition(cc.p(size.width * 0.1, size.height * 0.9));
    var timerlayer = cc.Layer.create();
    timerlayer.addChild(timer_img, 0);
    this.addChild(timerlayer);

    timelabel = new cc.LabelTTF(time, "Arial", 25);
    timelabel.setPosition(cc.p(size.width * 0.11, size.height * 0.89));
    timelabel.fillStyle = "black";
    this.addChild(timelabel);

    //タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);
    //カートの移動のため　Update関数を1/60秒ごと実行させる　
    this.scheduleUpdate();

    //小惑星の生成で追加
    this.schedule(this.addAsteroid, 5.0);
  },

  addItem: function() {
    var item = new Item();

      //カウントダウン終わったら発動
      if(countdown < 1){
    itemsLayer.addChild(item, 1);
  }
  },
  removeItem: function(item) {
    itemsLayer.removeChild(item);
  },
  //カートの移動のため　Update関数を1/60秒ごと実行させる関数
  update: function(dt) {

    if (touching) {
    //touchEnd(ドラックしている位置）とタッチ開始位置の差を計算する
    //そのままだと値が大きすぎるので50で割る
    xSpeed = (touchEnd.getPosition().x - touchOrigin.getPosition().x) / 50;
    //動く丸-タッチした丸/制限
      if (xSpeed > 0) {
        cat.setFlippedX(true);
        kago.setFlippedX(true);
        kago.setPosition(0, 60);
        muki = 1;
      }
      if (xSpeed < 0) {
        cat.setFlippedX(false);
        kago.setFlippedX(false);
        kago.setPosition(60, 60);
        muki = 0;
      }
      cat.setPosition(cat.getPosition().x + xSpeed, cat.getPosition().y);
      wark += 1;
      if(wark == 10 || wark == 30){
        cat.setTexture(res.cat02_png);
      }
      if(wark == 20){
        cat.setTexture(res.cat03_png);

      }
      if(wark == 40){
        cat.setTexture(res.cat_png);
        wark = 0;
      }
    }
    //カウントダウン処理
    if(countdown > -1 ){
    timeY++;
    console.log("にゃーん");
      if(timeY == 70){
        console.log(countdown);
        timeY = 0;
        countdown--;
          if(countdown == 3) countdown01.setTexture(res.count02_png);
          if(countdown == 2) countdown01.setTexture(res.count01_png);
          if(countdown == 1) countdown01.setTexture(res.go_png);

      }
    }


    if(countdown < 0){
      //カウントダウン画像消す
      countdown01.setVisible(false);

    //制限時間
    timeX++;

    if(timeX == 60){
      time--;
      timeX = 0;
      timelabel.setString(time);
    }
    if(time == 0){
      cc.director.runScene(new GameStartScene()); //リザルトへ
    }
  }

  },
  //小惑星の生成で追加
addAsteroid: function(event) {
  var asteroid = new Asteroid();
  this.addChild(asteroid);
},
removeAsteroid: function(asteroid) {
  this.removeChild(asteroid);
},
});

//--------------------------------------------------------------
var Item = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //ランダムに爆弾と果物を生成する
    if (Math.random() < 0.5) {
      this.initWithFile(res.bug_png);
      this.isBomb = true;
    } else {
      this.initWithFile(res.apple_png);
      this.isBomb = false;
    }
  },
  //アイテムが生成された後、描画されるときに実行
  onEnter: function() {
    this._super();
    //ランダムな位置に
    this.setPosition(Math.random() * 400 + 40, 350);
    //ランダムな座標に移動させる
    var moveAction = cc.MoveTo.create(5, new cc.Point(Math.random() * 400 + 40, -50));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    // 果物の処理　1
    if (direction == 1 && (this.getPosition().y < 65 && this.getPosition().y > 60 && Math.abs(this.getPosition().x - (cat.getPosition().x + 30)) < 30  && !this.isBomb)) {
      gameLayer.removeItem(this);
      score_1++;
      if (score_1 > 9) {
        score_2++;
        if (score_2 > 9) {
          score_3++;
          score_2 = 0;
          score_label3.setString("" + score_3);
        }
        score_1 = 0;
        score_label2.setString("" + score_2)
      }

      score_label1.setString("" + score_1);
      console.log("nya-");
    }
    // 果物の処理　2
    if (direction == 0 && (this.getPosition().y < 65 && this.getPosition().y > 60 && Math.abs(this.getPosition().x - (cat.getPosition().x - 30)) < 30  && !this.isBomb)) {
      gameLayer.removeItem(this);
      score_1++;
      if (score_1 > 9) {
        score_2++;
        if (score_2 > 9) {
          score_3++;
          score_2 = 0;
          score_label3.setString("" + score_3);
        }
        score_1 = 0;
        score_label2.setString("" + score_2)
      }

      score_label1.setString("" + score_1);
      console.log("nya-");
    }
    // 爆弾の処理 1
    if (direction == 1 &&(this.getPosition().y < 60 && Math.abs(this.getPosition().x - (cat.getPosition().x + 30)) < 25 && this.isBomb)) {
      gameLayer.removeItem(this);
      score_2--;
      if (score_2 < 0) {
        if (score_3 >= 1) {
          score_3--;
          score_2 = 9;
          score_label3.setString("" + score_3);
        }else{
          score_2 = 0;
          score_1 = 0;
          score_label1.setString("" + score_1);
        }
      }
      score_label2.setString("" + score_2);

      console.log("nya");
    }
    // 爆弾の処理 2
    if (direction == 0 &&(this.getPosition().y < 60 && Math.abs(this.getPosition().x - (cat.getPosition().x - 30)) < 25 && this.isBomb)) {
      gameLayer.removeItem(this);
      score_2--;
      if (score_2 < 0) {
        if (score_3 >= 1) {
          score_3--;
          score_2 = 9;
          score_label3.setString("" + score_3);
        }else{
          score_2 = 0;
          score_1 = 0;
          score_label1.setString("" + score_1);
        }
      }
      score_label2.setString("" + score_2);
    }
    //地面に落ちたアイテムは消去
    if (this.getPosition().y < -30) {
      gameLayer.removeItem(this)
    }
  }
});

//バーチャルアナログパッド用のタッチリスナーの実装
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event) {
    //タッチ開始位置にスプライトを表示させ
    touchOrigin = cc.Sprite.create(res.touchorigin_png);
    topLayer.addChild(touchOrigin, 0);
    touchOrigin.setPosition(touch.getLocation().x, touch.getLocation().y);
    touchEnd = cc.Sprite.create(res.touchend_png);
    topLayer.addChild(touchEnd, 0);
    touchEnd.setPosition(touch.getLocation().x, touch.getLocation().y);
    touching = true;
    return true;
  },
  onTouchMoved: function(touch, event) {
    //移動中の指の位置にドラック用スプライトを表示させる
    touchEnd.setPosition(touch.getLocation().x, touchEnd.getPosition().y);
  },
  onTouchEnded: function(touch, event) {
    //タッチ終了のときはスプライトを消す　タッチflagをOFF
    touching = false;
    topLayer.removeChild(touchOrigin);
    topLayer.removeChild(touchEnd);
  }
});

//小惑星クラス
var Asteroid = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.kumo_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(600, Math.random() * 100 + 200);
    var moveAction = cc.MoveTo.create(10, new cc.Point(-100, Math.random() * 100 + 200 ));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
		//画面の外にでた小惑星を消去する処理
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this);
    }
  }
});
