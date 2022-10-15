import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useEffect } from 'react';
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
	const { chain } = useNetwork();
	const [client, setClient] = React.useState(
		new ApolloClient({
			uri: getEndpoint(5),
			cache: new InMemoryCache(),
		})
	);

	useEffect(() => {
		if (chain) {
			const ENDPOINT = getEndpoint(chain?.id);
			const client = new ApolloClient({
				uri: ENDPOINT,
				cache: new InMemoryCache(),
			});
			setClient(client);
		}
	}, [chain]);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
