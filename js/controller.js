var generation = [];

for(var i = 0; i < 20; i++){
	var org = Object.create(organism);
	org.init();
	org.createBlank(2,1);
	generation.push(org);
}
speciate(generation);
console.log(specs);
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

// console.log(calcCompatibility(org,orgTwo));