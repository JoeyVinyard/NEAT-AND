var globInnovNum = 1;

var connGene = {
	innovNum: 0,
	in: null,
	out: null,
	weight: 5,
	enabled: true,

	genRandWeight: function(){
		this.weight = Math.floor((Math.random()*(2)+(-1))*100)/100;
	},
	getWeightedValue: function(){
		return this.in.getSigmoid()*this.weight;
	}
}

var nodeGene = {
	type: "hidden",//input,hidden,output
	id: 0,
	x: 0,
	y: 0,
	inputs: null,
	createInputs: function(){
		this.inputs = [];
	},
	assignPos: function(x,y){
		this.x=x;
		this.y=y;
	},
	getSigmoid: function(){
		if(this.type == "input"){
			displaySigTot(this.inputs[0],this.x,this.y);
			return this.inputs[0];
		}
		var sum = 0;
		this.inputs.forEach(function(i){
			sum+=i.getWeightedValue();
		});
		var tot = Math.floor((1/(1+Math.exp(-1*sum)))*1000)/1000;//Calculates Sigmoid and cuts off at 3 decimals
		displaySigTot(tot,this.x,this.y);
		return tot;
	}
}

var organism = {
	connGenes: null,
	nodeGenes: null,
	inputNodes: null,
	output: null,

	init: function(){
		this.connGenes=[];
		this.nodeGenes=[];
		this.inputNodes=[];
	},
	createNewConn: function(i,o){
		var c = Object.create(connGene);
		c.innovNum=globInnovNum;
		globInnovNum++;
		c.in = this.nodeGenes[i-1];
		c.out = this.nodeGenes[o-1];
		c.out.inputs.push(c);
		c.genRandWeight();
		this.connGenes.push(c);
		console.log(this.connGenes);
	},
	createNewNode: function(t){
		var n = Object.create(nodeGene);
		n.type = t;
		n.id = this.nodeGenes.length+1;
		n.createInputs();
		this.nodeGenes.push(n);
		if(t=="input"){
			this.inputNodes.push(n);
		}else if(t=="output"){
			this.output = n;
		}
	},
	runMutations: function(t){
		var r = Math.floor(Math.random()*100)/100;
		if(r<.8){
			if(Math.random()<.1){
				console.log("Randomizing");
				this.connGenes.forEach(function(c){
					console.log(c.weight);
					c.genRandWeight();
				});
			}else{
				console.log("Perturbing");
				var modifier = Math.floor(((Math.random()*(.06))+.97)*100)/100
				this.connGenes.forEach(function(c){
					console.log(c.weight);
					c.weight=Math.floor(c.weight*modifier*100)/100;
				});
			}
		}
	},
	giveInputs: function(sensors){
		for(var i=0;i<this.inputNodes.length;i++){
			this.inputNodes[i].inputs.push(sensors[i]);
		}
		return this.output.getSigmoid();
	},
	testOrganism: function(sensors, expected){
		var output = this.giveInputs(sensors);
		console.log(expected,output);
		return Math.abs(expected-output);
	},
	createBlank: function(numInputs, numOutputs){
		for(var i=0;i<numInputs;i++){
			this.createNewNode("input");
		}
		for(var i=0;i<numOutputs;i++){
			this.createNewNode("output");
		}
	}
}