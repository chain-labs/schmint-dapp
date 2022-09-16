export const indexAddress = (address: string) => {
	const sectionOfAddressInString = address.slice(4, 6);
	const decimalEquivalent = parseInt(sectionOfAddressInString, 16);
	const index = decimalEquivalent % 4;
	return index + 1;
};
