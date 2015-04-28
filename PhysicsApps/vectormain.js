//help from example from rectangleworld.com
window.addEventListener("load", windowLoadHandler, false);

function windowLoadHandler(){
  vectorApp();
}

function vectorApp(){  
  //get element and context
  var gamebox = document.getElementById("box");
  var ctxbox = gamebox.getContext('2d');
  var xbox = document.getElementById("xbox");
  var ctxxbox = xbox.getContext('2d');
  var ybox = document.getElementById("ybox");
  var ctxybox = ybox.getContext('2d');
  var magbox = document.getElementById("magbox");
  var ctxmagbox = magbox.getContext('2d');
  var magLabel = document.getElementById("magLabel");
  var xmagLabel = document.getElementById("xmagLabel");
  var ymagLabel = document.getElementById("ymagLabel");
  
  
  var x0 = 199;
  var x1 = 300;
  var y0 = 100;
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
    if (hit(mouseX,mouseY,x0,y0)){
      dragging = true;
      grab = "tail";
    }
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
    if (grab == "head"){
      x1 = checkX(mouseX);
      y1 = checkY(mouseY);
    }
    if (grab == "tail"){
      x0 = checkX(mouseX);
      y0 = checkY(mouseY);
    }
    ctxbox.clearRect(0, 0, gamebox.width, gamebox.height);
    ctxxbox.clearRect(0, 0, xbox.width, xbox.height);
    ctxybox.clearRect(0, 0, ybox.width, ybox.height);
    ctxmagbox.clearRect(0, 0, magbox.width, magbox.height);

    draw();
  }
  
  function draw(){
    var pad = 15;
    //calculate magnitudes
    var xmag = Math.abs(x1-x0);
    var ymag = Math.abs(y1-y0);
    var mag = Math.sqrt(Math.pow(xmag,2)+Math.pow(ymag,2));
    //draw grid
    drawGrid(ctxxbox, xbox);
    drawGrid(ctxybox, ybox);
    drawGrid(ctxbox, gamebox);
    drawGrid(ctxmagbox, magbox);
    //draw arrows
    drawArrow(ctxbox,x0,y0,x1,y1,maincolor);
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
    //set magnitude text
    xmagLabel.innerHTML = (xmag/10).toFixed(2)+ "<br>X Magnitude";
    ymagLabel.innerHTML = (ymag/10).toFixed(2) + "<br>Y Magnitude";
    magLabel.innerHTML = (mag/10).toFixed(2) + "<br>Magnitude";
  
    
  }
  
  function hit(hx,hy,x,y){
    var dx = hx - x;
    var dy = hy - y;
    return (dx*dx + dy*dy < 25);
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
    ctx.arc(x0,y0,radius,0,twoPI,false);
    //move to edge of circle in correct direction
    ctx.moveTo(x0 + radius * Math.cos(angle),
               y0 + radius * Math.sin(angle));
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
}


  
  
