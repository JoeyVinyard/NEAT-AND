var org = Object.create(organism);
org.createNewNode("input");
org.createNewNode("input");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("output");

var inputLevel = 140;
var hiddenLevel = 80;
var outputLevel = 20;

var numInput = 0;
var numHidden = 0;
var numOutput = 0;

//console.log(org.nodeGenes);

org.nodeGenes.forEach(function(n){
	if(n.type=="input"){
		numInput++;
		n.x = numInput*30;
		n.y = inputLevel;
	}else if(n.type=="hidden"){
		numHidden++;
		n.x = numHidden*30-10;
		n.y = hiddenLevel;
	}else if(n.type=="output"){
		numOutput++;
		n.x = numOutput*30;
		n.y = outputLevel;
	}
	drawObject(n.x-5,n.y-5,10,10,"rect","rgb(125,125,125)");
})