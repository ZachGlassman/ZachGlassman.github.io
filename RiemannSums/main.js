window.addEventListener("load", windowLoadHandler, false);

function windowLoadHandler(){
  "use strict";
  riemannSumsApp();
}


function riemannSumsApp(){  
  //get element and context
  var box = document.getElementById("box");
  var ctx = box.getContext('2d');
  drawAxis(ctx);
  
}


function drawAxis(ctx){
  ctx.beginPath();
  ctx.moveTo(20,box.height/2);
  ctx.lineTo(box.width-20,box.height/2);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(20,20);
  ctx.lineTo(20,box.height-20);
  ctx.closePath();
  ctx.stroke();
}

//function to map points to space on canvas
function xpoint(p){
  
}