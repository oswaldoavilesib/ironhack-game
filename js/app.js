//Classes creation: Background, Player and Enemies
class Background{
    constructor(w,h){
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.height = h;
        this.img = new Image()
        this.img.src = "../images/space1.jpg"
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
        this.imgGameOver = new Image()
        this.imgGameOver.src = "../images/gameover.gif"
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)

    }

    collision(item){
        if(
            this.x < item.x + item.radius &&
            this.x + this.width > item.x &&
            this.y < item.y + item.radius &&
            this.y + this.height > item.y
        ) {
            audioGameOver.play()
            audioGame.pause()
            ctx.drawImage(this.imgGameOver,450,100,800,500)
            return true;
        }
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
        this.y = this.y + this.velocity.y;
    }
}


//------------------------------------------------------------------------//
//CLASSES INHERETANCE


//------------------------------------------------------------------------//
//SCRIPTS//


