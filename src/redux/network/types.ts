import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export interface NetworkState {
	isOnline?: boolean;
	chainId?: number;
	name?: string;
	apolloClient?: ApolloClient<NormalizedCacheObject>;
}
