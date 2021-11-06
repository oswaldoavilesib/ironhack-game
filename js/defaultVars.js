const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const centerWidth = canvas.width/2; //centrar elementos en el canvas a lo ancho
const centerHeight = canvas.height/2; //Centrar elementos en el canvas a lo alto

let requestId;

const sunBalls = [];
const enemies = [];

const audioGame = new Audio();
audioGame.src = "../audio/audiogame.mp3"
const audioGameOver = new Audio();
audioGameOver.src = "../audio/gameover.mp3"
const audioHit = new Audio();
audioHit.src = "../audio/destruction.wav"


const $clickCounter = document.querySelector("#click-counter span"); //Seleccionar el texto del elemento contador de clics

const $killingCounter = document.querySelector("#killing-counter span"); //Seleccionar el texto del elemento contador de enemigos asesinados

const $mouseLife = document.querySelector("#mouse-life span"); //Seleccionar el texto del elemento que va a restar los clics a la vida útil del mouse

let enemiesKilled = 0;
let numberOfClicks = 0;
