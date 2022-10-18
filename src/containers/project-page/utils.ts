export const getABIType = (abi) => {
	const inputs = abi?.[0]?.inputs;
	if (inputs?.length === 2) {
		if (inputs[0].type === 'address' && inputs[1].type === 'uint256') {
			return 1;
		} else if (inputs[1].type === 'address' && inputs[0].type === 'uint256') {
			return 2;
		}
	} else if (inputs?.length === 1) {
		if (inputs[0].type === 'uint256') {
			return 3;
		}
	}
	return 0;
};
