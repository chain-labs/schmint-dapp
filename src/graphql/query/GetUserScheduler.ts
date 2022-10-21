import { gql } from '@apollo/client';

export const GET_USER_SCHEDULER = gql`
	query GetUserScheduler($id: ID!) {
		schedulers(where: { owner: $id }) {
			address
			fundsTransferedToSafeViaScheduler
			id
			owner
			safe
			schmints {
				schmintId
				status
				target
				taskId
				value
				isSchminted
				isCancelled
				id
				gasPriceLimit
				data
				executionTimestamp
			}
		}
	}
`;
