import { ethers } from 'ethers';

export const getABIType = (abi) => {
	const inputs = abi?.[0]?.inputs;
	if (inputs?.length === 4) {
		if (inputs[3].type === 'uint256') {
			return 4;
		}
	}
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

export const getBuyTx = async (collection, TargetInstance, userAddress, nft, provider) => {
	let buyTx;
	switch (getABIType(collection.abi)) {
		case 1: {
			buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](userAddress, nft, {
				value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
			});
			break;
		}
		case 2: {
			buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](nft, userAddress, {
				value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
			});
			break;
		}
		case 3: {
			buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](nft, {
				value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
			});
			break;
		}
		case 4: {
			const SeaDropInstance = new ethers.Contract(seaDrop, collection.abi, provider);

			buyTx = await SeaDropInstance?.populateTransaction?.[collection.abi?.[0]?.name](
				nftContract,
				feeReceipient,
				ethers.constants.AddressZero,
				nft,
				{
					value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
				}
			);
			break;
		}
	}
	return buyTx;
};

export const getDefaultEstimatedGas = (id) => {
	switch (id) {
		case 1:
			return 0.02;
		case 137:
		default:
			return 0.04;
	}
};

export const feeReceipient = '0x0000a26b00c1F0DF003000390027140000fAa719';
export const nftContract = '0x02c92AAEAcad1CAe8f5223f96866b9938C11DA6f';
export const seaDrop = '0x00005EA00Ac477B1030CE78506496e8C2dE24bf5';
