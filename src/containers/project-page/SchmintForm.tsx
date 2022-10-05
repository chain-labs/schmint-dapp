import { ethers } from 'ethers';
import { CaretDown, CaretUp, Minus, Plus } from 'phosphor-react';
import React, { useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput, { InputElement } from 'src/components/TextInput';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { getAbi, getContractAddress } from 'src/utils/contracts';
import { useContract, useNetwork, useSigner } from 'wagmi';
import AlertBottomBox from './components/AlertBottomBox';
import AlertBox from './components/AlertBox';
import CostComp from './components/CostComp';
import InputBox from './components/InputBox';
import InputNumber from './components/InputNumber';
import { getABIType } from './utils';

const SchmintForm = ({ collection }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [nft, setNft] = useState(0);
	const [gasPriceLimit, setGasPriceLimit] = useState('');
	const [funds, setFunds] = useState('');

	const { data: signer } = useSigner();

	const { chain } = useNetwork();
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);

	const TargetInstance = useContract({
		addressOrName: collection.address,
		contractInterface: collection.abi,
	})

	const SchedulerInstance = useContract({
		addressOrName: scheduler.schedulerAddress,
		contractInterface: getAbi(chain?.id, 'SCHEDULER'),
	});

	const SchedulerFactoryInstance = useContract({
		addressOrName: getContractAddress(chain?.id, 'SCHEDULER_FACTORY'),
		contractInterface: getAbi(chain?.id, 'SCHEDULER_FACTORY'),
	});

	const fundsRef = React.useRef();

	const handleCreateSchmint = async (e) => {
		e.preventDefault();

		let buyTx;

		if (!scheduler.schedulerAddress) {
			const userInput = [user.address, ethers.constants.AddressZero]
			switch (getABIType(collection.abi)) {
				case 1: {
					buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](user.address, nft, { value: ethers.utils.parseUnits(`${collection.price * nft}`, 'ether') });
					const schmintInput = [{ target: buyTx.to, data: buyTx.data, value: buyTx.value, gasPriceLimit: ethers.utils.parseUnits(gasPriceLimit, 'gwei') }];
					const tx = await SchedulerFactoryInstance?.connect(signer)?.deployScheduler(userInput, schmintInput);
					const receipt = await tx.wait();

					
				}
		}
	};
	return (
		<Box width="54.8rem" px="mxl">
			<Text textAlign="start" mb="3rem" as="h5">
				Schmint Details
			</Text>
			<InputNumber
				value={nft}
				setValue={setNft}
				errorText="Value should not be more than 5"
				max={5}
				min={0}
				label="Number of Nfts"
				detailText="This contract allows upto 5 NFTs per wallet and 5 per transaction."
			/>
			<Text
				as="b3"
				onClick={() => setShowOptions(!showOptions)}
				cursor="pointer"
				my="3.3rem"
				color="blue-40"
				fontWeight="bold"
				row
				alignItems="center"
			>
				Show advanced options
				<Box as="span" ml="0.5rem" center>
					<If condition={showOptions === false} then={<CaretUp size={18} />} else={<CaretDown size={18} />} />
				</Box>
			</Text>
			<Box id="input">
				<If
					condition={showOptions === true}
					then={
						<Box>
							<InputBox
								label="Maximum Gas Limit"
								placeholder="5"
								value={gasPriceLimit}
								setValue={setGasPriceLimit}
								detailText="Your transaction will not execute if the gas price is more than the set limit."
								unit="GWEI"
							/>
							<InputBox
								label="Deposit funds to Gnosis Safe"
								placeholder="20"
								value={funds}
								setValue={setFunds}
								detailText="Deposit funds to the Gnosis Safe to prevent your Schmint from failing."
								unit="ETH"
							/>
						</Box>
					}
				/>
			</Box>
			<Box borderTop={`1px solid ${theme.colors['gray-30']}`} width="100%" mt="mxxxl" />
			<CostComp collection={collection} nft={nft} showTotalAmount showCostText />
			<AlertBottomBox showOptions={showOptions} funds={funds} setFunds={setFunds} />
			<Box center column mt="mxxxl">
				<ButtonComp
					bg="primary"
					color="white"
					width="23.4rem"
					height="4.8rem"
					borderRadius="64px"
					disable={!user.exists}
					onClick={handleCreateSchmint}
				>
					<Text as="btn1">Create Schmint</Text>
				</ButtonComp>
				<Text as="b3" mt="mm" textAlign="center" color={`${theme.colors['gray-40']}`}>
					Clicking “Create Schmint” will also create a create for you a pesonal scheduler which will be used
					to store the schmint.
				</Text>
			</Box>
		</Box>
	);
};

export default SchmintForm;

interface cost {
	textColor?: string;
	text?: string;
	subText?: number;
	width?: string;
	unit?: string;
	fontSize?: any;
}

const CostItem = ({ text, subText, width, unit, textColor, fontSize }: cost) => {
	return (
		<Box between pt="mxs" width={width}>
			<Text as={fontSize ? fontSize : 'b3'}>{text}</Text>
			<Text as={fontSize ? fontSize : 'b3'} color={textColor ? textColor : `${theme.colors['gray-60']}`}>
				{subText}
				{'  '}
				{unit}
			</Text>
		</Box>
	);
};
