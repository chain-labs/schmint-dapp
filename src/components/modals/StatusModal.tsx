import React from 'react';
import theme from 'src/styleguide/theme';
import Box from '../Box';
import ButtonComp from '../Button';
import If from '../If';
import Modal from '../Modal';
import Text from '../Text';

interface props {
	setStep?: (step: number) => void;
	success?: boolean;
}
const StatusModal = ({ setStep, success }: props) => {
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
				column
			>
				<Text as="h5" center>
					{success ? 'Schmint Details Updated.' : 'Transaction Unsuccessful'}
				</Text>
				<Text textAlign="center" as="b2" mt="mxs">
					{success
						? 'Successfully updated the Schmint Details.'
						: 'The transaction could not be validated or was cancelled from the wallet.'}
				</Text>

				{success ? (
					<Text as="c1" mt="ms" ml="mxxs" color="gray-50" px="wm" column center>
						<Box as="span" color="red-40">
							FINAL TRANSACTION COST :
						</Box>{' '}
						0.0001 ETH or 1 USD.
					</Text>
				) : (
					''
				)}

				<Box row justifyContent="space-between" mt="mxl">
					<If
						condition={!success}
						then={
							<ButtonComp
								color="gray-60"
								width="14.5rem"
								height="4.8rem"
								borderRadius="64px"
								border={`1px solid ${theme.colors['gray-60']}`}
							>
								<Text as="btn2">Cancel</Text>
							</ButtonComp>
						}
					/>

					<ButtonComp
						bg="primary"
						color="white"
						width="14.5rem"
						height="4.8rem"
						borderRadius="64px"
						onClick={() => setStep(1)}
					>
						{success ? 'OK' : 'Retry'}
					</ButtonComp>
				</Box>
			</Box>
		</Modal>
	);
};

export default StatusModal;
