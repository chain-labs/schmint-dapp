import { CheckCircle, Warning, XCircle } from 'phosphor-react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

const TileBadge = ({ type }: { type: 'action_required' | 'succesful' | 'failed' }) => {
	const getBgColor = () => {
		switch (type) {
			case 'action_required':
				return 'yellow-30';
			case 'succesful':
				return 'green-20';
			case 'failed':
				return 'red-20';
		}
	};

	const getIcon = () => {
		switch (type) {
			case 'action_required':
				return <Warning size={16} weight="fill" />;
			case 'succesful':
				return <CheckCircle size={16} weight="fill" />;
			case 'failed':
				return <XCircle size={16} weight="fill" />;
		}
	};

	const getText = () => {
		switch (type) {
			case 'action_required':
				return 'Action Required';
			case 'succesful':
				return 'Successful';
			case 'failed':
				return 'Failed';
		}
	};

	const getColor = () => {
		switch (type) {
			case 'action_required':
				return 'simply-black';
			case 'succesful':
				return 'green-60';
			case 'failed':
				return 'red-40';
		}
	};
	return (
		<Box
			position="absolute"
			top="0"
			right="0"
			boxShadow={type === 'action_required' ? 'shadow-200' : 'none'}
			bg={getBgColor()}
			borderRadius="8px"
			px="ms"
			py="mxs"
			row
			alignItems="center"
			color={getColor()}
		>
			{getIcon()}
			<Text as="c2" ml="mxxs">
				{getText()}
			</Text>
		</Box>
	);
};

export default TileBadge;
