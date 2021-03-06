//help from example from rectangleworld.com
window.addEventListener("load", windowLoadHandler, false);

function windowLoadHandler(){
  unitCircleApp();
}

function unitCircleApp(){  
  //get element and context
  var gamebox = document.getElementById("box");
  var ctxbox = gamebox.getContext('2d');
  var xbox = document.getElementById("xbox");
  var ctxxbox = xbox.getContext('2d');
  var ybox = document.getElementById("ybox");
  var ctxybox = ybox.getContext('2d');
  var magbox = document.getElementById("magbox");
  var ctxmagbox = magbox.getContext('2d');
  var angbox = document.getElementById("angbox");
  var ctxangbox = angbox.getContext('2d');
  var magLabel = document.getElementById("magLabel");
  var xmagLabel = document.getElementById("xmagLabel");
  var ymagLabel = document.getElementById("ymagLabel");
  var angLabel = document.getElementById("angLabel");
  
  
  var unitAngles = {"0":0,
                    "\u03C0/3":Math.PI/3,
                    "\u03C0/4":Math.PI/4,
                    "\u03C0/6":Math.PI/6,
                    "\u03C0/2":Math.PI/2,
                    "2\u03C0/3":2*Math.PI/3,
                    "3\u03C0/4":3*Math.PI/4,
                    "5\u03C0/6":5*Math.PI/6,
                    "\u03C0":Math.PI,
                    "7\u03C0/6":7*Math.PI/6,
                    "5\u03C0/4":5*Math.PI/4,
                    "4\u03C0/3":Math.PI/3,
                    "3\u03C0/2":3*Math.PI/2,
                    "5\u03C0/3":5*Math.PI/3,
                    "7\u03C0/4":7*Math.PI/4,
                    "11\u03C0/6":11*Math.PI/6,
  };
  
  var x0 = gamebox.width/2;
  var x1 = 300;
  var y0 = gamebox.height/2;
  var y1 = 200;
  //boolean for dragging
  var dragging = false;
  //variable to store if dragging head or tail
  var grab;
  var mouseX;
  var mouseY;
  var maincolor = "rgb(0,0,0)";
  var xcolor = "rgb(0, 0, 255)";
  var ycolor = "rgb(255, 0, 0)";
  var acolor = "rgb(255,140,0)";
  var acolor1 ="rgb(255,80,0)";
  
  init();
  
  function init(){
    draw();

    //add event listeners
    gamebox.addEventListener("mousedown", mouseDownListener,
      false);
  
  }
  
  
  //functions to move object
  //mousedown listener
  function mouseDownListener(evt){
    var boundRect = gamebox.getBoundingClientRect();
    mouseX = (evt.clientX - boundRect.left)*(gamebox.width/boundRect.width);
    mouseY = (evt.clientY - boundRect.top)*(gamebox.height/boundRect.height);
    //figure out if one of circles is dragged
    if (hit(mouseX,mouseY,x1,y1)){
      dragging = true;
      grab = "head";
    }
    
    if (dragging){
      window.addEventListener("mousemove", mouseMoveListener,false);
    }
    gamebox.removeEventListener("mousedown",mouseDownListener,false);
    window.addEventListener("mouseup", mouseUpListener,false);
  
    if (evt.preventDefault){
      evt.preventDefault();
    }
    else if (evt.returnValue){
      evt.returnValue = false;
    }
    return false;
  }
  
  function mouseUpListener(evt){
    gamebox.addEventListener("mousedown",mouseDownListener,false);
    window.removeEventListener("mouseup", mouseUpListener,false);
    if (dragging){
      dragging = false;
      window.removeEventListener("mousemove", mouseMoveListener,false);
    }
  }
  
  function mouseMoveListener(evt){
    var temp;
    var minX = 5;
    var maxX = gamebox.width - 5;
    var minY = 5;
    var maxY = gamebox.height - 5;
    var boundRect = gamebox.getBoundingClientRect();
    mouseX = (evt.clientX - boundRect.left)*(gamebox.width/boundRect.width);
    mouseY = (evt.clientY - boundRect.top)*(gamebox.height/boundRect.height);
    function checkX(posX){
      return (posX < minX)? minX :((posX > maxX) ? maxX:posX);
    }  
    function checkY(posY){
      return (posY < minY)? minY :((posY > maxY) ? maxX:posY);
    }
    
    function isPoint(x,y){
      function modNum(num){
        if (num < 0){
          return num + 2 * Math.PI;
        }
        else{
          return num;
        }
      }
      var angle = modNum(Math.atan2(y0-y,x-x0));
      var ans = [x,y];
      for (var jj in unitAngles){
        if (unitAngles.hasOwnProperty(jj)){
           if (Math.abs(unitAngles[jj]-angle) < 0.01){
             
              ans[0] = gamebox.width/2.5*
                  Math.cos(unitAngles[jj]);
              ans[1] = -gamebox.width/2.5*
                  Math.sin(unitAngles[jj]);
              
              return ans;
           }
        } 
      }
      return ans;
    }
    if (grab == "head"){
      x1p = checkX(mouseX);
      y1p = checkY(mouseY);
      temp = isPoint(x1p,y1p);
      x1 = temp[0];
      y1 = temp[1];
    }
    ctxbox.clearRect(0, 0, gamebox.width, gamebox.height);
    ctxxbox.clearRect(0, 0, xbox.width, xbox.height);
    ctxybox.clearRect(0, 0, ybox.width, ybox.height);
    ctxmagbox.clearRect(0, 0, magbox.width, magbox.height);
    ctxangbox.clearRect(0,0,angbox.width,angbox.height);
    draw();
  }
  
  function draw(){
    var pad = 15;
    //calculate magnitudes
    var newXY = calcNewXY(x1,y1);
    x1 = newXY.x;
    y1 = newXY.y;
    var xmag = Math.abs(x1-x0);
    var ymag = Math.abs(y1-y0);
    var mag = Math.sqrt(Math.pow(xmag,2)+Math.pow(ymag,2));
    var ang = Math.atan2(y1-y0,x1-x0);
    //draw grid
    drawGrid(ctxxbox, xbox);
    drawGrid(ctxybox, ybox);
    drawCircleGrid(x0,y0,ctxbox, gamebox);
    drawGrid(ctxmagbox, magbox);
    drawUnitCircle(100,100,ctxangbox,
        angbox,90,calcAngle(x1-x0,y0-y1));
    //draw arrows
    
    drawArrow(ctxxbox,xbox.width/2,
                      xbox.height-pad,
                      xbox.width/2,
                      xbox.height-pad-xmag,
                      xcolor);
    drawArrow(ctxybox,ybox.width/2,
                      ybox.height-pad,
                      ybox.width/2,
                      ybox.height-pad-ymag,
                      ycolor);
    
    drawArrow(ctxmagbox,magbox.width/2,
                      magbox.height-pad,
                      magbox.width/2,
                      magbox.height-pad-mag,
                      maincolor);
                      
    drawArrow(ctxbox,x0,y0,x0,y1,ycolor);
    drawArrow(ctxbox,x0,y0,x1,y0,xcolor);
    drawCircArrow(ctxbox,x0,y0,x1,y1,maincolor);
    drawCurveArrow(ctxbox,x0,y0,x1,y1,220,acolor);
    drawSlice(ctxangbox,100,100,20,ang,acolor1,3);
    drawSlice(ctxangbox,100,100,60,ang,acolor,5);
    //set magnitude text
    xmagLabel.innerHTML = (xmag/185).toFixed(4)+ "<br>|cos(&theta;)|";//costheta
    ymagLabel.innerHTML = (ymag/185).toFixed(4) + "<br>|sin(&theta;)|";//sintheta
    magLabel.innerHTML = (mag/185).toFixed(4) + "<br>[cos<sup>2</sup>(&theta;)+sin<sup>2</sup>(&theta;)]<sup>1/2</sup>";
    angLabel.innerHTML = (calcAngle(x1-x0,y0-y1)).toFixed(4) + "<br>&theta;";
  
  }
  function calcAngle(x,y){
    var angle = Math.atan2(y,x);
    if (y >0){
      return angle;
    }
    else{
      return angle + 2*Math.PI;
    }
  }
  function calcNewXY(x1,y1){
    var radius = gamebox.width/2.5-15;
    var angle = Math.atan2(y1-y0,x1-x0);
    var answer = {
      x : x0 + Math.cos(angle) * radius,
      y : y0 + Math.sin(angle) * radius,
    };
    return answer;
  }
  
  function hit(hx,hy,x,y){
    var dx = hx - x;
    var dy = hy - y;
    return (dx*dx + dy*dy < 25);
  }
  
  function drawSlice(ctx,x0,y0,radius,angle,color,thick){
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.arc(x0,y0,radius,0,angle,true);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = thick;
    ctx.stroke();
  }
  
  /* function drawArrow
    ctx - context of arrow
    x0 - starting x value
    y0 - starting y value
    x1 - ending x value
    y1 - ending y value
  */

  function drawArrow(ctx,x0,y0,x1,y1,color){
    var radius = 5;
    var twoPI = 2*Math.PI;
    //compute angle between lines
    var angle = Math.atan2(y1-y0,x1-x0);
    
    //compute points on edges of circles neccessary
    var x1f = x1 - radius * Math.cos(angle);
    var y1f = y1 - radius * Math.sin(angle);
    //draw upper circle
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    //draw to line to edge of next circle
    ctx.lineTo(x1f,y1f);
    //draw second circle
    
    //draw head
    ctx.lineTo(x1f + Math.cos(angle + Math.PI/2) * 15, 
               y1f + Math.sin(angle + Math.PI/2) * 15);
    ctx.lineTo(x1f + Math.cos(angle) * 15,
               y1f + Math.sin(angle) * 15);
    ctx.lineTo(x1f + Math.cos(angle - Math.PI/2) * 15, 
               y1f + Math.sin(angle - Math.PI/2) * 15);
    ctx.lineTo(x1f,y1f);
    //make linewidth prop to distance squared
    ctx.lineWidth = 3 + (Math.pow((x1-x0),2) 
                        + Math.pow((y1-y0),2))/20000;
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  
  //function to draw curved arrow around center to point
  //x1 y1 which must be circle
  function drawCurveArrow(ctx,x0,y0,x1,y1,radius,color){
    //compute angle between lines
    var angle = Math.atan2(y1-y0,x1-x0);
    var angle2 = angle - Math.PI/2;
    var x1f = x1 + 35 * Math.cos(angle);
    var y1f = y1 + 35 * Math.sin(angle);
    //draw circle
    ctx.beginPath();
    //draw circle
    //ctx.arc(x0,y0,radius,0,angle,false);
    ctx.arc(x0,y0,radius,0,angle,true);
    //draw head
    ctx.lineTo(x1f + Math.cos(angle2 + Math.PI/2) * 15, 
               y1f + Math.sin(angle2 + Math.PI/2) * 15);
    ctx.lineTo(x1f + Math.cos(angle2) * 15,
               y1f + Math.sin(angle2) * 15);
    ctx.lineTo(x1f + Math.cos(angle2 - Math.PI/2) * 15, 
               y1f + Math.sin(angle2 - Math.PI/2) * 15);
    ctx.lineTo(x1f,y1f);
    //make linewidth prop to distance squared
    ctx.lineWidth = 3 + (Math.pow((x1-x0),2) 
                        + Math.pow((y1-y0),2))/40000;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  
  function drawCircArrow(ctx,x0,y0,x1,y1,color){
    var radius = 5;
    var twoPI = 2*Math.PI;
    //compute angle between lines
    var angle = Math.atan2(y1-y0,x1-x0);
    
    //compute points on edges of circles neccessary
    var x1f = x1 - radius * Math.cos(angle);
    var y1f = y1 - radius * Math.sin(angle);
    //draw upper circle
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    //draw to line to edge of next circle
    ctx.lineTo(x1f,y1f);
    //draw second circle
    ctx.arc(x1,y1,radius,angle+Math.PI,
                         angle + 3 * Math.PI,false);
    //draw head
    ctx.lineTo(x1f + Math.cos(angle + Math.PI/2) * 15, 
               y1f + Math.sin(angle + Math.PI/2) * 15);
    ctx.lineTo(x1f + Math.cos(angle) * 15,
               y1f + Math.sin(angle) * 15);
    ctx.lineTo(x1f + Math.cos(angle - Math.PI/2) * 15, 
               y1f + Math.sin(angle - Math.PI/2) * 15);
    ctx.lineTo(x1f,y1f);
    //make linewidth prop to distance squared
    ctx.lineWidth = 3 + (Math.pow((x1-x0),2) 
                        + Math.pow((y1-y0),2))/40000;
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  
  function drawGrid(ctx,can){
    var line;
    ctx.strokeStyle = "rgb(127,127,127)";
    ctx.lineWidth = 1;
    for (var i =0; i < can.width/10;i++){
      line = 10 * i;
      ctx.beginPath();
      ctx.moveTo(line,0);
      ctx.lineTo(line,can.height);
      ctx.closePath();
      ctx.stroke();
    }
    for (var j=0; j < can.height/10; j++){
      line = 10 * j;
      ctx.beginPath();
      ctx.moveTo(0,line);
      ctx.lineTo(can.width,line);
      ctx.closePath();
      ctx.stroke();
    }
  }
  
  function drawCircleGrid(x0,y0,ctx,can){
    var line;
    var radiusSqr = Math.pow(can.width/2.5,2);
    var dxy;
    var toDraw;
    ctx.strokeStyle = "rgb(127,127,127)";
    ctx.lineWidth = 1;
    for (var i =0; i < can.width/10;i++){
      line = 10 * i;
      dxy = x0 - line;
      toDraw = Math.sqrt(radiusSqr - dxy*dxy);
      ctx.beginPath();
      ctx.moveTo(line,y0- toDraw);
      ctx.lineTo(line,y0+toDraw);
      ctx.closePath();
      ctx.stroke();
    }
    for (var j=0; j < can.height/10; j++){
      line = 10 * j;
      dxy = x0 - line;
      toDraw = Math.sqrt(radiusSqr - dxy*dxy);
      ctx.beginPath();
      ctx.moveTo(x0-toDraw,line);
      ctx.lineTo(x0+toDraw,line);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x0,y0,can.width/2.5,0,2*Math.PI,false);
    ctx.closePath();
    ctx.stroke();
    
    for (var jj in unitAngles){
      if (unitAngles.hasOwnProperty(jj)){
        xx = can.width/2.5*Math.cos(unitAngles[jj]);
        yy = -can.width/2.5*Math.sin(unitAngles[jj]);
        ctx.beginPath();
        ctx.arc(x0+xx,y0+yy,5,0,2*Math.PI,false);
        ctx.closePath();
        ctx.fill();
      } 
    }
    
  }
  
  function drawUnitCircle(x0,y0,ctx,can,radius,angle1){
    var angles = ["0/1","1/6","1/4","1/3","1/2",
                  "2/3","3/4","5/6","1/1",
                  "7/6","5/4","4/3","3/2",
                  "5/3","7/4","11/6"];
    var  angle;
    var split;
    var x;
    var y;
    ctx.font="15px veranda";
    ctx.textAlign="center";
    for(var i =0; i < angles.length; i++){
      split = angles[i].split("/");
      angle = parseInt(split[0])/parseInt(split[1])*Math.PI;
      if (angle1 >= angle){
        x = x0 + radius * Math.cos(angle);
        y = y0 - radius * Math.sin(angle);
        ctx.fillText(makeString(split[0],split[1]),x,y);
      }
      else{
        break;
      }
    }
  }
  //function to make unicode string of form pi x/y
  function makeString(x,y){
    if (x==0){
      return 0;
    }
    else if (x == 1){
      if (y == 1){
        return "\u03C0";
      }
      else{
        return "\u03C0"+ "/" + String(y);
      }
    }
    else{
      return String(x) + "\u03C0" + "/" + String(y);
    }
  }
}


