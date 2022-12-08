import InputDataDecoder from 'ethereum-input-data-decoder';
import { sendLog } from 'src/utils/logging';
import { getABIType } from '../project-page/utils';

export const getSchmintQuantity = (abi: any, data: string) => {
	try {
		const decoder = new InputDataDecoder(abi);
		const res = decoder.decodeData(data);
		switch (getABIType(abi)) {
			case 1: {
				return parseInt(res.inputs[1]);
			}
			case 2: {
				return parseInt(res.inputs[0]);
			}
			case 3: {
				return parseInt(res.inputs[0]);
			}
			case 4: {
				return parseInt(res.inputs[3]);
			}
		}
	} catch (err) {
		console.log('Error in getting schmint quantity', { err, abi, data, abiType: getABIType(abi) }); // eslint-disable-line no-console
		// CODE: 134
		sendLog(134, err);
	}
};
