import { gql } from '@apollo/client';

export const GET_USER_SCHEDULER = gql`
	query GetUserScheduler($id: ID!) {
		schedulers(where: { owner: $id }) {
			id
			owner
		}
	}
`;
