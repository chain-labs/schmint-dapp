import { createReducer } from '@reduxjs/toolkit';
import { TEST_ENV } from 'src/constants';
import { disconnect, setApolloClient, setNetwork } from './actions';
import { NetworkState } from './types';

const initialState: NetworkState = {
	isOnline: false,
	isValid: false,
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
				isValid: checkValidNetwork(chainId),
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

const checkValidNetwork = (chainId: number): boolean => {
	if (TEST_ENV) {
		switch (chainId) {
			case 5:
			case 80001:
				return true;
			default:
				return false;
		}
	} else {
		switch (chainId) {
			case 137:
				return true;
			default:
				return false;
		}
	}
};
