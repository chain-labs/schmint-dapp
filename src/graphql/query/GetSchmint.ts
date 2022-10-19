import { gql } from '@apollo/client';

const GET_SCHMINT = gql`
	query GetSchmint($id: ID!) {
		schmint(id: $id) {
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
			scheduler {
				owner
			}
		}
	}
`;

export default GET_SCHMINT;
