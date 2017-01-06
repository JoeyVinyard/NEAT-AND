var globInnovNum = 1;

var connGene = {
	innovNum: 0,
	in: null,
	out: null,
	weight: 0.5,
	enabled: true
}

var nodeGene = {
	type: "hidden",//sensor,hidden,output
}

var organism = {
	connGenes: [],
	nodeGenes: [],
	numInputs: 0,
	numHidden: 0,
	numOutputs: 0,

	createNewConn: function(i,o){
		var c = Object.create(connGene);
		c.innovNum=globInnovNum;
		globInnovNum++;
		c.in = this.nodeGenes[i-1];
		c.out = this.nodeGenes[i-1];
		this.connGenes.push(c);
	},
	createNewNode: function(t){
		var n = Object.create(nodeGene);
		switch(t){
			case "input":
				this.numInputs++;
				break;
			case "hidden":
				this.numHidden++;
				break;
			case "output":
				this.numOutputs++;
				break;
			default:
				throwErrorMessage("Node Creation","No type recognized");
				t = "hidden";
				break;
		}
		n.type = t;
		this.nodeGenes.push(n);
	},
}