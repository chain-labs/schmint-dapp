export const chains = [
	{
		name: 'Ethereum Mainnet',
		chainId: 1,
		shortName: 'eth',
		networkId: 1,
		nativeCurrency: {
			name: 'Ether',
			symbol: 'ETH',
			decimals: 18,
		},
		rpc: [
			'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
			'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
			'https://api.mycryptoapi.com/eth',
			'https://cloudflare-eth.com',
		],
		faucets: [],
		infoURL: 'https://ethereum.org',
	},
	{
		name: 'Rinkeby',
		chainId: 4,
		shortName: 'rin',
		networkId: 4,
		nativeCurrency: {
			name: 'Rinkeby Ether',
			symbol: 'ETH',
			decimals: 18,
		},
		rpc: ['https://rinkeby.infura.io/v3/${INFURA_API_KEY}', 'wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}'],
		faucets: ['http://fauceth.komputing.org?chain=4&address=${ADDRESS}', 'https://faucet.rinkeby.io'],
		infoURL: 'https://www.rinkeby.io',
	},
	{
		name: 'Görli',
		chainId: 5,
		shortName: 'gor',
		networkId: 5,
		nativeCurrency: {
			name: 'Görli Ether',
			symbol: 'ETH',
			decimals: 18,
		},
		rpc: [
			'https://goerli.infura.io/v3/${INFURA_API_KEY}',
			'wss://goerli.infura.io/v3/${INFURA_API_KEY}',
			'https://rpc.goerli.mudit.blog/',
		],
		faucets: [
			'http://fauceth.komputing.org?chain=5&address=${ADDRESS}',
			'https://goerli-faucet.slock.it?address=${ADDRESS}',
			'https://faucet.goerli.mudit.blog',
		],
		infoURL: 'https://goerli.net/#about',
	},
	{
		name: 'Mumbai',
		chainId: 80001,
		shortName: 'maticmum',
		networkId: 80001,
		nativeCurrency: {
			name: 'MATIC',
			symbol: 'MATIC',
			decimals: 18,
		},
		rpc: [
			'https://matic-mumbai.chainstacklabs.com',
			'https://rpc-mumbai.maticvigil.com',
			'https://matic-testnet-archive-rpc.bwarelabs.com',
		],
		faucets: ['https://faucet.polygon.technology/'],
		infoURL: 'https://polygon.technology/',
	},
	{
		name: 'Polygon Mainnet',
		chainId: 137,
		shortName: 'matic',
		networkId: 137,
		nativeCurrency: {
			name: 'MATIC',
			symbol: 'MATIC',
			decimals: 18,
		},
		rpc: [
			'https://polygon-rpc.com/',
			'https://rpc-mainnet.matic.network',
			'https://matic-mainnet.chainstacklabs.com',
			'https://rpc-mainnet.maticvigil.com',
			'https://rpc-mainnet.matic.quiknode.pro',
			'https://matic-mainnet-full-rpc.bwarelabs.com',
		],
		faucets: [],
		infoURL: 'https://polygon.technology/',
	},
];

export const getNetworkByShortName = (shortName: string) => {
	return chains.find((network) => network.shortName === shortName);
};

export const getSymbolByShortName = (shortName: string) => {
	const network = getNetworkByShortName(shortName);
	return network ? network.nativeCurrency.symbol : 'ETH';
};

export const getShortNameByChainId = (chainId: number) => {
	const network = chains.find((network) => network.chainId === chainId);
	return network ? network.shortName : 'eth';
};

export const getNetworkByChainId = (chainId: number) => {
	return chains.find((network) => network.chainId === chainId);
};

export const getUnitByChainId = (chainId: number) => {
	const network = getNetworkByChainId(chainId);
	return network ? network.nativeCurrency.symbol : 'ETH';
};
