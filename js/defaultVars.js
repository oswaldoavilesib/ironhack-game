const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const centerWidth = canvas.width/2; //centrar elementos en el canvas a lo ancho
const centerHeight = canvas.height/2; //Centrar elementos en el canvas a lo alto

let requestId;

let sunBalls = [];
let enemies = [];

const audioGame = new Audio();
audioGame.src = "../audio/audiogame.mp3"
const audioGameOver = new Audio();
audioGameOver.src = "../audio/gameover.mp3"
const audioHit = new Audio();
audioHit.src = "../audio/destruction.wav"

const $startBtn = document.querySelector(".start-game") //seleccionar botón de comenzar


 //Select instructions button
const $instructionsBtn = document.querySelector(".reed-instructions")//Read instructions

const $resetGameBtn = document.getElementById("reset-btn") //boton de resetear el juego

const $resetContainer = document.getElementById("reset-container") //Contenedor del resumen del juego

const $clickCounter = document.querySelector("#click-counter span"); //Seleccionar el texto del elemento contador de clics

const $killingCounter = document.querySelector("#killing-counter span"); //Seleccionar el texto del elemento contador de enemigos asesinados

const $mouseLife = document.querySelector("#mouse-life span"); //Seleccionar el texto del elemento que va a restar los clics a la vida útil del mouse

const $finalClicsPoints = document.getElementById("final-clics")
const $finalKills = document.getElementById("final-kills")
const $mouseClicksLeft = document.getElementById("mouse-life-left")


let enemiesKilled = 0;
let numberOfClicks = 0;
