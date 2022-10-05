export const getABIType = (abi) => {
	const inputs = abi?.[0]?.inputs;
	if (inputs?.length === 2) {
		if (inputs[0].type === 'address' && inputs[1].type === 'uint256') {
			return 1;
		}
	}
	return 0;
};
