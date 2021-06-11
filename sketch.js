var bgi,stoneimage,garbageimage,playerimage,juiceimage;
var bg
var player;
var gg;
var sg;
var jg;
var energy;
var gameover,restart;
var gi,ri;
var PLAY=1;
var END=0;
var gameState = PLAY;
var score ;
var invisibleground;
function preload(){
bgi = loadImage("bg.jpg");
stoneimage = loadImage("stone.png");
playerimage = loadImage("download.png");
garbageimage = loadImage("garbage.png");
juiceimage = loadImage("jb.png")
gi = loadImage("gameover.png");
ri = loadImage("restart.png");
}
function setup(){
  createCanvas(displayWidth-20,displayHeight-20)
bg = createSprite(displayWidth/2+150,displayHeight/2-150,displayWidth*3,30);
bg.addImage("background",bgi);
bg.velocityX=-2;
bg.scale = 1.2;
player = createSprite(20,displayHeight-200);
player.addImage("player", playerimage);
player.scale=0.5;
invisibleground = createSprite(displayWidth/2,displayHeight-100, displayWidth,20);
invisibleground.visible=false
gg = createGroup()
sg = createGroup()
jg = createGroup()
energy = 5;
score = 0
gameover = createSprite(displayWidth/2,displayHeight/2, 50,50);
gameover.addImage(gi)
gi.scale = 0.5;
restart = createSprite(displayWidth/2, displayHeight/2+50,50,50);
restart.addImage(ri);
ri.scale= 0.5;

}
function draw(){
background("black");
if(gameState===PLAY){
gameover.visible = false;
restart.visible = false;


bg.velocityX=-(2+score/500);
if(keyDown(UP_ARROW) && player.y>displayHeight-600){
  player.velocityY =-14;
}
player.velocityY=player.velocityY+1;
if(bg.x<displayWidth/2-100){
  bg.x= displayWidth/2+150;
}
if(player.isTouching(sg)){
  energy = energy-1;
}
if(player.isTouching(gg)){
  score = score+1;
}
if(player.isTouching(jg)){
  energy = energy+1;
}
if(energy<=0){
  gameState=END;
}
obstacles()
stones()
juice()
}
if(gameState===END){
gameover.visible = true;
restart.visible = true;
bg.velocityX=0;
sg.setVelocityXEach(0);
gg.setVelocityXEach(0);
jg.setVelocityXEach(0);
sg.setLifetimeEach(-1);
jg.setLifetimeEach(-1);
gg.setLifetimeEach(-1);
if(mousePressedOver(restart)){
  reset()
}
}
player.collide(invisibleground);
drawSprites()
textSize(30);
fill(0);
text("energy:"+energy, displayWidth-300, 100)
text("score:"+score, displayWidth-300, 150)

}
function reset(){
  sg.destroyEach();
  jg.destroyEach();
  gg.destroyEach();


  gameState = PLAY;
  score = 0;
  energy = 5;
  
}
function obstacles(){
  if(frameCount%100===0){
    var obstacle = createSprite(displayWidth,displayHeight-135);
    obstacle.addImage("garbage",garbageimage);
    obstacle.velocityX = -(2+score/500);
    obstacle.scale = 0.5;
    obstacle.lifetime = 800;
    player.depth = obstacle.depth;
    obstacle.depth = obstacle.depth+1;
    gg.add(obstacle)
  }
}
function stones(){
  if(frameCount%250===0){
    var stone = createSprite(displayWidth,displayHeight-135);
    stone.addImage("stone",stoneimage);
    stone.velocityX = -(2+score/500);
    stone.scale = 0.5;
    stone.lifetime = 800;
    player.depth = stone.depth;
    stone.depth = stone.depth+1;
    sg.add(stone)
  }
}
function juice(){
  if(frameCount%350===0){
    var ju = createSprite(displayWidth,displayHeight-200);
    ju.addImage("juice",juiceimage);
    ju.velocityX = -(2+score/500);
    ju.scale = 0.3;
    ju.lifetime = 800;
    player.depth = ju.depth;
    ju.depth = ju.depth+1;
    jg.add(ju)
  }
}
