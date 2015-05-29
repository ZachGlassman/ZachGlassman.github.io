//http://www.javascripter.net/faq/plotafunctiongraph.htm
//much code reused from above
window.addEventListener("load", windowLoadHandler, false);
var approx = document.getElementById("approx");
//want to plot area under the curve

function windowLoadHandler(){
  var p = document.getElementById("points");
  var exact = document.getElementById("exact");
  
  draw(p.value);
  exact.innerHTML = "Exact integral is " + computeVal(fun);
  p.addEventListener("input",function(){
    draw(p.value);
  },false);
}


function fun(x) {
  //return (Math.sin(x/2)+Math.cos(x*3));  
  return Math.cos(x*3);

}

function computeVal(fun){
  ans = 0;
  var dx = 0.00001;
  var a = 0;
  var b = 12.6;
  var n = (b-a)/dx;
  for (var i =0; i <= n;i++){
    var x0 = a +(i-1)*dx;
    var x1 = a + i * dx;
    var area = dx * (fun(x0)+fun(x1))/2;
    ans = ans + area;
  }
  return ans.toFixed(4);
}
function draw(val) {
 var canvas = document.getElementById("canvas");

 if (null===canvas || !canvas.getContext) return;

 var axes={} ;
 var ctx=canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 //axes.x0 = 0.5 + 0.5*canvas.width;  // x0 pixels from left to x=0
 axes.x0 = 0;
 axes.y0 = 0.5 + 0.5*canvas.height; // y0 pixels from top to y=0
 axes.scale = 40;                 // 40 pixels from x=0 to x=1
 axes.doNegativeX = true;

 showAxes(ctx,axes);

 
 riemannGraph(ctx,axes,fun,5 * val);
 funGraph(ctx,axes,fun,"rgb(0,0,0)",2);
}

function funGraph (ctx,axes,func,color,thick) {
 var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
 var iMax = Math.round((ctx.canvas.width-x0)/dx);
 var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
 var ans = 0;
 ctx.beginPath();
 ctx.lineWidth = thick;
 ctx.strokeStyle = color;

 for (var i=iMin;i<=iMax;i++) {
  xx = dx*i; yy = scale*func(xx/scale);
  if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
  else         ctx.lineTo(x0+xx,y0-yy);

 }
 ctx.stroke();
}

function riemannGraph(ctx,axes,func,dx){
 var xx,yy,x0 = axes.x0,y0= axes.y0, scale = axes.scale;
 var iMax = Math.round((ctx.canvas.width-x0)/dx);
 var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
 ctx.lineWidth = 1;
  //fill rects
 var ans = 0;
 for (var j = iMin; j<=iMax;j++){
   xx = dx*j; yy = scale*func(xx/scale);
   ctx.beginPath();
   ctx.rect(x0+xx,y0-yy,dx,yy);
   if (y0-yy<y0) ctx.fillStyle="rgba(255, 0, 0, 0.3)";
   else ctx.fillStyle = "rgba(0,0, 255, 0.3)";
   ctx.stroke();
   ctx.fill();
   ans = ans + fun(xx/scale) *dx/scale;
 }
 approx.innerHTML = "Approximate Integral is " + ans.toFixed(4);
}


function showAxes(ctx,axes) {
 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;
 var xmin = axes.doNegativeX ? 0 : x0;
 ctx.beginPath();
 ctx.strokeStyle = "rgb(128,128,128)"; 
 ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
 ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
 ctx.stroke();
}