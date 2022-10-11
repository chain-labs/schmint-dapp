import InputDataDecoder from 'ethereum-input-data-decoder';
import { ethers } from 'ethers';
import { getABIType } from '../project-page/utils';

export const getSchmintQuantity = (abi: any, data: string) => {
	switch (getABIType(abi)) {
		case 1: {
			const decoder = new InputDataDecoder(abi);
			const res = decoder.decodeData(data);
			const quantity = parseInt(res.inputs[1]);
			return quantity;
		}
	}
};
