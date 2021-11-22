var trex, trex_correndo;
var solo, soloImg;

function preload(){
  
  //criar animação do T-Rex correndo
  trex_correndo = loadAnimation('trex1.png','trex3.png','trex4.png');
  
  //carregar imagem do solo
  soloImg = loadImage("solo2.png");
}

function setup(){
  
//cria a tela
createCanvas(600,200);
  
//cria sprite do T-Rex
trex = createSprite(50,60,20,50);
trex.scale = 0.5;
trex.x = 50;
//adiciona a animação de T-Rex correndo ao sprite
trex.addAnimation('correndo', trex_correndo);
  
//aprendendo sobre console.log
//escreve o nome do jogo no terminal
console.log("T-Rex corredor");
  
//cria solo
solo = createSprite(300,190,1200,20);
  
//adiciona imagem de solo
solo.addImage("solo", soloImg)
solo.x = solo.width/2;
}

function draw(){

  //fundo branco
  background("white");
  
  //desenha os sprites
drawSprites();
  
  //T-Rex pula ao apertar espaço
  if(keyDown('space')){
trex.velocityY = -15; 
}
  
  
//Trex colide com o solo
  trex.collide(solo);
  
  //gravidade
  trex.velocityY = trex.velocityY + 1;
  
  //Registra a posição Y do T-Rex no reminal
console.log("posição Y do T-Rex: " + trex.y);
  
  //faz o T-Rex correr adicionando velocidade ao solo
  solo.velocityX = -6;
  
//faz o solo voltar ao centro se metade dele sair da tela
  if (solo.x<0){
solo.x=solo.width/2
}
  
}
