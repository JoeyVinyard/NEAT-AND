function summateSynapses(inputSyn){
	var tot=0;
	for(syn in inputSyn){
		tot+=syn.getWeightedValue();
	}
	return tot;
function sigmoid(){
	return 1/(1+Math.exp(-1*summateSynapses()));
}
function getNodeValue(){
	return sigmoid();
}
function getWeightedValue(){
	return inputNode.getNodeValue*weight;
}