export const getNetworkShortName = (chain) => {
	switch (chain) {
		case 1:
			return 'eth';
		case 4:
			return 'rin';
		case 5:
			return 'gor';
	}
};

export const getGnosisSafeUrl = (chain: number, avatar: string): string => {
	const networkShortName = getNetworkShortName(chain);
	return `https://gnosis-safe.io/app/${networkShortName}:${avatar}/balances/nfts`;
};
