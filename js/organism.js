var globInnovNum = 1;

var connGene = {
	innovNum: 0,
	in: null,
	out: null,
	weight: 5,
	enabled: true,

	genRandWeight: function(){
		this.weight = Math.floor(Math.random()*10000)/100;
	},
	getWeightedValue: function(){
		return this.in.getSigmoid()*this.weight;
	}
}

var nodeGene = {
	type: "hidden",//sensor,hidden,output
	x: 0,
	y: 0,
	inputs: null,
	createInputs: function(){
		this.inputs = [];
	},
	assignPos: function(x,y){
		this.x=x;
		this.y=y;
	}
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
		c.out = this.nodeGenes[o-1];
		c.out.createInputs();
		c.out.inputs.push(c);
		c.genRandWeight();
		console.log(c.weight);
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