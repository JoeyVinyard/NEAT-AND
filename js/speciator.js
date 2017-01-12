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
	console.log(ex,ds);
}
//Need to make sure this works
function getNumExcess(g,s){
	var larger = g;
	var max = s.connGenes[s.connGenes.length-1].innovNum;
	if(max>g.connGenes[g.connGenes.length-1].innovNum){
		larger = s;
		max = g.connGenes[g.connGenes.length-1].innovNum;
	}
	var numEx = larger.connGenes.length-larger.connGenes.findIndex(function(x){return x.innovNum>max});
	return numEx;
}
//Need to make sure this works
function getNumDisjoint(g,s){
	var numDis=0;
	var larger = g.innovNums;
	var smaller = s.innovNums;
	if(smaller.length>larger.length){
		larger = s.innovNums;
		smaller = g.innovNums;
	}
	var max = smaller[smaller.length-1];
	for(var i=0;larger[i]<=max;i++){
		if(!smaller.includes(larger[i]))
			numDis++;
	}
	for(var i=0;i<smaller.length;i++){
		if(!larger.includes(smaller[i]))
			numDis++;
	}
	return numDis;
}