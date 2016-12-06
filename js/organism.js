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
		if(t=="hidden"){
			this.numHidden++;
		}else if(t=="input"){
			this.numInputs++;
		}else if(t=="output"){
			this.numOutputs++;
		}
		n.type = t;
		this.nodeGenes.push(n);
	},

	x: 0, //for visualizer
	y: 0 //for visualizer
}