import React from 'react';
import CostComp from 'src/containers/project-page/components/CostComp';
import Box from '../Box';
import ButtonComp from '../Button';
import Modal from '../Modal';
import Text from '../Text';
import theme from 'src/styleguide/theme';

interface props {
	collection: any;
	updateDetails?: boolean;
	setStep?: (step: number) => void;
	success?: {
		delete: boolean;
		update: boolean;
	};
}

const UpdateModal = ({ collection, updateDetails, setStep }: props) => {
	return (
		<Modal visible>
			<Box
				width="33.8rem"
				backgroundColor="white"
				p="1.6rem"
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				borderRadius="8px"
			>
				<Text as="h5">Schmint update</Text>
				<CostComp collection={collection} nft={2} />
				<Text as="b3" color="gray-50" mt="mxxxl" ml="mxxs">
					Note: The transaction will take place as soon as the collection sale goes live.
				</Text>
				<Text as="c1" mt="mxxxl" ml="mxxs" color="gray-50">
					<Box as="span" color="red-40">
						EST. TRANSACTION COST :
					</Box>{' '}
					0.0001 ETH or 1 USD.
				</Text>
				<Box row justifyContent="space-around" mt="mm">
					<ButtonComp
						color="gray-60"
						width="14.5rem"
						height="4.8rem"
						borderRadius="64px"
						border={`1px solid ${theme.colors['gray-60']}`}
					>
						<Text as="btn2">Cancel</Text>
					</ButtonComp>
					<ButtonComp
						bg="primary"
						color="white"
						width="14.5rem"
						height="4.8rem"
						borderRadius="64px"
						onClick={() => setStep(1)}
					>
						<Text as="btn2">{updateDetails ? 'Update' : 'Save Changes'}</Text>
					</ButtonComp>
				</Box>
			</Box>
		</Modal>
	);
};

export default UpdateModal;
