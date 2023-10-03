//Curso Alura Pong - Oponente I.A.

//Variáveis da Bolinha:
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//Variáveis da minhaRaquete:
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//função para biblioteca do GitHub
let colidiu = false;

//o zero referencial da bolinha é o centro do diâmetro.
//É necessário considerar o raio no deslocamento

//Velocidade da Bolinha nos Eixos:
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

//Chance de errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//função principal:
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete,yRaquete);  
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}


//definição da bolinha:
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}
//Movimento:
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

//funções complementares:
function verificaColisao(){
if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}



function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}


function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
  yRaquete = constrain(yRaquete, 2, 308); 
  
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento/2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
  
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaqueteOponente = constrain(yRaqueteOponente, 2, 308);
}


function verificaColisaoRaquete (x,y){
 
colidiu =  collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if(colidiu){
     velocidadeXBolinha *= -1;
    raquetada.play();
     }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color (255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color (255, 140, 0));   
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
pontosDoOponente += 1;
ponto.play();
  }
}

//Evitando que a bolinha fique atrás da Raquete
function bolinhaNaoFicaPresa(){
  if(xBolinha > 590 || xBolinha < 10){
    xBolinha = 250;
}
}