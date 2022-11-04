export const indexAddress = (address: string) => {
	try {
		const sectionOfAddressInString = address.slice(4, 6);
		const decimalEquivalent = parseInt(sectionOfAddressInString, 16);
		const index = decimalEquivalent % 4;
		return index + 1;
	} catch (err) {
		console.log('Error in indexing Address', err);

		// CODE: 105
	}
};
