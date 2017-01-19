function breed(m,f){
	var fit = m;
	var lfit = f;
	if(m.calcFitness()<f.calcFitness()){
		fit=f;
		lfit=m;
	}
}