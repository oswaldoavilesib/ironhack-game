//------------------------------------------------------------------------//
//DEFAULT VARIABLES
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const centerWidth = (canvas.width/2);
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

class SunBall {
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y
    }
}

//------------------------------------------------------------------------//
//CLASSES INHERETANCE
const bg = new Background();
const player = new Player((centerWidth - 45),(centerHeight-45),100,100);
// const sunBall = new SunBall(centerWidth,centerHeight,8,"green",null)

const sunBalls = []


//------------------------------------------------------------------------//
//SCRIPTS//
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    sunBalls.forEach((sunball)=>{
        sunball.update()
    })
    //bg.draw();
    player.draw();
}



window.addEventListener('click',(e)=>{
    const angle = Math.atan2((e.clientY - (canvas.height/2)),(e.clientX - (canvas.width/2)));
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
    }
    sunBalls.push(new SunBall(centerWidth,centerHeight,8,"green",velocity))

})

animate()