//------------------------------------------------------------------------//
//DEFAULT VARIABLES
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const centerWidth = canvas.width/2;
const centerHeight = canvas.height/2;

//Classes creation: Background, Player and Enemies
class Background{
    constructor(w,h){
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.height = h;
        this.img = new Image()
        this.img.src = "../images/space.jpg"
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,canvas.width,canvas.height)
    }
}

class Player {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.img = new Image()
        this.img.src = "../images/sun.png"
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }

}

//------------------------------------------------------------------------//
//CLASSES INHERETANCE
const bg = new Background();
const player = new Player(centerWidth,centerHeight,100,100);


//------------------------------------------------------------------------//
//SCRIPTS//
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bg.draw();
    player.draw();
}

animate()