var org = Object.create(organism);
org.createNewNode("input");
org.createNewNode("input");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("output");

org.createNewConn(1,3);
org.createNewConn(3,6);

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
	//Generate gaps and store them
	inNodes.splice(1,0,Math.floor((cvW-20)/(inNodes.length-1)));
	hdNodes.splice(1,0,Math.floor((cvW-20)/(hdNodes.length-1))); 
	otNodes.splice(1,0,Math.floor((cvW-20)/(otNodes.length-1)));
	//store all arrays in a single array
	levels.push(inNodes,hdNodes,otNodes);

	//Position and draw nodes
	for(var i=0;i<levels.length;i++){
		var pos = 0;
		pos = (cvW/2)-(levels[i].length-3)*(levels[i][1]/2);
		for(var j=2;j<levels[i].length;j++){
			console.log(pos,levels[i][0]);
			drawNode(pos,levels[i][0]);
			levels[i][j].assignPos(pos,levels[i][0]);
			pos+=levels[i][1];
		}
	}
	//Draw connections
	o.connGenes.forEach(function(c){
		ctx.beginPath();
		console.log(c.in.x,c.in.y,c.out.x,c.out.y)
		ctx.moveTo(c.in.x,c.in.y);
		ctx.lineTo(c.out.x,c.out.y);
		ctx.stroke();
	});
}
drawOrg(org);