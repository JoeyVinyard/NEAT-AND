var generation = [];
for(var i = 0; i < 150; i++){
	var org = Object.create(organism);
	org.init();
	org.createBlank(2,1);
	org.calcFitness();
	generation.push(org);
}
speciate(generation);
specs.forEach(function(s){
	console.log(s.calcTotalFitness());
});
assignMaxes();
//console.log("done");

var specIt = 0;
var orgIt = 0;
$("#left").click(function(){
	if(--orgIt<0){
		if(--specIt<0)
			specIt = specs.length-1;
		orgIt = specs[specIt].genomes.length-1;
	}
	drawOrg(specs[specIt].genomes[orgIt]);
	$("#org").text("Species: " + (specIt+1) + " | Organism: " + (orgIt+1));
});
$("#right").click(function(){
	if(++orgIt>=specs[specIt].genomes.length){
		if(++specIt>=specs.length)
			specIt = 0;
		orgIt = 0;
	}
	drawOrg(specs[specIt].genomes[orgIt]);
	$("#org").text("Species: " + (specIt+1) + " | Organism: " + (orgIt+1));
});
$("#genbut").click(function(){
	specIt=0;
	orgIt=0;
	runBreeding(specs);
	specs.forEach(function(s){
		s.calcTotalFitness();
	});
	assignMaxes();
});
$("#bestbut").click(function(){
	drawOrg(bestOrg);
});
for(var i=0;i<50;i++){
	console.log(i);
	runBreeding(specs);
	specs.forEach(function(s){
		s.calcTotalFitness();
	});
	assignMaxes();
}