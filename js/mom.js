var momObj=function(){
    this.x;
    this.y;
    this.angle;//定义角度

    this.momTailTimer=0;
    this.momTailCount=0;

    this.momEyeTimer=0;
    this.momEyeCount=0;
    this.momEyeInterval=1000;

    this.momBodyCount=0;

}
momObj.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;
}
momObj.prototype.draw=function(){
    this.x=lerpDistance(mx,this.x,0.98); //使大鱼跟随鼠标 第三个参数设置鱼跟随鼠标的运动速度
    this.y=lerpDistance(my,this.y,0.98);
    var deltaY=my-this.y;
    var deltaX = mx- this.x;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);//通过第三个参数改变鱼跟随鼠标的反应速度
   
    this.momTailTimer+=deltaTime;
    if(this.momTailTimer>50){
        this.momTailCount=(this.momTailCount+1)%8;
        this.momTailTimer%=50;
    }

    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;   //共两张图片
        this.momEyeTimer %= this.momEyeInterval;     //恢复到起始状态

        if (this.momEyeCount == 0) { //睁眼时间为[2000,3500)间任意值
            this.momEyeInterval = Math.random() * 1500 + 2000; //[2000,3500)
        } else {
            this.momEyeInterval = 200;
        }
    }


    ctx1.save();
    ctx1.translate(this.x,this.y);//移动原点
    ctx1.rotate(this.angle);//先translate 再rotate
    var momTailCount=this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
    var momBodyCount=this.momBodyCount;
    if(data.double==1){  //判断吃到的果实颜色
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    }else{
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
 
    }
    var momEyeCount=this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height*0.5);
    ctx1.restore();
}