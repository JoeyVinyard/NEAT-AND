function breed(m,f){
	var child = Object.create(organism);
	child.init();
	child.createBlank(2,1);
	var fit = f;
	var lfit = m;
	if(m.calcFitness(getRandomCase())<f.calcFitness(getRandomCase())){
		fit=f;
		lfit=m;
	}
	console.log(fit,lfit);
	var matching = [];
	fit.innovNums.forEach(function(n,i){
		if(lfit.innovNums.includes(n)){
			matching.push(fit.connGenes[i]);
		}
	});
	fit.connGenes.forEach(function(c,i){
		if(matching.includes(c)){
			if(Math.random()<.75)
				child.createOldConn(c);
			else
				child.createOldConn(lfit.connGenes.find(function(c){return c.innovNum == fit.innovNums[i]}));
		}else{
			child.createOldConn(c);
		}
	});
	child.runMutations();
	drawOrg(child);
}