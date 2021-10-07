var PLAY = 1;
var END = 0; 
var gameState = PLAY;

var knifeSwooshSound, gameOverSound;

var score=0;
var fruitGroup, enemyGroup;

var gameOverImg;

var fruit1, fruit2, fruit3, fruit4, monsterImage;

var sword, sword_cutting;

function preload(){
  
  sword_cutting= loadAnimation("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterImage=loadAnimation("alien1.png","alien2.png");
  gameOverImg= loadAnimation("gameover.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
 
}


function setup() {
  createCanvas(600,400);
  
  
  sword = createSprite(300,200,20,20);
  sword.addAnimation("cutting", sword_cutting);
  
  sword.addAnimation("gameOver",gameOverImg);
  
  sword.scale=0.5;
  
  
  
  fruitGroup =  createGroup();
  enemyGroup = createGroup();
}


function draw(){
  
  background("black");
  
  text("Score: "+ score, 500,50);

  if(gameState===PLAY){
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;
    }
    if(enemyGroup.isTouching(sword)){
      gameState=END;
      
      gameOverSound.play();
    }
    
    fruits();
    Enemy();

  
  }
  else if(gameState===END){
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
      sword.x=300;
      sword.y=200;
    
      sword.changeAnimation("gameOver");
  }
  
  
  
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1);
    } else if (r==2) {
      fruit.addImage(fruit2);
    }else if (r==3) {
      fruit.addImage(fruit3);
    }else if (r==4) {
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-(7+(score/4));
    fruit.lifetime=100;
    
    fruitGroup.add(fruit);
    
    
    if(r==1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
    else{
      if(r==2){
        fruit.x=0;
        
        fruit.veloityX= (7+(score/4));
      }
    }
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.lifetime=50;
    
    enemyGroup.add(monster);
  }
}

