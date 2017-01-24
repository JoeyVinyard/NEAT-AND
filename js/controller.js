var generation = [];
for(var i = 0; i < 20; i++){
	var org = Object.create(organism);
	org.init();
	org.createBlank(2,1);
	generation.push(org);
}
generation[0].createNewConn(1,4);
generation[0].connGenes[generation[0].connGenes.length-1].innovNum = 3;
generation[0].innovNums[generation[0].innovNums.length-1] = 3;
generation[1].createNewConn(1,4);
generation[1].connGenes[generation[1].connGenes.length-1].innovNum = 3;
generation[1].innovNums[generation[1].innovNums.length-1] = 3;
generation[1].createNewConn(4,3);
generation[1].connGenes[generation[1].connGenes.length-1].innovNum = 5;
generation[1].innovNums[generation[1].innovNums.length-1] = 5;
speciate(generation);
//console.log(specs);
specs.forEach(function(s){
	//console.log(s.calcTotalFitness());
});
breed(generation[0],generation[1]);
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



// var org = Object.create(organism);
// org.init();
// org.createBlank(2,1);
// org.createNewNode("hidden");
// org.createNewConn(1,3);
// org.createNewConn(4,3);
// org.createNewConn(1,4);
// org.createNewConn(2,4);
// org.connGenes[0].innovNum = 1;
// org.innovNums.push(1);
// org.connGenes[1].innovNum = 3;
// org.innovNums.push(3);
// org.connGenes[2].innovNum = 4;
// org.innovNums.push(4);
// org.connGenes[3].innovNum = 5;
// org.innovNums.push(5);

// var orgTwo = Object.create(organism);
// orgTwo.init();
// orgTwo.createBlank(2,1);
// orgTwo.createNewConn(2,3);
// orgTwo.createNewConn(1,3);
// orgTwo.connGenes[0].innovNum=1;
// orgTwo.innovNums.push(1);
// orgTwo.connGenes[1].innovNum=5;
// orgTwo.innovNums.push(5);

// //console.log(calcCompatibility(org,orgTwo));