var org = Object.create(organism);
org.createNewNode("input");
org.createNewNode("input");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("hidden");
org.createNewNode("output");

org.createNewConn(1,3);
org.createNewConn(3,6);
org.createNewConn(3,4);
org.createNewConn(4,5);

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

	//Position and nodes
	for(var i=0;i<levels.length;i++){
		var pos = 0;
		pos = (cvW/2)-(levels[i].length-3)*(levels[i][1]/2);
		for(var j=2;j<levels[i].length;j++){
			levels[i][j].assignPos(pos,levels[i][0]);
			pos+=levels[i][1];
		}
	}
	//Account for hidden connected nodes
	o.connGenes.forEach(function(c){
		if(c.in.type == c.out.type){
			c.out.y-=((c.out.y-c.in.y)*4+10);
		}
	});
	//draw synapses
	o.connGenes.forEach(function(c){
		ctx.beginPath();
		ctx.moveTo(c.in.x,c.in.y);
		ctx.lineTo(c.out.x,c.out.y);
		ctx.stroke();

		ctx.fillStyle = "rgb(255,0,255)";
		ctx.font = "12px Arial";
		ctx.fillText(c.weight,(c.in.x+c.out.x)/2,(c.in.y+c.out.y)/2);
		ctx.fillStyle = "Black";
	});
	o.nodeGenes.forEach(function(n){
		drawNode(n.x,n.y);
	});
}
drawOrg(org);
console.log(org);