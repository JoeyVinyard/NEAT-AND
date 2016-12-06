var inputNodes={};
var hiddenNodes={};

var hiddenNode = {
	id: 0,
	inovNum: 0,
	inputSyn: {},

	genID(){
		var lastID = 0;
		try{
			lastID = hiddenNodes[hiddenNodes.length-1].id;
		}catch(e){}
		do{
			var id = Math.floor(Math.random()*(9999-1111)+1111);
		}while(id==lastID);
		this.id = id;
	},
	summateSynapses: function(){
		var tot=0;
		for(syn in inputSyn){
			tot+=syn.getWeightedValue();
		}
		return tot;
	},
	sigmoid: function(){
		return 1/(1+Math.exp(t/summateSynapses()));
	},
	getNodeValue: function(){
		return sigmoid();
	}
}

var synapse = {
	inovNum: 0,
	inputNode: null,
	weight: 1,

	getWeightedValue: function(){
		return inputNode.getNodeValue*weight;
	}
}