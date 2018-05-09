var babyObj=function(){
    this.x;
    this.y;
    this.angle;

    this.babyTailTimer=0;//计时器
    this.babyTailCount=0;//当前图片数量

    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    this.babyEyeInterval=1000;//当前图片持续时间

    this.babyBodyTimer=0;
    this.babyBodyCount=0;
}
babyObj.prototype.init=function(){
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5+50;
    this.angle =0;
}
babyObj.prototype.draw=function(){
    this.x=lerpDistance(mom.x,this.x,0.98);//是小鱼坐标趋向于大鱼
    this.y = lerpDistance(mom.y, this.y, 0.98);

    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.6);

    this.babyTailTimer+=deltaTime;
    if(this.babyTailTimer>50){
        this.babyTailCount=(this.babyTailCount+1)%8;  //使数量范围一直为0-7
        this.babyTailTimer%=50; //计时器还原
    }

    this.babyEyeTimer+=deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount=(this.babyEyeCount+1)%2;   //共两张图片
        this.babyEyeTimer%=this.babyEyeInterval;     //恢复到起始状态

        if (this.babyEyeCount==0) { //睁眼时间为[2000,3500)间任意值
            this.babyEyeInterval=Math.random()*1500+2000; //[2000,3500)
        }else{
            this.babyEyeInterval=200;
        }
    }

    this.babyBodyTimer+=deltaTime;
    if(this.babyBodyTimer>300){
        this.babyBodyCount=this.babyBodyCount+1;
        this.babyBodyTimer%=300;  //使小鱼身体逐渐变白
        if(this.babyBodyCount>19){  //如果大于19，则停留在变白帧
            this.babyBodyCount=19;
            data.gameOver=true;
        }
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var babyTailCount=this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5+46);
    var babyBodyCount=this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount=this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5+46);
    ctx1.restore();
}