var mLand; 
var ViewZoom = 100;



// 用于按键对图形的放大缩小
function zoomTranslate(CurZoom, keycode){

    var TagZoom;
    var len = CurZoom.indexOf('%');
    var zm = Number(CurZoom.slice(0, len));
    var pre = 15;
    
    switch(keycode){

        case 90: 
            zm = zm + zm / pre;           
            break;
        case 88:
            zm = zm - zm / pre;  
            break;
        default:
            return 0;
    }

    return String(zm + '%');
}

// 定义坐标类型
var point = {x:0, y:0}
 
var InfPhyRect = {

    TL:point,
    TR:point,
    BL:point,
    BR:point

}


// 定义相关的物理尺寸  （单位mm）
var phyWidth = 4098.9;  // PCBA 总长度
var phyHeight = 1195.6  // 上下PCBA的距离 
var phyLedCenterDis = 1193;   // PCBA 上下灯中心距离
var LedWidth = 3;


// 每块PCBA的信息

// 右侧副板信息
var PCBA_01 = {
    length:513.05,
    led:60,
    startPoint:0,
    x: new Array,
    viewLed: new Array,

}
var PCBA_02 = {
    length:535.95,
    led:54,
    startPoint:513.05,
    x: new Array,
    viewLed: new Array,

}
// 显示屏区域板信息
var PCBA_03 = {
    length:343.85,
    led:45,
    startPoint:0,
    x: new Array,
    viewLed: new Array,

}
var PCBA_04 = {
    length:540,
    led:54,
    startPoint:0,
    x: new Array,
    viewLed: new Array,

}  
var PCBA_05 = {
    length:540,
    led:54,
    startPoint:0,
    x: new Array,
    viewLed: new Array,

}
var PCBA_06 = {
    length:554.65,
    led:63,
    startPoint:0,
    x: new Array,
    viewLed: new Array,

}


// 右侧副板信息
var PCBA_07 = {
    length:493.15,
    led:51,
    startPoint:0,
    x: new Array,
    viewLed: new Array,

}
var PCBA_08 = {
    length:555.85,
    led:63,
    startPoint:0,
    x: new Array,
    viewLed: new Array,

}

var InfAreaL = new Array();
var InfAreaC = new Array();
var InfAreaR = new Array();

var InfArea = new Object;



function InfInit(){

    InfAreaL.push(PCBA_01);
    InfAreaL.push(PCBA_02);

    InfAreaC.push(PCBA_03);
    InfAreaC.push(PCBA_04);
    InfAreaC.push(PCBA_05);
    InfAreaC.push(PCBA_06);

    InfAreaR.push(PCBA_07);
    InfAreaR.push(PCBA_08);

    InfArea.push(InfAreaL);
    InfArea.push(InfAreaC);
    InfArea.push(InfAreaR);


    var stPoint = 0;
    var index = InfAreaL.lengt;
    for(var i = 0; i < index; i ++){
        var pcb = InfAreaL[i];
        stPoint = stPoint + pcb.length;
        pcb.startPoint = stPoint;

        var obj;

        for(var j = 0; j < pcb.led; j ++)
        {
            if(i == 0 ){
                if(j < 4){
                    pcb.x[j] = stPoint + LedWidth / 2 + 3 * j;
                }else{

                    pcb.x[j] = pcb.x[j -1 ] + (pcb.lengt - 3 * j) / (pcb.led - 4);
                }

            }else if(i == index){


            }else{
                

            }

        }


    }

}


function setLineAttribute(obj, color, width, ){



}



