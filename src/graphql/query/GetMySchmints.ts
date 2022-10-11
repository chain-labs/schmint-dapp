import { gql } from '@apollo/client';

const GET_MY_SCHMINTS = gql`
	query GetMySchmints($userId: Bytes!) {
		schmints(where: { scheduler_: { owner: $userId } }) {
			id
			taskId
			schmintId
			creationTimestamp
			executionTimestamp
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

export default GET_MY_SCHMINTS;
