var org = Object.create(organism);
org.createNewNode("input");
org.createNewNode("input");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("output");

var inputLevel = 340;
var hiddenLevel = 200;
var outputLevel = 60;

function drawOrg(o){
	var iInc = Math.floor((320-(o.numInputs*20))/(o.numInputs+1));
	var hInc = Math.floor((320-(o.numHidden*20))/(o.numHidden+1));
	var oInc = Math.floor((320-(o.numOutputs*20))/(o.numOutputs+1));
	console.log("iInc:",iInc);
	console.log("hInc:",hInc);
	console.log("oInc:",oInc);
	var countI = 0;
	var countH = 0;
	var countO = 0;
	o.nodeGenes.forEach(function(n){
		if(n.type=="input"){
			n.x = 40+iInc*countI;
			n.y = inputLevel;
			countI++;
		}else if(n.type=="hidden"){
			n.x = 40+hInc*countH;
			n.y = hiddenLevel;
			countH++;
		}else if(n.type=="output"){
			n.x = 40+oInc*countO;
			n.y = outputLevel;
			countO++;
		}
		console.log("Drawing node at: " + (n.x-10)+","+(n.y-10)+" of type: "+n.type);
		drawObject(n.x-10,n.y-10,20,20,"rect","rgb(50,50,50)");
	});
	
}

drawOrg(org);