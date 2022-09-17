import { createReducer } from '@reduxjs/toolkit';

import {  removeFilter, addSearch, filterAlphabetical, filterNetwork, filterPrice } from './actions';
import { FilterState } from './types';

const initialState: FilterState = {
	alphabetical:{
        isAZ:false,
        isZA:false
    },
    network:{
        isEthereum: false,
        isPolygon:false,
    },
    price:{
        isLowToHigh: false,
        isHighToLow: false,
        isFree: false
    },
	search:'',
	clearAll:false
};

export const filterReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(filterAlphabetical, (state, action) => {
			state.alphabetical = action.payload
			const newState = { ...state };
			return newState;
		})
		.addCase(filterNetwork, (state, action) => {
			state.network = action.payload
			const newState = { ...state };
			return newState;
		})
		.addCase(filterPrice, (state, action) => {
			state.price = action.payload
			const newState = { ...state };
			return newState;
		})
		.addCase(addSearch, (state,action) => {
			state.search=action.payload
		})
		.addCase(removeFilter, (state) => {
			state.clearAll= true
			state.alphabetical=null
			state.network=null
			state.price=null
		});
});
