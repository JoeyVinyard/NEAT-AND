var species = {
	repGenome: null,
	genomes: null,
	init: function(){
		this.genomes = [];
	},
	calcTotalFitness: function(){
		var sum = 0;
		this.genomes.forEach(function(g){
			var inputs = getRandomCase();
			sum+=g.calcFitness(inputs, inputs[0]^inputs[1]);
		});
		this.genomes.sort(function(a,b){
			if(a.fitness<b.fitness)
				return -1;
			else
				return 1;
		});
		console.log(this.genomes);
		return sum/this.genomes.length;
	}
}