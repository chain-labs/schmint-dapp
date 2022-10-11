import { gql } from '@apollo/client';

export const CHECK_FAILED_SCHMINT = gql`
	query CheckFailedSchmint($target: [Bytes!], $owner: Bytes!) {
		schmints(where: { scheduler_: { owner_not: $owner }, target_in: $target, isSchminted: true }) {
			id
			target
			isSchminted
		}
	}
`;
