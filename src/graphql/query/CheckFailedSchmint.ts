import { gql } from '@apollo/client';

export const CHECK_FAILED_SCHMINT = gql`
	query CheckFailedSchmint($target: [Bytes!]) {
		schmints(first: 1, where: { target_in: $target, isSchminted: true }) {
			id
			target
			isSchminted
		}
	}
`;
