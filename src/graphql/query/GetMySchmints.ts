import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import {
	GOERLI_SUBGRAPH_ENDPOINT,
	MAINNET_SUBGRAPH_ENDPOINT,
	MUMBAI_SUBGRAPH_ENDPOINT,
	POLYGON_SUBGRAPH_ENDPOINT,
	TEST_ENV,
} from 'src/utils/constants';
import { sendLog } from 'src/utils/logging';

const GET_MY_SCHMINTS = gql`
	query GetMySchmints($userId: Bytes!) {
		schmints(where: { scheduler_: { owner: $userId } }) {
			id
			taskId
			schmintId
			creationTimestamp
			executionTimestamp
			executionTrxHash
			executionGasPrice
			cancelledTimestamp
			isCancelled
			isSchminted
			status
			gasPriceLimit
			value
			data
			target
		}
	}
`;

export { GET_MY_SCHMINTS };

export const getMySchmints = async (userId: string) => {
	const ETH_URI = TEST_ENV ? GOERLI_SUBGRAPH_ENDPOINT : MAINNET_SUBGRAPH_ENDPOINT;
	const MATIC_URI = TEST_ENV ? MUMBAI_SUBGRAPH_ENDPOINT : POLYGON_SUBGRAPH_ENDPOINT;

	const MY_SCHMINTS = [];

	if (ETH_URI) {
		try {
			const eth_client = new ApolloClient({ uri: ETH_URI, cache: new InMemoryCache() });
			const eth_result = await eth_client.query({
				query: GET_MY_SCHMINTS,
				variables: { userId },
			});
			MY_SCHMINTS.push(...eth_result.data.schmints);
		} catch (error) {
			console.log("Error loading user's schmints", error); // eslint-disable-line no-console

			// 		// CODE: 127
			sendLog(127, error, { ETH_URI });
		}
	}
	if (MATIC_URI) {
		try {
			const matic_client = new ApolloClient({ uri: MATIC_URI, cache: new InMemoryCache() });
			const matic_result = await matic_client.query({
				query: GET_MY_SCHMINTS,
				variables: { userId },
			});
			MY_SCHMINTS.push(...matic_result.data.schmints);
		} catch (error) {
			console.log("Error loading user's schmints", error); // eslint-disable-line no-console

			// 		// CODE: 127
			sendLog(127, error, MATIC_URI);
		}
	}
	return MY_SCHMINTS;
};
