//判断大鱼和果实的距离，小于某一个值则认为吃掉
function momFruitsCollision(){
    if(!data.gameOver){
        for(var i=0;i<fruit.num;i++){
         if(fruit.alive[i]){
            var l= calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);//计算距离
            if(l<900){//平方和小于900被吃掉
                fruit.dead(i);
                data.fruitNum++;
                mom.momBodyCount++;
                if(mom.momBodyCount>7){
                    mom.momBodyCount=7;
                }
                if(fruit.fruitType[i]=="blue"){
                    data.double=2;
                }  
                wave.born(fruit.x[i],fruit.y[i]);
            }
         }
     }
    }
     
} 
function momBabyCollision(){ //计算大鱼小鱼间距离
    if(data.fruitNum>0&&!data.gameOver){
        var l=calLength2(mom.x,mom.y,baby.x,baby.y);
        if(l<900){
        baby.babyBodyCount=0;  //回到第一帧复活状态
        mom.momBodyCount=0;  //碰撞后恢复初始帧
        data.addScore();
        halo.born(baby.x,baby.y);
    }
  
  }
}