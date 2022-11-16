import { sendLog } from 'src/utils/logging';

export const indexAddress = (address: string) => {
	try {
		const sectionOfAddressInString = address.slice(4, 6);
		const decimalEquivalent = parseInt(sectionOfAddressInString, 16);
		const index = decimalEquivalent % 4;
		return index + 1;
	} catch (err) {
		console.log('Error in indexing Address', err); // eslint-disable-line no-console

		// CODE: 105
		sendLog(105, err);
	}
};
