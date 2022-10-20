import { createReducer } from '@reduxjs/toolkit';
import { disconnect, setApolloClient, setNetwork } from './actions';
import { NetworkState } from './types';

const initialState: NetworkState = {
	isOnline: false,
	chainId: null,
	name: '',
	unit: '',
	apolloClient: null,
};

export const networkReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setNetwork, (state, action) => {
			const { chainId, name } = action.payload;
			const newState = {
				...state,
				chainId,
				unit: getUnit(chainId),
				isOnline: true,
				name,
			};
			return newState;
		})
		.addCase(setApolloClient, (state, action) => {
			const { apolloClient } = action.payload;
			const newState = {
				...state,
				apolloClient,
			};
			return newState;
		})
		.addCase(disconnect, () => {
			return initialState;
		});
});

const getUnit = (chainId: number): string => {
	switch (chainId) {
		case 1:
		case 4:
		case 5:
			return 'ETH';
		case 137:
		case 80001:
			return 'MATIC';
	}
};
