var res = {

//背景
  background_png:"res/S/game_bg.png",
  t_background_png:"res/S/title_bg.png",

//touchパッド
  touchorigin_png: "res/touchorigin.png",
  touchend_png: "res/touchend.png",

//落ち物
  apple_png: "res/S/apple.png",
  bug_png: "res/S/bug.png",

//猫
  cat_png: "res/S/cat0.png",
  cat02_png: "res/S/cat1.png",
  cat03_png: "res/S/cat2.png",
  musicat_png: "res/S/cat3.png",

//カゴ
  basket0_png: "res/S/basket0.png",
  basket1_png: "res/S/basket1.png",
  basket2_png: "res/S/basket2.png",
  basket3_png: "res/S/basket3.png",
  basket4_png: "res/S/basket4.png",

//ヒント
  hint01_png: "res/S/howtoplay1_J.png",
  hint02_png: "res/S/howtoplay2_J.png",
  hint03_png: "res/S/howtoplay3_J.png",

//タイトル
  title_png: "res/S/title_j.png",
  help01_png: "res/S/help_1.png",
  help02_png: "res/S/help_2.png",

//ゲーム関係
  scorebg_png: "res/S/game_counter.png",
  kumo_png: "res/S/game_cloud.png",
  time_png: "res/S/timeleft.png",

//カウント
  count03_png: "res/S/number3.png",
  count02_png: "res/S/number2.png",
  count01_png: "res/S/number1.png",
  go_png: "res/S/go.png",

//bgm
  //main_bgm: "res/main_bgm.mp3",
  //title_bgm: "res/title_bgm.mp3",
};

var g_resources = [];
for (var i in res) {
  g_resources.push(res[i]);
}
