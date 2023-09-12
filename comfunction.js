
// import {  } from "VarDef.js";


// Namespace constants
var svgns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    xmlns = "http://www.w3.org/XML/1998/namespace",
    xmlnsns = "http://www.w3.org/2000/xmlns/", // see http://www.w3.org/TR/REC-xml-names/#xmlReserved
    se_ns = "http://svg-edit.googlecode.com",
    htmlns = "http://www.w3.org/1999/xhtml",
    mathns = "http://www.w3.org/1998/Math/MathML";

var mLand; 
var ViewZoom = 100;

var CurZoom = 0.3;

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
// var point = {x:0, y:0}
 
// var InfPhyRect = {

//     TL:point,
//     TR:point,
//     BL:point,
//     BR:point

// }


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

var InfArea = new Array;



function InfInit(obj){

    

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


    
    var index = InfArea.length;
    for(var i = 0; i < index; i ++){
        var pcbs = InfArea[i];
        var cy = obj[i].scrollHeight;
        // stPoint = stPoint + pcb.length;
        // pcb.startPoint = stPoint;
        
        //var obj;
        var stPoint = 0;
        var areaIndex = pcbs.length;
        for(var j = 0; j < pcbs.length; j ++)
        {

            // 
            var line = document.createElementNS(svgns,'line');
            if(j % 2){
                line.setAttribute('style', 'stroke:red; stroke-width:0.3; stroke-opacity:1'); 
            }else{
                line.setAttribute('style', 'stroke:black; stroke-width:0.3; stroke-opacity:1'); 
            }
            
            // if(1)line.setAttribute('style', 'stroke:red; stroke-width:0.2'); 
            line.setAttribute('x1', stPoint);
            line.setAttribute('y1', 5);
            line.setAttribute('x2', stPoint + pcbs[j].length);
            line.setAttribute('y2', 5);
            obj[i].appendChild(line);


            var pcb = pcbs[j];

            pcb.startPoint = stPoint;

            stPoint = stPoint + pcbs[j].length;

            for(var k = 0; k < pcb.led; k ++){



                // 区域第一块PCB
                if(j == 0 ){
                    if(k < 4){
                        pcb.x[k] = pcb.startPoint + LedWidth / 2 + 3 * k + 1;
                    }else{
    
                        pcb.x[k] = pcb.x[k -1 ] + (pcb.length - 3 * 4 - 3) / (pcb.led - 4);
                    }
    
                }
                // 该区域最后一块PCB
                else if(j == (areaIndex - 1)){
    
                    if(k > (pcb.led - 4)){

                        pcb.x[k] = pcb.x[k - 1] + 3;

                    }else{
                        pcb.x[k] = pcb.startPoint + 3+ (pcb.length - 3 * 4 - 3) / (pcb.led - 4) * k;
                    }

                }
                // 中间区域PCB
                else{
                    pcb.x[k] = pcb.startPoint + (pcb.length / pcb.led) * k + LedWidth;
    
                }

                var px = pcb.x[k];
                // var cy = 0;
                
                // console.log(cy);
                // console.log('led' + j + k + ':'+ pt);
                var TxLed = document.createElementNS(svgns, 'ellipse');
                var RxLed = document.createElementNS(svgns, 'ellipse');
    
                TxLed.setAttribute('style', 'fill:red');
                TxLed.setAttribute('cx', px);
                TxLed.setAttribute('cy', cy);
                TxLed.setAttribute('rx', 1.5);
                TxLed.setAttribute('ry', 3);

                RxLed.setAttribute('style', 'fill:black');
                RxLed.setAttribute('cx', px);
                RxLed.setAttribute('cy', 0);
                RxLed.setAttribute('rx', 1.5);
                RxLed.setAttribute('ry', 3);

                // 绘制接收灯名字
                var NameTx = document.createElementNS(svgns,'text');
                NameTx.setAttribute('style', 'fill: white; font-size:1px');
                NameTx.setAttribute('x', px - 1);
                NameTx.setAttribute('y', 1.2);
                NameTx.textContent='R' + j+ k;

                // 绘制发射灯名字
                var NameRx = document.createElementNS(svgns,'text');
                NameRx.setAttribute('style', 'fill: white; font-size:1px');
                NameRx.setAttribute('x', px - 1);
                NameRx.setAttribute('y', cy - 0.4);
                NameRx.textContent='T' + j+ k;

                // console.log(px);
    
                obj[i].appendChild(TxLed);
                obj[i].appendChild(RxLed);
                obj[i].appendChild(NameTx);
                obj[i].appendChild(NameRx);

            }





            

        }


    }

}


function setLineAttribute(obj, color, width){



}



