import { createReducer } from '@reduxjs/toolkit';

import { removeFilter, addSearch, filterAlphabetical, filterNetwork, filterPrice } from './actions';
import { FilterState } from './types';

export const initialState: FilterState = {
	alphabetical: {
		isAZ: false,
		isZA: false,
	},
	network: {
		isEthereum: false,
		isPolygon: false,
	},
	price: {
		isLowToHigh: false,
		isHighToLow: false,
		isFree: false,
	},
	search: {
		query: '',
		count: 0,
	},
	clearAll: true,
};

export const checkClearedFilters = (filterState: FilterState) => {
	const { alphabetical, network, price } = filterState;
	if (!alphabetical.isAZ && !alphabetical.isZA) {
		if (!network.isEthereum && !network.isPolygon) {
			if (!price.isFree && !price.isLowToHigh && !price.isHighToLow) {
				return true;
			}
		}
	}
	return false;
};

export const filterReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(filterAlphabetical, (state, action) => {
			state.alphabetical = action.payload;
			state.price = {
				isFree: state.price.isFree,
				isLowToHigh: false,
				isHighToLow: false,
			};
			state.clearAll = checkClearedFilters(state);
			return state;
		})
		.addCase(filterNetwork, (state, action) => {
			state.network = action.payload;
			state.clearAll = checkClearedFilters(state);
			return state;
		})
		.addCase(filterPrice, (state, action) => {
			state.price = action.payload;
			if (action.payload.isHighToLow || action.payload.isLowToHigh) {
				state.alphabetical = initialState.alphabetical;
			}
			state.clearAll = checkClearedFilters(state);
			return state;
		})
		.addCase(addSearch, (state, action) => {
			state.search = action.payload;
			return state;
		})
		.addCase(removeFilter, (state) => {
			return { ...initialState, search: state.search };
		});
});
