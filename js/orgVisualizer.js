var org = Object.create(organism);
org.createNewNode("input");
org.createNewNode("input");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("output");

function drawOrg(o){
	var inNodes = [340];
	var hdNodes = [200];
	var otNodes = [60];
	var levels = [];
	o.nodeGenes.forEach(function(n){
		switch(n.type){
			case "input":
				inNodes.push(n);
				break;
			case "hidden":
				hdNodes.push(n);
				break;
			case "output":
				otNodes.push(n);
				break;
			default:
				throwErrorMessage("Organism Drawing","No type recognized");
				break;
		}
	});
	inNodes.splice(1,0,Math.floor((cvW-20)/(inNodes.length-1)));
	hdNodes.splice(1,0,Math.floor((cvW-20)/(hdNodes.length-1))); 
	otNodes.splice(1,0,Math.floor((cvW-20)/(otNodes.length-1)));
	levels.push(inNodes,hdNodes,otNodes);

	//Start positioning inputs
	for(var i=0;i<levels.length;i++){
		var pos = 0;
		pos = (cvW/2)-(levels[i].length-3)*(levels[i][1]/2);
		for(var j=2;j<levels[i].length;j++){
			console.log(pos,levels[i][0]);
			drawNode(pos,levels[i][0]);
			pos+=levels[i][1];
		}
	}
}

drawOrg(org);