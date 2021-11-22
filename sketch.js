var trex, trex_correndo;
var solo, soloImg, soloInvisivel;

function preload(){
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloImg = loadImage("solo2.png");
}

function setup(){
  createCanvas(600,200);
  
  //cria trex
  trex = createSprite(50,100,20,50);
  trex.addAnimation("correndo", trex_correndo);
  trex.scale = 0.5;
  
  solo = createSprite(300,170,1200,5);
  solo.addImage(soloImg);
  
  soloInvisivel = createSprite(300,180,1200,5);
  soloInvisivel.visible = false;
  
}

function draw(){
  background("white");
  
  //pulo
  if (keyDown("space") && trex.y > 153){
    trex.velocityY = -20;
  }
  
  //gravidade
  trex.velocityY = trex.velocityY + 2;
  
  trex.collide(soloInvisivel);
  solo.velocityX = -3;
  
  if (solo.x < 0){
    solo.x = solo.width/2;
  }
  
  //console.log(trex.y);

  //gerando nuvens
  gerarNuvens();
  
  drawSprites();
}

//definição da função de gerar nuvens
function gerarNuvens(){

}
