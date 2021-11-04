//------------------------------------------------------------------------//
//DEFAULT VARIABLES
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const centerWidth = canvas.width/2;
const centerHeight = canvas.height/2;

let requestId;

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
    constructor(w,h){
        this.x = canvas.width/2 - 50;
        this.y = canvas.height/2 - 50;
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

class Enemy {
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
const player = new Player(100,100);
// const sunBall = new SunBall(centerWidth,centerHeight,8,"green",null)

const sunBalls = [];
const enemies = [];


//------------------------------------------------------------------------//
//SCRIPTS//

function createEnemies(){
    setInterval(()=>{
        const radius = Math.random() * (30 - 10) + 10;
        let x;
        let y;
        if(Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;

            // y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        }
        const color = "green"
        const angle = Math.atan2((canvas.height/2) - y,(canvas.width/2)- x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        }
        enemies.push(new Enemy(x,y,radius,color,velocity))
    },1000)
}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bg.draw();
    sunBalls.forEach((sunball)=>{
        sunball.update()
    })
    player.draw();
    enemies.forEach((enemy,index)=>{
        enemy.update()
        const distancePlayerSunBalls = Math.hypot(player.x - enemy.x,player.y - enemy.y)
        if(distancePlayerSunBalls - enemy.radius - 50 < 1){
            console.log(enemy.x)
        }
        sunBalls.forEach((sunBalls, sunBallsIndex)=>{
            const distance = Math.hypot(sunBalls.x - enemy.x,sunBalls.y - enemy.y);
            if(distance - enemy.radius - sunBalls.radius < 1){
                    enemies.splice(index,1);
                    sunBalls.splice(sunBallsIndex,1);
            }
        })
    })
}



window.addEventListener('click',(e)=>{
    const angle = Math.atan2((e.clientY - (canvas.height/2)),(e.clientX - (canvas.width/2)));
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
    }
    sunBalls.push(new SunBall(centerWidth,centerHeight,8,"red",velocity))
    console.log(e)
})

animate()
createEnemies()