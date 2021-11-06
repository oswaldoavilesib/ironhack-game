
    const bg = new Background();
    const player = new Player(100,100);
    window.onload = function() { 
        bg.draw()
        player.draw()
        $startBtn.onclick = function() {
        if(requestId){
            return true;
        }
        animate()
        createEnemies()
    }
}

function updateMouseLife(){
    $mouseLife.innerHTML = (150000 - numberOfClicks)
}

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
        const color = `rgb(${Math.random()*251},${Math.random()*251},${Math.random()*251})`
        "green"
        const angle = Math.atan2((canvas.height/2) - y,(canvas.width/2)- x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        }
        enemies.push(new Enemy(x,y,radius,color,velocity))
    },1000)
}


function animate(){
    requestId = requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bg.draw();
    audioGame.play()
    sunBalls.forEach((sunBall,sunBallIndex)=>{
        sunBall.update()
        if(sunBall.x + sunBall.radius < 0 || 
            sunBall.x - sunBall.radius > canvas.width || 
            sunBall.y + sunBall.radius < 0 || 
            sunBall.y - sunBall.radius >canvas.height){
            setTimeout(() =>{
                sunBalls.splice(sunBallIndex,1)
            },0)
        }

    })
    player.draw();
    enemies.forEach((enemy,index)=>{
        enemy.update()

        if(player.collision(enemy)){
            cancelAnimationFrame(requestId)
        }
        sunBalls.forEach((sunBalls, sunBallsIndex)=>{
            const distance = Math.hypot(sunBalls.x - enemy.x,sunBalls.y - enemy.y);
            if(distance - enemy.radius - sunBalls.radius < 1){
                enemiesKilled ++;
                audioHit.play()
                enemies.splice(index,1);
                sunBalls.splice(sunBallsIndex,1);
            }
        })
    })
    $clickCounter.innerHTML = numberOfClicks;
    $killingCounter.innerHTML = enemiesKilled;
    updateMouseLife()
}

window.addEventListener('click',(e)=>{
    const angle = Math.atan2((e.clientY - (canvas.height/2)),(e.clientX - (canvas.width/2)));
    const velocity = {
        x: Math.cos(angle) * 3,
        y: Math.sin(angle) * 3,
    }
    sunBalls.push(new SunBall(centerWidth,centerHeight,8,"red",velocity))
    numberOfClicks ++
})

function updateMouseLife(){
    $mouseLife.innerHTML = (150000 - numberOfClicks)
}

// animate()
// createEnemies()
