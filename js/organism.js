var globInnovNum = 1;

var genes = {};

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
		n.type = t;
		this.nodeGenes.push(n);
	}
}