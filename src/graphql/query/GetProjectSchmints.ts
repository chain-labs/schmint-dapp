import { gql } from '@apollo/client';

export const GET_PROJECT_SCHMINTS = gql`
	query GetProjectSchmints($target: Bytes!) {
		schmints(where: { target: $target }) {
			id
		}
	}
`;
