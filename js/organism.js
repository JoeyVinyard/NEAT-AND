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
	connGenes: {},
	nodeGenes: {},

	function: createNewConn(i,o){
		var c = Object.create(connGene);
		c.innovNum=globInnovNum;
		globInnovNum++;
		c.in = nodeGenes[i-1];
		c.out = nodeGenes[i-1];
		connGenes.push(c);
	},
	function: createNewNode(t){
		var n = Object.create(nodeGene);
		n.type = t;
		nodeGenes.push(n);
	}
}