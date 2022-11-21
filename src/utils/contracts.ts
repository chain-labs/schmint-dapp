export const CONTRACTS_LIST = {
	SCHEDULER: 'Scheduler',
	SCHEDULER_FACTORY: 'SchedulerFactory',
	RESOLVER: 'Resolver',
	DEFAULT: 'DefaultCallbackHandler',
};

export const CHAIN_IDS = {
	4: 'rinkeby',
	5: 'goerli',
	80001: 'mumbai',
};

type ContractOptions = keyof typeof CONTRACTS_LIST;

import Contracts from 'src/contracts.json';

export const getAbi = (chainId: number, name: ContractOptions) => {
	try {
		const contractName = CONTRACTS_LIST[name];
		const abi = Contracts?.[chainId ?? 4]?.[0]?.['contracts']?.[contractName]?.['abi'];
		return abi;
	} catch (err) {
		console.log("Error getting contract's ABI"); // eslint-disable-line no-console

		//CODE: 138
	}
};

export const getContractAddress = (chainId: number, name: ContractOptions): string => {
	try {
		const contractName = CONTRACTS_LIST[name];
		const address = Contracts?.[chainId ?? 4]?.[0]?.['contracts']?.[contractName]?.['address'];
		return address;
	} catch (err) {
		console.log("Error getting contract's address"); // eslint-disable-line no-console

		//CODE: 139
	}
};
