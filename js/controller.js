var generation = [];
var bestOrgOverall;
for(var i = 0; i < 150; i++){
	var org = Object.create(organism);
	org.init();
	org.createBlank(2,1);
	org.calcFitness();
	generation.push(org);
}
globInnovNum+=2;
speciate(generation);
specs.forEach(function(s){
	console.log(s.calcTotalFitness());
});
assignMaxes();
//console.log(specs);
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
	gen();
});
$("#toggleGen").click(function(){
	keepGen=!keepGen;
	if(keepGen)
		gen();
})
$("#bestbut00").click(function(){
	drawOrg(bestOrgOverall,[0,0]);
});
$("#bestbut01").click(function(){
	drawOrg(bestOrgOverall,[0,1]);
});
$("#bestbut10").click(function(){
	drawOrg(bestOrgOverall,[1,0]);
});
$("#bestbut11").click(function(){
	drawOrg(bestOrgOverall,[1,1]);
});

var keepGen = false;

var gen = function(){
	specIt=0;
	orgIt=0;
	runBreeding(specs);
	specs.forEach(function(s){
		s.calcTotalFitness();
	});
	assignMaxes();
	if(bestOrgOverall==null||bestOrgOverall.fitness<bestOrg.fitness){
		console.log("\n\n\nNEWBEST\n\n");
		stagNum=0;
		bestOrgOverall=bestOrg;
	}
	stagNum++;
	console.log("BOO:",bestOrgOverall.fitness, "BO:",bestOrg.fitness);
	if(keepGen)
		window.setTimeout(gen, 50);
}