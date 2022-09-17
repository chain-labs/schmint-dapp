export interface FilterState {
	alphabetical: {
		isAZ: boolean;
		isZA: boolean;
	};
	network: {
		isEthereum: boolean;
		isPolygon: boolean;
	};
	price: {
		isLowToHigh: boolean;
		isHighToLow: boolean;
		isFree: boolean;
	};
	search?: string;
	clearAll?: boolean;
}
