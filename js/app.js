//------------------------------------------------------------------------//
//DEFAULT VARIABLES
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

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
        this.y = y
    }
}

//------------------------------------------------------------------------//
//CLASSES INHERETANCE
const bg = new Background();


//------------------------------------------------------------------------//
//SCRIPTS//
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bg.draw();
}

animate()