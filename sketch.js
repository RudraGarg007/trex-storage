var trexrunning,trex,trexStill,trexCollide,ground,groundImg,ground2,gamestate,cloudImg,clouds,ob1,ob2,ob3,ob4,ob5,ob6,score, cactie,mofd,pterodactylAnimation,neverEnd;
function preload(){
  cloudImg = loadImage("cloud.png")
  pterodactylAnimation = loadAnimation("crow_0.png","crow_1.png"); 
  trexStill = loadAnimation("trex1.png"); 
  trexCollide = loadAnimation("trex_collided.png")
  trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg = loadImage("ground2.png");
  ob1=loadImage("obstacle1.png");
 ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  
}
function setup() {
  createCanvas(600, 300);
  neverEnd = -1;
  cactie = new Group();
  clouds = new Group();
  trex = createSprite(50,230);
  trex.addAnimation("tis",trexStill);
  trex.addAnimation("tim",trexrunning);
  trex.addAnimation("tic",trexCollide)
  trex.scale = 0.6;
  ground2 = createSprite (300,290,600,20);
  ground2.visible = false;
  ground = createSprite(300,275,600,50);
  ground.addImage("gib",groundImg);
  ground.x = ground.width*1/2
  gamestate = "not start";
  score = 0;
  mofd = new Group();
}

function draw() {
  background(255);
  drawSprites();
  if(ground.x<0){
   ground.x = ground.width*1/2
  }  
  if (gamestate === "not start"){
    trex.velocityY = trex.velocityY+0.8;
    if(keyDown("space")){
      gamestate = "start"; 
    }
  }else if (gamestate === "start"){
    trex.velocityY = trex.velocityY+0.8;
    
    if(keyDown("space") && trex.y>250){
    trex.velocityY = -15
    }
   ground.velocityX = -(8+score/100);
   trex.changeAnimation("tim")
   if (frameCount%200 === 0 ){
     cloud1();
   }
    if (frameCount%150 === 0){
      if(score > 500 &&frameCount%40 === 0){
      fod();
    }else{
        obstacle();
      }  
    } 
   if(trex.isTouching(cactie)||trex.isTouching(mofd)){
     gamestate = "gameover";
     //trex.velocityY = -12;
   }
  } else if (gamestate === "gameover"){
      trex.changeAnimation("tic");
      trex.velocityY = 0;
      ground.velocityX = 0;
      clouds.setVelocityXEach(0);
      clouds.setLifetimeEach(neverEnd);
      cactie.setVelocityXEach(0);
      cactie.setLifetimeEach(neverEnd);
      mofd.setVelocityXEach(0);
      mofd.setLifetimeEach(0);
      // gameover.visible = true;
      // restart.visible = true;
      // if (hiscore < score){
      //     hiscore = score;
      }
     
     trex.collide(ground2);
}

function cloud1(){

  var cloud
  
  cloud =  createSprite(500,20);
  cloud.y = random(0,200);
  cloud.x = random(600,700);
  cloud.addImage("chai",cloudImg);
  cloud.velocityX = -1;
  //console.log(cloud.depth);
  cloud.lifetime  = 800;
  trex.depth = cloud.depth+1;
  clouds.add(cloud); 

}
function reset(){
  gamestate = "start";
  score = 0;
  // restart.visible = false;
  // gameover.visible = false;
  mofd.destroyEach();
  cactie.destroyEach();
  clouds.destroyEach();
}

function obstacle(){
  var cactus = createSprite(500,355);
  cactus.setAnimation("obstacle"+randomNumber(1,6));
  cactus.velocityX = -(8+score/100);
  cactus.scale = 0.6;
  cactus.lifetime = 87;
  trex.depth = cactus.depth+1;
  cactie.add(cactus);
  // cactus.debug = true;
}
function obstacle(){
  var cactus,random1;
  random1  = Math.round(random(1,6))
  cactus = createSprite(700,255);
  switch(random1){
    case 1 :cactus.addAnimation("obstacle",ob1);
    break;
    case 2 :cactus.addAnimation("obstacle2",ob2);
    break;
    case 3 :cactus.addAnimation("obstacle3",ob3);
    break;
    case 4 :cactus.addAnimation("obstacle4",ob4);
    break;
    case 5 :cactus.addAnimation("obstacle5",ob5);
    break;
    case 6 :cactus.addAnimation("obstacle6",ob6);
    break;
    default:console.log("unexpected number")
         } 
  
  cactus.velocityX = -8;
  cactus.scale = 0.6;
  cactus.lifetime = 100;
  trex.depth = cactus.depth+1;
  cactie.add(cactus);
  // cactus.debug = true;
}

function fod (){
  var pterodactyl 
  pterodactyl = createSprite(700,0)
  pterodactyl.y = random(200,240);
  pterodactyl.velocityX= -(9+score/100);
  // pterodactyl.debug = true; 
  pterodactyl.addAnimation("piafd",pterodactylAnimation);
  pterodactyl.scale = 1.4;
  mofd.add(pterodactyl);
  pterodactyl.lifetime = 82;
}