var canvas;
var ctx;
function prepCanv(){
	canvas = document.getElementById("canv");
	$("#canv").attr("width",400);
	$("#canv").attr("height",400);
	ctx = canvas.getContext("2d");
}
function drawObject(x,y,width,height,shape,color){
	ctx.fillStyle = color;
	switch(shape){
		case "rect":
			ctx.fillRect(x,y,width,height);
		break;
		case "circ":
			ctx.beginPath();
			ctx.arc(x+width/2,y+height/2,width/2,0,Math.PI*2);
			ctx.fill();
			ctx.closePath();
		break;
		default:
			ctx.fillRect(x,y,width,height);
	}
}
prepCanv();
ctx.fillStyle = "White";
ctx.fillRect(0,0,$("#canv").attr("width"),$("#canv").attr("height"));
//drawObject(200,200,30,30,"circ","rgb(0,0,125)");