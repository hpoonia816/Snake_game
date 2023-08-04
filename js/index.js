let inputDir={x:0 , y:0};





let score=0;
let lastPaintTime =0;
let snakeArr=[{
    x:1 , y:1
}];
food={x:11 ,y:11};

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/5 ){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){

    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }

        }
        if (snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0){
            return true;

        }
        
    return false;
  
}
function gameEngine (){
     
     if(isCollide(snakeArr)){
        inputDir ={x:0 , y:0};
        alert("Game Over , Press any key to play again");
        snakeArr =[{x:1 , y:1}];
        score=0;
     }
      if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){

        snakeArr.unshift({x: snakeArr[0].x+ inputDir.x , y: snakeArr[0].y+ inputDir.y});
        score +=1;
        if (score>hiscoreval){
            hiscoreval = score ;
            localStorage.setItem("hiscore" , JSON.stringify(hiscore)); 
            
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;

        }         

        scoreBox.innerHTML ="Score: " + score ;
        let a=2;
        let b=16;
        food = {x: Math.round(a+(b-a)*Math.random()) , y : Math.round(a+(b-a)*Math.random()) }
      }
      for (let i = snakeArr.length-2; i>= 0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
        
      }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

     board.innerHTML = " ";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        
        if (index ===0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);

    });
       
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart= food.y;
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);



}


let hiscore = localStorage.getItem("hiscore");
 if (hiscore === null){
      hiscoreval = 0;
      localStorage.setItem("hiscore" , JSON.stringify(hiscore));  
 }
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0 , y:1};

    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "Arrowdown":
            inputDir.x = 0 ;
            inputDir.y = 1;
                break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        
        default:
            break;

    }


});

