import React from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import InputBox from './InputBox';
import scrollIntoView from '../../../utils/scrollIntoView';
import AlertBox from './AlertBox';

const AlertBottomBox = ({ showOptions, funds, setFunds, step, setStep, price, nft, estimatedGas }) => {
	return (
		<AlertBox color="yellow-20">
			{step === 0 ? (
				<Text textAlign="center" as="b2" fontWeight="medium">
					Before you proceed...
				</Text>
			) : (
				<Text textAlign="center" as="b2" fontWeight="medium">
					Hmm... you don’t seem to have enough funds
				</Text>
			)}
			{step === 0 ? (
				<Text textAlign="center" as="b3" mt="mxs">
					The transaction will take place as soon as the sale goes live. We recommend having a little more
					than minimum funds in your Gnosis Safe to prevent your transaction from failing.
				</Text>
			) : (
				<Text textAlign="center" as="b3" mt="mxs" color="gray-50">
					Please load up your Gnosis Safe with sufficient funds to prevent your transaction from failing.
				</Text>
			)}
			<If
				condition={step === 1}
				then={
					<Box
						center
						mt="mxs"
						onClick={
							showOptions
								? () => {
										scrollIntoView('input');
								  }
								: () => setStep(2)
						}
					>
						<ButtonComp
							backgroundColor="white"
							color="black"
							width="15.8rem"
							height="4rem"
							borderRadius="27px"
						>
							<Text as="btn2" fontWeight="bold">
								Add Funds
							</Text>
						</ButtonComp>
					</Box>
				}
			/>
			<Box>
				<If
					condition={step === 2}
					then={
						<InputBox
							value={funds}
							label="Deposit Funds to the Gnosis Safe"
							placeholder="0.05"
							min={(price * parseInt(nft) + estimatedGas).toFixed(3)}
							step={'0.001'}
							unit="ETH"
							setValue={setFunds}
						/>
					}
				/>
			</Box>
		</AlertBox>
	);
};

export default AlertBottomBox;
