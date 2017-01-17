var specs = [];

var compThresh = 3;
var sizeThresh = 20;

var eCo = 1;
var dCo = 1;
var wCo = 0.4;

function speciate(genomes){
	genomes.forEach(function(g){
		var found = false;
		if(specs.length==0){
			specs.push(Object.create(species));
			specs[specs.length-1].init();
		}
		specs.forEach(function(s){
			if(!found){
				if(s.repGenome == null){
					s.genomes.push(g);
					s.repGenome=g;
					found = true;
				}
				else if(calcCompatibility(g,s.repGenome)){
					console.log("compatible");
					s.genomes.push(g);
					found = true;
				}
			}
		});
		if(!found){
			specs.push(Object.create(species));
			specs[specs.length-1].init();
			specs[specs.length-1].genomes.push(g);
		}
	});
}
function calcCompatibility(g,s){
	if(g.connGenes.length==0&&s.connGenes.length==0)
		return true;
	var n = 1;
	if(g.nodeGenes.length>sizeThresh)
		n=g.nodeGenes.length;
	var ex = getNumExcess(g,s);
	var ds = getNumDisjoint(g,s);
	var w = getWeightDiff(g,s);
	var delta = (eCo*(ex/n))+(dCo*(ds/n))+(wCo*w);
	console.log(ex,ds,w,delta);
	return delta<compThresh;;
}
function getNumExcess(g,s){
	var larger = g.innovNums;
	var max = s.innovNums[s.innovNums.length-1]
	if(max>g.innovNums[g.innovNums.length-1]){
		larger = s.innovNums;
		max = g.innovNums[g.innovNums.length-1];
	}
	console.log(larger,max);
	var numEx = larger.length-1-larger.findIndex(function(n){return n>=max});
	return numEx;
}
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
function getWeightDiff(g,s){
	var a = g.innovNums;
	var b = s.innovNums;
	var numMatching = 0;
	var totDif = 0;
	var match = 0;
	console.log(a,b);
	for(var i=0;i<a.length;i++){
		match = b.findIndex(function(n){return n==a[i]});
		console.log(match);
		if(match!=-1){
			numMatching++;
			totDif+=Math.abs(Math.abs(g.connGenes[i].weight)-Math.abs(s.connGenes[match].weight));
		}
	}
	console.log(totDif,numMatching);
	return totDif/numMatching;
}