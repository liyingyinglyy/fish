var can1;
var can2;

var ctx1;
var ctx2;

//获取canvas尺寸
var canWidth;
var canHeight;

//requestAnimFrame导致帧与帧之间不不一致，要知道当前帧在两帧之间执行多长时间
var lastTime;//上一帧执行时间
var deltaTime;//两帧间隔的时间差

 //定义背景图片
var bgPic=new Image();

var ane;
var fruit;
 
var mom;
var baby;

var mx;
var my;

var babyTail=[];
var babyEye=[];
var babyBody=[];

var momTail=[];
var momEye=[];
var momBodyOra=[];
var momBodyBlue=[];
var data;
var wave; //白色的圈
var halo;
var dust;
var dustPic=[];


document.body.onload=game; //body加载完成后把game作为所有脚本入口
function game()
{
    init();
    lastTime=Date.now();
    deltaTime=0;
    gameloop();//初始完后第二次循环
}

function init()
{
    //获得canvas画笔
    can1 = document.getElementById("canvas1");//fish, UI,dust,circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");//background,ane,fruits
    ctx2 = can2.getContext("2d");

    can1.addEventListener('mousemove',onMouseMove,false);
//初始化时获得图片资源
    bgPic.src="./src/background.jpg";
    //初始化时获得画布尺寸值
     canWidth=can1.width;
     canHeight=can1.height;

     ane=new aneObj();
     ane.init();
     fruit=new fruitObj();
     fruit.init();
     mom=new momObj();
     mom.init();
     baby=new babyObj();
     baby.init();

     mx=canWidth*0.5;
     my=canHeight*0.5;

     for(var i=0;i<8;i++){//尾巴8张图
         babyTail[i]=new Image();
         babyTail[i].src="./src/babyTail"+i+".png";
     }
     for(var i=0;i<2;i++){//眼睛两张图
        babyEye[i]=new Image();
        babyEye[i].src="./src/babyEye"+i+".png"
     }
     for(var i=0;i<20;i++){
         babyBody[i]=new Image();
         babyBody[i].src="./src/babyFade"+i+".png"
     }
     for(var i=0;i<8;i++){
         momTail[i]=new Image();
         momTail[i].src="./src/bigTail"+i+".png";
     }
     for(var i=0;i<2;i++){
         momEye[i]=new Image();
         momEye[i].src="./src/bigEye"+i+".png";
     }
     data=new dataObj();
     for(var i=0;i<8;i++){
         momBodyOra[i]=new Image();
         momBodyBlue[i]=new Image();
         momBodyOra[i].src="./src/bigSwim"+i+".png";
         momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";

     }
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center"; 

    wave=new waveObj();
    wave.init();
    halo=new haloObj();
    halo.init();

    for(var i=0;i<7;i++){
        dustPic[i]=new Image();
        dustPic[i].src="./src/dust"+i+".png";
    }
    dust=new dustObj();
    dust.init();
}

//游戏循环
function gameloop(){
   window.requestAnimFrame(gameloop);//使函数循环起来
   //更新间隔时间，获取当前两帧之间时间间隔
   var now=Date.now();
   deltaTime=now-lastTime; 
   //更新上次时间
   lastTime=now;
   if(deltaTime>40) deltaTime=40;

    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    
    ctx1.clearRect(0,0,canWidth,canHeight);//清除前一帧内容
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}
function onMouseMove(e){
    if(!data.gameOver){   //游戏结束无法控制鼠标
            if(e.offSetX||e.layerX){
            mx = e.offSetX == undefined ? e.layerX :e.offSetX;//获取鼠标坐标，若不存在使用e.layerX
            my = e.offSetY == undefined ? e.layerY :e.offSetY;//获取鼠标坐标，若不存在使用e.layerX

        }
    }
    
}  