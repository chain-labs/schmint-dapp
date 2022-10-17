import { createReducer } from '@reduxjs/toolkit';
import { disconnect, setApolloClient, setNetwork } from './actions';
import { NetworkState } from './types';

const initialState: NetworkState = {
	isOnline: false,
	chainId: null,
	name: '',
	apolloClient: null,
};

export const networkReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setNetwork, (state, action) => {
			const { chainId, name } = action.payload;
			const newState = {
				...state,
				chainId,
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
