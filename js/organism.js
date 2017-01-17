var globInnovNum = 1;

var connGene = {
	innovNum: 0,
	in: null,
	out: null,
	weight: 5,
	species: 0,
	disabled: false,

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
			if(!i.disabled){
				sum+=i.getWeightedValue();
			}
		});
		var tot = Math.floor((1/(1+Math.exp(-1*sum)))*1000)/1000;//Calculates Sigmoid and cuts off at 3 decimals
		displaySigTot(tot,this.x,this.y);
		return tot;
	}
}

var organism = {
	connGenes: null,
	nodeGenes: null,
	innovNums: [],
	inputs: null,
	hiddens: null,
	outputs: null,
	fitness: 0,

	init: function(){
		this.connGenes=[];
		this.nodeGenes=[];
		this.innovNums=[];
		this.inputs=[];
		this.hiddens=[];
		this.outputs=[];
	},
	createNewConn: function(i,o){
		this.nodeGenes[o-1].inputs.forEach(function(n){
			if(n.in.id==i){
				return;
			}
		});
		var c = Object.create(connGene);
		c.innovNum=globInnovNum;//Make sure to add back incrementing
		c.in = this.nodeGenes[i-1];
		c.out = this.nodeGenes[o-1];
		c.out.inputs.push(c);
		c.genRandWeight();
//		this.innovNums.push(c.innovNum);
		this.connGenes.push(c);
	},
	//@TODO: Make sure that the anti duplicate works
	createNewNode: function(t){
		var n = Object.create(nodeGene);
		n.type = t;
		n.id = this.nodeGenes.length+1;
		n.createInputs();
		this.nodeGenes.push(n);
		if(t=="input"){
			this.inputs.push(n);
		}else if(t=="hidden"){
			this.hiddens.push(n);
		}else if(t=="output"){
			this.outputs.push(n);
		}
	},
	generateNewConn: function(){
		var input;
		var output;
		if(Math.random()>=.5){
			input = this.inputs[Math.floor(Math.random()*this.inputs.length)];
		}else{
			input = this.hiddens[Math.floor(Math.random()*this.hiddens.length)];
		}
		if(Math.random()>=.5){
			output = this.outputs[Math.floor(Math.random()*this.outputs.length)];
		}else{
			output = this.hiddens[Math.floor(Math.random()*this.hiddens.length)];
		}
		if(input==undefined||output==undefined){
			return;
		}
		this.createNewConn(input.id,output.id);
	},
	generateNewNode: function(){
		var c = this.connGenes[Math.floor(Math.random()*this.connGenes.length)];
		this.createNewNode("hidden");
		c.disabled=true;
		this.createNewConn(c.in.id,this.hiddens[this.hiddens.length-1].id);
		this.createNewConn(this.hiddens[this.hiddens.length-1].id,c.out.id);
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
		if(r<=.05){
			console.log("new conn");
			this.generateNewConn();
		}
		if(r<=.03){
			console.log("new node");
			this.generateNewNode();
		}
	},
	//Needs to be rewritten for broader application
	giveInputs: function(sensors){
		for(var i=0;i<this.inputs.length;i++){
			this.inputs[i].inputs.push(sensors[i]);
		}
		return this.outputs[0].getSigmoid();
	},
	calcFitness: function(sensors, expected){
		var output = this.giveInputs(sensors);
		console.log(expected,output);
		this.fitness = 1/Math.abs(expected-output);
		return this.fitness;
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