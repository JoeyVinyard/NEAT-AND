var specs = [];

var compThresh = 3;
var sizeThresh = 20;

var eCo = 1;
var dCo = 1;
var wCo = 0.4;

function speciate(genomes){
	genomes.forEach(function(g){
		if(specs.length==0){
			specs.push(Object.create(species));
		}
		specs.forEach(function(s){
			if(s.repGenome == null){
				s.genomes.push(g);
				break;
			}
			else if(calcCompatibility(g,s.repGenome)){
				s.genomes.push(g);
				break;
			}
		});
	});
}
function calcCompatibility(g,s){
	var ex = getNumExcess(g,s);
	var ds = getNumDisjoint(g,s);
}
function getNumExcess(g,s){
	var larger = g
	var max = g.connGenes[g.connGenes.length-1].innovNum;
	if(max>s.connGenes[s.connGenes.length-1].innovNum){
		larger = s;
		max = s.connGenes[s.connGenes.length-1].innovNum;
	}
	var numEx = larger.connGenes.findIndex(function(x){x.innovNum>max});
}