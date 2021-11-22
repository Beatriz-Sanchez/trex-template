var trex, trex_correndo;
var solo, solo_imagem;
var solo_inv;

function preload(){
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  solo_imagem = loadImage("solo2.png")
}

function setup(){
  createCanvas(600,200);
  
  //cria trex
  trex = createSprite(50,100,20,50);
  trex.addAnimation("correndo", trex_correndo);
  trex.scale = 0.5;
  
  solo = createSprite(300,170,1200,5)
  solo.addImage(solo_imagem)
  
  solo_inv = createSprite(300,180,1200,5)
  solo_inv.visible = false
  
}

function draw(){
  background("white");
  
  //pulo
  if (keyDown("space") && trex.y > 153){
    trex.velocityY = -20;
  }
  
  //gravidade
  trex.velocityY = trex.velocityY + 2;
  
  trex.collide(solo_inv)
  solo.velocityX = -3
  
  if (solo.x < 0){
    solo.x = solo.width/2
  }
  
  console.log(trex.y)
  
  gerarNuvens();
  
  drawSprites();
}

function gerarNuvens(){
  
}
