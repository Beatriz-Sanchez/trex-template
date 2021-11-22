var trex, trex_correndo, bordas;

function preload(){
  
  //fazer animação do T-Rex correndo
  trex_correndo = loadAnimation('trex1.png','trex3.png','trex4.png');
  
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
  
  //cria bordas
  bordas = createEdgeSprites();
  
  //aprendendo sobre console.log
  //escreve o nome do jogo no terminal
  console.log("T-Rex corredor");
  
}

function draw(){

  //fundo branco
  background("white");
  
  //desenha os sprites
  drawSprites();
  
  //T-Rex pula ao apertar espaço
  if(keyDown('space')){
      trex.velocityY = -10; 
    }
  
  //Trex colide com a borda inferior
  trex.collide(bordas[3]);
  
  //gravidade
  trex.velocityY = trex.velocityY + 1;
  
  //Registra a posição Y do T-Rex no reminal
  console.log(trex.y);
}
