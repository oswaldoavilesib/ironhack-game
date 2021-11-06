
let bg = new Background();
let player = new Player(100,100);
let gameOverNow = new GameOver()
$resetContainer.style.display = "none"

window.onload = function() { // dibujar background y player
    bg.draw()
    player.draw()
}

function resetAll(){
     sunBalls = [];
     enemies = [];
     bg = new Background();
     player = new Player(100,100);
     numberOfClicks = -1;
     enemiesKilled = 0;
     $mouseLife.innerText = "1,500,000"
}

$startBtn.onclick = function() { //Llamar a crear enemigos y animar
    startGame()
    createEnemies()
}

$resetGameBtn.onclick = function() { //Llamar a crear enemigos y animar
    resetAll();
    startGame()
    createEnemies()
    $resetContainer.style.display = "none"
}

function startGame(){ //Comienza el juego/animación
    requestId = requestAnimationFrame(startGame);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bg.draw();
    player.draw();
    audioGame.play()
    destroyLostSunBalls()
    gameOver()
    collisionSunBallEnemy()
    $clickCounter.innerHTML = numberOfClicks;
    $killingCounter.innerHTML = enemiesKilled;
    updateMouseLife()
}


function createEnemies(){
    setInterval(()=>{ //Hacer que vayan apareciendo enemigos
        const radius = Math.random() * (30 - 10) + 10; //Randomizar el tamaño
        let x; //randomizar el punto en x
        let y; //randomizar el punto en y
        if(Math.random() < 0.5){ //Hacer que desde fuera de X y Y
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        }
        const color = `rgb(${Math.random()*251},${Math.random()*251},${Math.random()*251})`//Randomizar los colores de los enemigos
        const angle = Math.atan2((canvas.height/2) - y,(canvas.width/2)- x);// hacer que los enemigos se dirijan hacia el centro
        const velocity = {//Lo pasamos como argumento a la clase Enemy para que se dirijan al centro
            x: Math.cos(angle),//Convertimos el radian en coseno+,
            y: Math.sin(angle),//convertimos en radian en seno+,
        }
        enemies.push(new Enemy(x,y,radius,color,velocity)) //Creamos el array de enemigos desde donde vamos a empezar a mostrarlos
    },500)
}

window.addEventListener('click',(e)=>{
    const angle = Math.atan2((e.clientY - (canvas.height/2)),(e.clientX - (canvas.width/2)));//Crear los ángulos para que los sunballs se dirijan a donde hicimos click
    const velocity = {
        x: Math.cos(angle) * 3, //coseno del Angle, lo multiplicamos x3 para aumentar velocidad,
        y: Math.sin(angle) * 3,//seno del Angle, lo multiplicamos x3 para aumentar velocidad,
    }
    sunBalls.push(new SunBall(centerWidth,centerHeight,8,"red",velocity)) //Por cada click, vamos agregando un sanball al arreglo
    if(requestId){ //Eliminar el contador de click al cliquear en Start-Game
        numberOfClicks ++
    }
})

function updateMouseLife(){
    $mouseLife.innerHTML = (150000 - numberOfClicks)
}

function destroyLostSunBalls(){ //Eliminar los sun balls que se salen del canvas
    sunBalls.forEach((sunBall,sunBallIndex)=>{
        sunBall.update()
        if(sunBall.x + sunBall.radius < 0 || 
            sunBall.x - sunBall.radius > canvas.width || 
            sunBall.y + sunBall.radius < 0 || 
            sunBall.y - sunBall.radius >canvas.height){
            sunBalls.splice(sunBallIndex,1)
        }
    })
}

function collisionSunBallEnemy(){ // Detecta la colisión entre los enemigos y los sunballs

    enemies.forEach((enemy,index)=>{
        enemy.update()
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
}

function gameOver(){
    enemies.forEach((enemy,index)=>{
        enemy.update()
        if(player.collision(enemy)){
            $resetContainer.style.display = "flex"
            audioGameOver.play()
            audioGame.pause()
            $finalClicsPoints.innerText = numberOfClicks;
            cancelAnimationFrame(requestId)
        }
    })
}

// animate()
// createEnemies()
