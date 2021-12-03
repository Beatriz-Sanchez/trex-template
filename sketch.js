var trex, trex_correndo;
var solo, soloImg, soloInvisivel;
var nuvem, nuvemImg, grupoNuvens;
var cacto, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6, grupoCactos;
var pontos = 0;
var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

function preload() {
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloImg = loadImage("solo2.png");
  nuvemImg = loadImage("nuvem.png");

  // carregar imagens dos obstaculos
  cacto1 = loadImage("obstaculo1.png");
  cacto2 = loadImage("obstaculo2.png");
  cacto3 = loadImage("obstaculo3.png");
  cacto4 = loadImage("obstaculo4.png");
  cacto5 = loadImage("obstaculo5.png");
  cacto6 = loadImage("obstaculo6.png");
}

function setup() {
  createCanvas(600, 200);

  //cria trex
  trex = createSprite(50, 100, 20, 50);
  trex.addAnimation("correndo", trex_correndo);
  trex.scale = 0.5;

  solo = createSprite(300, 170, 1200, 5);
  solo.addImage(soloImg);

  soloInvisivel = createSprite(300, 180, 1200, 5);
  soloInvisivel.visible = false;
  
  grupoNuvens = new Group();
  grupoCactos = new Group();

}

function draw() {
  background("white");

  text("Pontos: "+pontos,500,20);
  pontos = Math.round((pontos+(frameCount/3))/2);

  //pulo
  if (keyDown("space") && trex.y > 153) {
    trex.velocityY = -20;
  }

  //gravidade
  trex.velocityY = trex.velocityY + 2;

  trex.collide(soloInvisivel);
  solo.velocityX = -6;

  if (solo.x < 0) {
    solo.x = solo.width / 2;
  }

  //console.log(trex.y);

  //gerando nuvens e cactos
  gerarNuvens();
  gerarCactos();

  drawSprites();
  
  if (estadoJogo === JOGAR){
    
  } else if (estadoJogo === ENCERRAR){
    
  }
}
//definição da função de gerar nuvens
function gerarNuvens() {

  if (frameCount % 60 === 0) {
    nuvem = createSprite(630, 100, 40, 10);
    nuvem.y = Math.round(random(40, 120));
    nuvem.addImage(nuvemImg);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
    nuvem.lifetime = 220;
    grupoNuvens.add(nuvem);
  }
}

function gerarCactos(){
  //criar sprite de obstáculo a cada 60 quadros
  if(frameCount %60 === 0){
    cacto = createSprite(600,155,10,40);
    cacto.velocityX= -6;
  
  //adicionar imagem ao obstaculo aleatoriamente
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: cacto.addImage(cacto1);
        	break;
      case 2: cacto.addImage(cacto2);
        	break;
   	  case 3: cacto.addImage(cacto3);
        	break;
      case 4: cacto.addImage(cacto4);
        	break;
      case 5: cacto.addImage(cacto5);
        	break;
      case 6: cacto.addImage(cacto6);
        	break;
      default: break;
    }
    //atribuir escala e tempo de vida aos obstáculos
    cacto.scale = 0.5;
    cacto.lifetime = 300;
    grupoCactos.add(cacto);
  }
}
