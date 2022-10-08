import React, { useEffect } from 'react';
import theme from 'src/styleguide/theme';
import Box from '../Box';
import Loader from '../Loader';
import Modal from '../Modal';
import Text from '../Text';

interface props {
	step?: number;
	setStep?: (step: number) => void;
}
const ConfirmModal = ({ setStep, step }: props) => {
	return (
		<Modal visible>
			<Box
				width="33.2rem"
				p="mm"
				position="absolute"
				backgroundColor="white"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				borderRadius="8px"
				column
				border={`1px solid ${theme.colors['blue-20']}`}
			>
				<Loader minHeight="100%" />
				<Text textAlign="center" as="h5" mt="mm">
					Confirming Transaction
				</Text>
				<Text textAlign="center" as="b2" mt="mxs" color="gray-50">
					Please validate the transaction from your connected wallet.
				</Text>
			</Box>
		</Modal>
	);
};

export default ConfirmModal;
