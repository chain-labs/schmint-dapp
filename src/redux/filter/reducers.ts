import { createReducer } from '@reduxjs/toolkit';

import { addFilter, removeFilter, addSearch } from './actions';
import { FilterState } from './types';

const initialState: FilterState = {
	filterValue: {
		isAZ: false,
		isZA: false,
		isEthereum: false,
		isPolygon:false,
		isHighToLow:false,
		isLowToHigh:false
	},
	searchValue: '',
	clearAll: false
};

export const filterReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(addFilter, (state, action) => {
			state.filterValue = action.payload
			const newState = { ...state };
			return newState;
		})
		.addCase(addSearch, (state,action) => {
			state.searchValue=action.payload
		})
		.addCase(removeFilter, (state) => {
			state.clearAll= true
			state.filterValue=null
		});
});
