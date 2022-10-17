import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { networkSelector, setApolloClient } from 'src/redux/network';
import { GOERLI_SUBGRAPH_ENDPOINT, MUMBAI_SUBGRAPH_ENDPOINT } from 'src/utils/constants';
import { useNetwork } from 'wagmi';

const getEndpoint = (chainId) => {
	switch (chainId) {
		case 5:
			return GOERLI_SUBGRAPH_ENDPOINT;
		case 80001:
			return MUMBAI_SUBGRAPH_ENDPOINT;
		default:
			return GOERLI_SUBGRAPH_ENDPOINT;
	}
};

const ApolloClientProvider = ({ children }) => {
	const dispatch = useAppDispatch();
	const network = useAppSelector(networkSelector);
	const [client, setClient] = React.useState(
		new ApolloClient({
			uri: getEndpoint(5),
			cache: new InMemoryCache(),
		})
	);

	useEffect(() => {
		if (network.isOnline) {
			const ENDPOINT = getEndpoint(network.chainId);
			const client = new ApolloClient({
				uri: ENDPOINT,
				cache: new InMemoryCache(),
			});
			dispatch(setApolloClient({ apolloClient: client }));
			setClient(client);
		}
	}, [network.chainId]);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
