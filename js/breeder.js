function runBreeding(species){
	var newGenomes = [];
	species.forEach(function(s){
		s.repGenome = s.genomes[Math.floor(Math.random()*s.genomes.length)];
		s.genomes.splice(s.genomes.length/2+1);
		for(var i=0;i<s.genomes.length;i++){
			newGenomes.push(s.genomes[i]);
		}
		for(var i=0;i<s.maxSize/2;i++){
			newGenomes.push(breed(s.genomes[Math.floor(Math.random()*s.genomes.length)],s.genomes[Math.floor(Math.random()*s.genomes.length)]));
		}
		s.genomes = [];
	});
	speciate(newGenomes);
}
function breed(m,f){
	var child = Object.create(organism);
	child.init();
	child.createBlank(2,1);
	var fit = f;
	var lfit = m;
	if(m.fitness<f.fitness){
		fit=f;
		lfit=m;
	}
	var matching = [];
	fit.innovNums.forEach(function(n,i){
		if(lfit.innovNums.includes(n)){
			matching.push(fit.connGenes[i]);
		}
	});
	fit.connGenes.forEach(function(c,i){
		if(matching.includes(c)){
			if(Math.random()<.5)
				child.createOldConn(c);
			else{
				//console.log("Input num is:",i,fit);
				child.createOldConn(lfit.connGenes.find(function(c){return c.innovNum == fit.innovNums[i]}));
			}
		}else{
			child.createOldConn(c);
		}
	});
	child.runMutations();
	child.calcFitness();
	return child;
}