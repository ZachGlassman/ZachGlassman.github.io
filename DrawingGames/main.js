window.addEventListener("load", windowLoadHandler, false);

function windowLoadHandler(){
  "use strict";
  drawingGamesApp();
}

function drawingGamesApp(){  
  //get element and context
  var box = document.getElementById("box");
  var ctx = box.getContext('2d');
  var select = document.getElementById("selection");
  var nselect = document.getElementById("nselect");
  
  //populate id box
  var types = {'Koch Snowflake':'drawKochSnowflake',
              'Recursion Circles':"drawQuadCircles"
  };
  for (var i in types){
    var choose = document.createElement('option');
    choose.value = i;
    choose.innerHTML = i;
    select.appendChild(choose);
  }
  //drawKochSnowflake(x,y,ctx,10);
  //drawQuadCircles(box.width/2,box.height/2,ctx,5);
  //add event listener for button to draw
  drawIt = document.getElementById("drawIt").addEventListener("click",
    function(){
      var n = nselect.value;
      ctx.clearRect(0, 0, box.width, box.height);
      eval(types[select.value])(box.width/2,box.height/2,ctx,n);
    });
}

//function to populate select box



//koch snowflake
function drawKochSnowflake(x0,y0,ctx,n){
  y0 = y0 - 150;
  //fill 
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0,box.height,box.width);
  // get length for inital segment
  var len = (x0 + y0)/1.2;
  var y = y0 +len /2 * Math.sqrt(3);
  
  //draw triangle defined center bottom
  //dir is angle in radians of orientation
  //len is length of triangle
  //n is number of iterations
  function drawTriangle(xs,ys,dir,len,n){
    //calculate three points needed to move to
    var x1 = xs + len/2 * Math.cos(dir);
    var x2 = xs + len*Math.sqrt(3)/2 * Math.sin(dir);
    var x3 = xs - len/2 * Math.cos(dir);
    var y1 = ys + len/2 * Math.sin(dir);
    var y2 = ys - len*Math.sqrt(3)/2 * Math.cos(dir);
    var y3 = ys - len/2 * Math.sin(dir);
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.closePath();
    ctx.strokeStyle = '#000';
    ctx.stroke();
    //now white line for bottom
    ctx.beginPath();
    ctx.moveTo(x3,y3);
    ctx.lineTo(x1,y1);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    //recurse if n !=0 with two more triangles
    if (n>1){
      var ang = Math.PI/3;
      drawTriangle((x1+x2)/2,(y1+y2)/2,dir+ang,len/3,n-1);
      drawTriangle((x2+x3)/2,(y2+y3)/2,dir-ang,len/3,n-1);
    }
  
  }
  //draw first triangle
 
  ctx.beginPath();
  //move to center bottom
  ctx.moveTo(x0,y);
  //move to right corner
  ctx.lineTo(x0+len/2,y);
  ctx.lineTo(x0, y-len*Math.sin(Math.PI/3));
  ctx.lineTo(x0-len/2,y);
  ctx.lineTo(x0,y);
  ctx.closePath();
  ctx.strokeStyle = '#000';
  ctx.stroke();
  //now recurse
  var ang = Math.PI/3;
  drawTriangle(x0,y,Math.PI,len/3,n);
  drawTriangle(x0+len/4,(y+y0)/2,ang,len/3,n);
  drawTriangle(x0-len/4,(y+y0)/2,-ang,len/3,n);
}

//circles pattern
function drawQuadCircles(x0,y0,ctx,n){
  var radius = x0*0.9;
  ctx.strokeStyle = '#000';
  //define as recursion
  function drawCirc(x,y,radius,n){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI,false);
    ctx.closePath();
    ctx.stroke();
    if (n>1){
      var rad = radius/2;
      drawCirc(x+rad,y,rad,n-1);
      drawCirc(x-rad,y,rad,n-1);
      drawCirc(x,y+rad,rad,n-1);
      drawCirc(x,y-rad,rad,n-1);
    }
  }
  //do recursion
  drawCirc(x0,y0,radius,n);
}
