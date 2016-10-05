//  hint.js

var help_array = [res.howtoplay0_png, res.howtoplay1_png, res.howtoplay2_png];
var num = 0;

audioEngine = cc.audioEngine;

var help = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();
    if (!audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm, true);
    }

    var help_back = new cc.Sprite(res.title_bg_png);
    help_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var help_back_layer = cc.Layer.create();
    help_back_layer.addChild(help_back);
    this.addChild(help_back_layer);

    help_img = new cc.Sprite(help_array[num]);
    help_img.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    help_img.setScale(1.5);
    var help_img_layer = cc.Layer.create();
    help_img_layer.addChild(help_img);
    this.addChild(help_img_layer);

    // 
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: this.onTouchBegan,
      onTouchMoved: this.onTouchMoved,
      onTouchEnded: this.onTouchEnded
    }, this);
    return true;
  },
  onTouchBegan: function(touch, event){
    return true;
  },
  onTouchMoved: function(touch, event){},
  onTouchEnded: function(touch, event){
    num++;
    audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
    audioEngine.playEffect(res.se_button);
    if(num > 2){
      num = 0;
      cc.director.runScene(new GameStartScene());
    }
    help_img.setTexture(help_array[num]);
  },
});

var helpScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var helplayer = new help();
    this.addChild(helplayer);
  }
});
