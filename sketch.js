var player;
var space;
var spaceImg,rocketImg;
var asteroidImg;

var PLAY=1;
var END=0;
var gameState=1;

var asteroid;

var gameOver;
var starCollection = 0;

function preload(){
spaceImg = loadImage("space.png")
asteroidImg = loadImage("asteroid.png")
rocketImg = loadImage("rocket.png")
starImg = loadImage("star.png")
gameOverImg = loadImage("game over.png")

}

function setup() {
 createCanvas(500,500)
 
  player = createSprite(250,430,20,20);
  player.addImage(rocketImg)
  player.scale=0.15

 space = createSprite(width/2,200);
 space.addImage(spaceImg);
 space.scale=0.8;

 gameOver = createSprite(250,150,20,20);
 gameOver.addImage(gameOverImg);
 gameOver.scale=0.2;
 gameOver.visible=false;

 asterG = new Group();
 starG = new Group();

 
}

function draw() {
 background("red");
 
 if (gameState===PLAY){
 background(0);
 player.x = World.mouseX;

 edges = createEdgeSprites();
 player.collide(edges);

 }

 space.velocityY=3;

 if(space.y > height){
     space.y = height/2;
 }

 if (asterG.isTouching(player)) {
   gameState=END;

 }

if (gameState === END ){
 gameOver.visible= true;

 textSize(20);
 fill("white");
 text("Press ENTER key to restart",130,220);
 space.velocityY=0;

 starG.setVelocityYEach(0);
 starG.setLifetimeEach(-1);

 asterG.setLifetimeEach(-1);
 asterG.setVelocityYEach(0);

if (keyDown(ENTER)){
  reset();
}



}

 createAster();
 createStar();
 



 
if (starG.isTouching(player)) {
 starG.destroyEach();
 starCollection=starCollection+1;


}

 space.depth = player.depth;
 player.depth = player.depth+1;

 
 



 drawSprites();
textSize(20);
fill("white")
text("stars: "+starCollection,10,40)
}

function createAster(){
 if(World.frameCount % 200 === 0){
 asteroid = createSprite(Math.round(random(50,550),20,20,10));
 asteroid.addImage(asteroidImg);
 asteroid.scale=0.1;
 asteroid.velocityY=3;
 asteroid.lifetime=200;
 asterG.add(asteroid);
 
 space.depth = asteroid.depth;
 asteroid.depth = asteroid.depth+1;

 }
}

function createStar(){
 if(World.frameCount % 200 === 0){
 star = createSprite(Math.round(random(50,700),20,20,10));
 star.addImage(starImg);
 star.scale=0.01;
 star.velocityY=4
 star.lifetime=150;
 starG.add(star);
 }
}

function reset(){

gameState=PLAY;
gameOver.visible=false;

starG.destroyEach();
asterG.destroyEach();


starCollection=0;
}

