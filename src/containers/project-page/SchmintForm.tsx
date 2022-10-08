import { ethers } from 'ethers';
import { CaretDown, CaretUp } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { replaceModal, showModal } from 'src/redux/modal';
import { MODALS_LIST } from 'src/redux/modal/types';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { getAbi, getContractAddress } from 'src/utils/contracts';
import { getCoinPrice } from 'src/utils/gasPrices';
import { useContract, useFeeData, useNetwork, useProvider, useSigner } from 'wagmi';
import AlertBottomBox from './components/AlertBottomBox';
import CostComp from './components/CostComp';
import InputBox from './components/InputBox';
import InputNumber from './components/InputNumber';
import useScheduler from './useScheduler';
import { getABIType } from './utils';

const SchmintForm = ({ collection }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [nft, setNft] = useState(`${1}`);
	const [gasPriceLimit, setGasPriceLimit] = useState('');
	const [funds, setFunds] = useState('');
	const [step, setStep] = useState(0);
	const [estimatedGas, setEstimatedGas] = useState(0.001);
	const [txGas, setTxGas] = useState<string>('');
	const [txPrice, setTxPrice] = useState<string>('');

	const { data: signer } = useSigner();
	const provider = useProvider();
	const { data: gasFee } = useFeeData({
		formatUnits: 'gwei',
		watch: true,
	});

	const { chain } = useNetwork();
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);

	const TargetInstance = useContract({
		addressOrName: collection?.contractAddress,
		contractInterface: collection?.abi,
		signerOrProvider: provider,
	});

	const SchedulerInstance = useScheduler();

	const SchedulerFactoryInstance = useContract({
		addressOrName: getContractAddress(chain?.id, 'SCHEDULER_FACTORY'),
		contractInterface: getAbi(chain?.id, 'SCHEDULER_FACTORY'),
	});

	const dispatch = useAppDispatch();

	const handleCreateSchmint = async (e) => {
		e.preventDefault();

		dispatch(showModal({ type: MODALS_LIST.CONFIRM_TRANSACTION, props: {} }));

		try {
			let buyTx;

			if (!scheduler.schedulerAddress) {
				const userInput = [user.address, ethers.constants.AddressZero];
				switch (getABIType(collection.abi)) {
					case 1: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							user.address,
							nft,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
					}
				}
				const schmintInput = [
					{
						target: buyTx.to,
						data: buyTx.data,
						value: buyTx.value,
						gasPriceLimit: gasPriceLimit ? ethers.utils.parseUnits(gasPriceLimit, 'gwei') : 0,
					},
				];

				const fundsToBeAdded = ethers.utils.parseEther(`${funds.length !== 0 ? funds : 0}`);

				const tx = await SchedulerFactoryInstance?.connect(signer)?.deployScheduler(userInput, schmintInput, {
					value: fundsToBeAdded,
				});

				const receipt = await tx.wait();

				const event = receipt?.events && receipt.events.filter((event) => event.event === 'SchedulerDeployed');
				if (!event) {
					console.log('no event found');
					return;
				} else {
					console.log({ event });
					dispatch(replaceModal({ type: MODALS_LIST.SCHMINT_SUCCESFUL, props: {} }));
				}
			} else {
				switch (getABIType(collection.abi)) {
					case 1: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							scheduler.avatar,
							nft,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
					}
				}
				const schmintInput = [
					{
						target: buyTx.to,
						data: buyTx.data,
						value: buyTx.value,
						gasPriceLimit: gasPriceLimit ? ethers.utils.parseUnits(gasPriceLimit, 'gwei') : 0,
					},
				];

				const fundsToBeAdded = ethers.utils.parseEther(`${funds.length !== 0 ? funds : 0}`);

				const tx = await SchedulerInstance?.connect(signer)?.createSchmint(schmintInput, {
					value: fundsToBeAdded,
				});

				const receipt = await tx?.wait();

				const event = receipt?.events && receipt.events.filter((event) => event.event === 'SchmintCreated');
				if (!event) {
					console.log('no event found');
					return;
				} else {
					console.log({ event });
					dispatch(replaceModal({ type: MODALS_LIST.SCHMINT_SUCCESFUL, props: {} }));
				}
			}
		} catch (err) {
			dispatch(
				replaceModal({
					type: MODALS_LIST.STATUS_MODAL,
					props: {
						success: false,
					},
				})
			);
		}
	};

	const getEstimatedGas = async () => {
		try {
			let buyTx;

			if (!scheduler.schedulerAddress) {
				const userInput = [user.address, ethers.constants.AddressZero];
				switch (getABIType(collection.abi)) {
					case 1: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							user.address,
							nft,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
					}
				}

				const schmintInput = [
					{
						target: buyTx.to,
						data: buyTx.data,
						value: buyTx.value,
						gasPriceLimit: gasPriceLimit ? ethers.utils.parseUnits(gasPriceLimit, 'gwei') : 0,
					},
				];

				const fundsToBeAdded = ethers.utils.parseEther(`${funds.length !== 0 ? funds : 0}`);

				const tx = await SchedulerFactoryInstance?.connect(signer)?.estimateGas?.deployScheduler(
					userInput,
					schmintInput,
					{
						value: fundsToBeAdded,
					}
				);
				const totalEstimatedGasPrice = ethers.utils.formatEther(gasFee?.maxFeePerGas.mul(tx));
				getCoinPrice(chain?.id).then((price) => {
					setTxPrice(price);
				});
				setTxGas(totalEstimatedGasPrice);
			} else {
				switch (getABIType(collection.abi)) {
					case 1: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							scheduler.avatar,
							nft,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
					}
				}
				const schmintInput = [
					{
						target: buyTx.to,
						data: buyTx.data,
						value: buyTx.value,
						gasPriceLimit: gasPriceLimit ? ethers.utils.parseUnits(gasPriceLimit, 'gwei') : 0,
					},
				];
				console.log('Hi');
				console.log(ethers.utils.parseUnits(gasPriceLimit, 'gwei'));

				const fundsToBeAdded = ethers.utils.parseEther(`${funds.length !== 0 ? funds : 0}`);

				const tx = await SchedulerInstance?.connect(signer)?.estimateGas?.createSchmint(schmintInput, {
					value: fundsToBeAdded,
				});

				const totalEstimatedGasPrice = ethers.utils.formatEther(gasFee?.maxFeePerGas.mul(tx));
				getCoinPrice(chain?.id).then((price) => {
					setTxPrice(price);
				});
				setTxGas(totalEstimatedGasPrice);
			}
		} catch (err) {
			console.log({ err });
		}
	};

	useEffect(() => {
		const total = (collection?.price * parseInt(nft) + estimatedGas).toFixed(3);
		setFunds(total);
	}, [nft]);

	useEffect(() => {
		if (user.exists) {
			console.log(user);
			getEstimatedGas();
		}
	}, [nft, gasPriceLimit, funds, user, gasFee]);

	return (
		<Box width="54.8rem" px="mxl">
			<Text textAlign="start" mb="3rem" as="h5">
				Schmint Details
			</Text>
			<InputNumber
				value={nft}
				setValue={setNft}
				errorText={
					parseInt(nft) < 1
						? 'Value should not be less than 1'
						: parseInt(nft) < collection.maxPurchase
						? `Value should not be more than ${collection?.maxPurchase}`
						: ''
				}
				max={collection.maxPurchase}
				min={1}
				label="Number of NFTs"
				detailText={`This contract allows upto ${collection.maxWallet} NFTs per wallet and ${collection.maxPurchase} per transaction.`}
				required
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
					<If condition={showOptions === false} then={<CaretDown size={18} />} else={<CaretUp size={18} />} />
				</Box>
			</Text>
			<Box id="input">
				<If
					condition={showOptions === true}
					then={
						<Box>
							<InputBox
								label="Maximum Gas Price Limit"
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
								min={(collection?.price * parseInt(nft) + estimatedGas).toFixed(3)}
								step={'0.001'}
								setValue={setFunds}
								detailText="Deposit funds to the Gnosis Safe to prevent your Schmint from failing."
								unit="ETH"
							/>
						</Box>
					}
				/>
			</Box>
			<If
				condition={user.exists}
				then={
					<React.Fragment>
						<Box borderTop={`1px solid ${theme.colors['gray-30']}`} width="100%" mt="mxxxl" />
						<Text as="h5" mt="mxxxl">
							Cost
						</Text>
						<If
							condition={step >= 1}
							then={
								<AlertBottomBox
									showOptions={showOptions}
									funds={funds}
									setFunds={setFunds}
									step={step}
									setStep={setStep}
									price={collection.price}
									nft={nft}
									estimatedGas={estimatedGas}
								/>
							}
						/>
						<CostComp
							collection={collection}
							nft={parseInt(nft)}
							showTotalAmount
							showCostText
							step={step}
							setStep={setStep}
							estimatedGas={estimatedGas}
						/>
						<If
							condition={step === 0}
							then={
								<AlertBottomBox
									showOptions={showOptions}
									funds={funds}
									setFunds={setFunds}
									step={step}
									setStep={setStep}
									price={collection?.price}
									nft={nft}
									estimatedGas={estimatedGas}
								/>
							}
						/>
					</React.Fragment>
				}
			/>
			<Box center column mt="mxxxl">
				<ButtonComp
					bg="primary"
					color="white"
					width="23.4rem"
					height="4.8rem"
					borderRadius="64px"
					disable={!user.exists}
					onClick={handleCreateSchmint}
					mb="mm"
				>
					<Text as="btn1">Create Schmint</Text>
				</ButtonComp>
				<If
					condition={scheduler.avatar === ''}
					then={
						<Text as="b3" textAlign="center" color={`${theme.colors['gray-40']}`}>
							Clicking “Create Schmint” will also create a create for you a pesonal scheduler which will
							be used to store the schmint.
						</Text>
					}
				/>
				<If
					condition={gasFee && user.exists}
					then={
						<Text as="c1" color="red-40" mt="mxxs">
							EST. TRANSACTION COST:{' '}
							<span style={{ color: theme.colors['gray-40'] }}>{`${parseFloat(txGas).toFixed(6)} ${
								chain?.nativeCurrency?.symbol
							} or ${(parseFloat(txPrice) * parseFloat(txGas)).toFixed(2)} USD`}</span>
						</Text>
					}
				/>
			</Box>
		</Box>
	);
};
export default SchmintForm;
