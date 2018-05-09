var aneObj=function(){
    this.rootx=[];  //根部坐标
    this.headx=[];  //结束点坐标
    this.heady=[];
    this.amp=[];  //振幅
    this.alpha=0;  //摆动速度
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.rootx[i]=i*16+Math.random()*20;//海葵间距
        this.headx[i] = this.rootx[i];
        this.heady[i]=canHeight-250+Math.random()*50;
        this.amp[i]=Math.random()*50+50;
    }
}

//绘制海葵
aneObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);   //曲线Y坐标
    ctx2.save();
    ctx2.globalAlpha=0.6;//定义透明度 
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";//需定义在stroke之前才能作用
  for(var i=0;i<this.num;i++){
       ctx2.beginPath();
       ctx2.moveTo(this.rootx[i],canHeight);
      this.headx[i] = this.rootx[i] + l * this.amp[i];
       ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
       ctx2.stroke();
  }
       ctx2.restore();//样式定义只在此段循环起作用
}