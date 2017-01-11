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
	var larger = g
	var max = s.connGenes[s.connGenes.length-1].innovNum;
	if(max<s.connGenes[s.connGenes.length-1].innovNum){
		larger = s;
		max = g.connGenes[g.connGenes.length-1].innovNum;
		console.log("yo",max);
	}
	console.log(larger);
	console.log(larger.connGenes.findIndex(function(x){
		console.log("h",x.innovNum,max);
		return x.innovNum>max;
	}));
	var numEx = larger.length-larger.connGenes.findIndex(function(x){x.innovNum>max});
	return numEx;
}
//Need to make sure this works
function getNumDisjoint(g,s){
	var numDis=0;
	var larger = g
	var max = g.connGenes[g.connGenes.length-1].innovNum;
	if(max>s.connGenes[s.connGenes.length-1].innovNum){
		larger = s;
		max = s.connGenes[s.connGenes.length-1].innovNum;
	}
	for(var i=0;larger[i]<=max;i++){
		if(!g.includes(s[i])||!s.includes(g[i]))
			numDis++;
	}
	return numDis;
}