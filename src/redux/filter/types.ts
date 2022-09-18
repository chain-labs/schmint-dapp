export interface FilterState {
	alphabetical?: IFilterAlphabetical;
	network?: IFilterNetwork;
	price?: IFilterPrice;
	search?: ISearch;
	clearAll?: boolean;
}

export interface IFilterAlphabetical {
	isAZ: boolean;
	isZA: boolean;
}

export interface IFilterNetwork {
	isEthereum: boolean;
	isPolygon: boolean;
}

export interface IFilterPrice {
	isLowToHigh: boolean;
	isHighToLow: boolean;
	isFree: boolean;
}

export interface ISearch {
	query?: string;
	count?: number;
}
