var species = {
	repGenome: null,
	genomes: null,
	totalFitness: 0,
	init: function(){
		genomes = [];
	},
	calcTotalFitness: function(){
		this.genomes.forEach(function(g){
			this.totalFitness+=g.calcFitness();
		});
	}
}