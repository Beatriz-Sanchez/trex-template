var trex, trex_correndo, trex_colidiu;
var solo, soloImg, soloInvisivel;
var nuvem, nuvemImg, grupoNuvens;
var cacto, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6, grupoCactos;
var pontos = 0;
var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var gameOverImg, reiniciarImg, gameOver, reiniciar;
var somPulo, somMorte, somPontos;

function preload() {
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_colidiu = loadAnimation("trex_colidiu.png");

  soloImg = loadImage("solo2.png");
  nuvemImg = loadImage("nuvem.png");

  // carregar imagens dos obstaculos
  cacto1 = loadImage("obstaculo1.png");
  cacto2 = loadImage("obstaculo2.png");
  cacto3 = loadImage("obstaculo3.png");
  cacto4 = loadImage("obstaculo4.png");
  cacto5 = loadImage("obstaculo5.png");
  cacto6 = loadImage("obstaculo6.png");

  gameOverImg = loadImage("fimDoJogo.png");
  reiniciarImg = loadImage("reiniciar.png");

  //carregar sons
  somPulo = loadSound("pulo.mp3");
  somMorte = loadSound("morte.mp3");
  somPontos = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);

  //cria trex
  trex = createSprite(50, 100, 20, 50);
  trex.addAnimation("correndo", trex_correndo);
  trex.addAnimation("colidiu", trex_colidiu);
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider("circle", 5, 0, 43);

  solo = createSprite(300, 170, 1200, 5);
  solo.addImage(soloImg);

  soloInvisivel = createSprite(300, 180, 1200, 5);
  soloInvisivel.visible = false;

  grupoNuvens = new Group();
  grupoCactos = new Group();

  gameOver = createSprite(300, 80);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  reiniciar = createSprite(300, 120);
  reiniciar.addImage(reiniciarImg);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;
}

function draw() {
  background("white");
  text("Pontos: " + pontos, 500, 20);

  trex.collide(soloInvisivel);

  drawSprites();

  //comportamentos que só ocorrem no estado de jogo JOGAR
  if (estadoJogo === JOGAR) {

    //aumentar pontos
    pontos = Math.round((pontos + (frameCount / 3)) / 2);

    //pulo
    if (keyDown("space") && trex.y > 153) {
      trex.velocityY = -20;
    }

    //gravidade
    trex.velocityY = trex.velocityY + 1.5;

    //criando o solo infinito
    solo.velocityX = -6;
    if (solo.x < 0) {
      solo.x = solo.width / 2;
    }

    //gerando nuvens e cactos
    gerarNuvens();
    gerarCactos();

    //momento em que o jogo acaba
    if (grupoCactos.isTouching(trex)) {
      estadoJogo = ENCERRAR;
    }

    //comportamentos que só ocorrem no estado de jogo ENCERRAR
  } else if (estadoJogo === ENCERRAR) {

    //parar o solo
    solo.velocityX = 0;

    //parar as nuvens e obstáculos
    grupoCactos.setVelocityXEach(0);
    grupoNuvens.setVelocityXEach(0);

    //torna as nuvens e os cactos infinitos
    grupoCactos.setLifetimeEach(-1);
    grupoNuvens.setLifetimeEach(-1);

    //muda a animação do trex
    trex.changeAnimation("colidiu", trex_colidiu);

    //impede que o trex voe ao encerrar o jogo
    trex.velocityY = 0;

    //tornar imagens de fim de jogo visíveis
    gameOver.visible = true;
    reiniciar.visible = true;
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

function gerarCactos() {
  //criar sprite de obstáculo a cada 60 quadros
  if (frameCount % 60 === 0) {
    cacto = createSprite(600, 155, 10, 40);
    cacto.velocityX = -6;

    //adicionar imagem ao obstaculo aleatoriamente
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        cacto.addImage(cacto1);
        break;
      case 2:
        cacto.addImage(cacto2);
        break;
      case 3:
        cacto.addImage(cacto3);
        break;
      case 4:
        cacto.addImage(cacto4);
        break;
      case 5:
        cacto.addImage(cacto5);
        break;
      case 6:
        cacto.addImage(cacto6);
        break;
      default:
        break;
    }
    //atribuir escala e tempo de vida aos obstáculos
    cacto.scale = 0.5;
    cacto.lifetime = 110;
    grupoCactos.add(cacto);
  }
}
