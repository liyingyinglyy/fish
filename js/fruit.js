var fruitObj=function(){
      this.alive=[];//是否活着 布尔值
      this.x=[];
      this.y=[];
      this.l=[];//果实图片长度
      this.spd=[];//果实成长速度，上飘速度
      this.fruitType=[];
      this.orange=new Image();
      this.blue = new Image();

}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;//假定每一个都在执行任务
        this.x[i]=0;
        this.y[i]=0;
        this.spd[i]=Math.random()*0.017+0.003;//[0.005,0.15)
        
        // this.aneNO=0;
        
        this.fruitType[i]="";
    }
    this.orange.src="./src/fruit.png"; //初始化时加载资源
    this.blue.src = "./src/blue.png";
}
            fruitObj.prototype.draw=function(){
                for(var i=0;i<this.num;i++){
                    
                    if(this.alive[i]){

                            if(this.fruitType[i]=="blue"){
                                var pic=this.blue;
                            }else{
                                var pic = this.orange;
                            }
                                    if(this.l[i]<=14){
                                        
                                        this.l[i]+=this.spd[i]*deltaTime;//定义增长速度
                
                                    }else{
                                        this.y[i] -= this.spd[i]*7*deltaTime;

                                    }    
                            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);//绘制图片尺寸为l*l
                            
                                if(this.y[i]<10){
                                    this.alive[i]=false;
                                }
                    }
                    
                    }
            }


fruitObj.prototype.born=function(i){
       var aneID= Math.floor(Math.random() * ane.num);//0-49间随机找海葵的ID;
       this.x[i]=ane.headx[aneID];
       this.y[i]=ane.heady[aneID];
       this.l[i] = 0;
       this.alive[i]=true;
       var ran=Math.random();
       if(ran<0.2){
            this.fruitType[i]="blue";
       }else{
           this.fruitType[i] = "orange";
       }
fruitObj.prototype.dead=function(i){//果实从屏幕上消失
      this.alive[i]=false;
}    
}
function fruitMonitor(){
    var num=0;  //统计活着的果实数
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]) num++;
    }
    if(num<15){
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}