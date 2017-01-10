var species = {
	repGenome: null,
	genomes: null,
	init: function(){
		genomes = [];
	},
	calcTotalFitness: function(){
		this.genomes.sort(function(a,b){
			var aFit = a.calcFitness();
			var bFit = b.calcFitness();
			if(aFit<bFit)
				return -1;
			else
				return 1;
		});
		var sum = 0;
		this.genomes.forEach(function(g){
			console.log(g.fitness);
			sum+=g.fitness;
		});
		return sum/this.genomes.length;
	}
}