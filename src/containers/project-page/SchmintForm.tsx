import InputDataDecoder from 'ethereum-input-data-decoder';
import { ethers } from 'ethers';
import { CaretDown, CaretUp } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Checkbox from 'src/components/Checkbox';
import CounterInput from 'src/components/CounterInput';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { replaceModal, showModal } from 'src/redux/modal';
import { MODALS_LIST } from 'src/redux/modal/types';
import { networkSelector } from 'src/redux/network';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { getAbi, getContractAddress } from 'src/utils/contracts';
import { getCoinPrice } from 'src/utils/gasPrices';
import { useContract, useFeeData, useProvider, useSigner } from 'wagmi';
import CostComp from './components/CostComp';
import InputBox from './components/InputBox';
import useScheduler from './useScheduler';
import { getABIType } from './utils';

const SchmintForm = ({ collection, setSchmintCreated }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [nft, setNft] = useState(`${1}`);
	const [gasPriceLimit, setGasPriceLimit] = useState('');
	const [funds, setFunds] = useState('');
	const [step, setStep] = useState(0);
	const [estimatedGas] = useState(collection?.estimatedTransaction ?? 0.02);
	const [wrongNetwork, setWrongNetwork] = useState(false);
	const [schmintDisabled, setSchmintDisabled] = useState(false);
	const [receiveInWallet, setReceiveInWallet] = useState(true);
	const [txGas, setTxGas] = useState<string>('');
	const [txPrice, setTxPrice] = useState<string>('');
	const { data: signer } = useSigner();
	const provider = useProvider();
	const [userAddress, setUserAddress] = useState<string>('');
	const { data: gasFee } = useFeeData({
		formatUnits: 'gwei',
		watch: true,
	});
	const network = useAppSelector(networkSelector);
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);

	const TargetInstance = useContract({
		addressOrName: collection?.contractAddress,
		contractInterface: collection?.abi,
		signerOrProvider: provider,
	});

	const SchedulerInstance = useScheduler();

	const SchedulerFactoryInstance = useContract({
		addressOrName: getContractAddress(network.isValid ? network?.chainId : 4, 'SCHEDULER_FACTORY'),
		contractInterface: getAbi(network.isValid ? network?.chainId : 4, 'SCHEDULER_FACTORY'),
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (collection?.startTimestamp < Date.now() / 1000) {
			setSchmintDisabled(true);
		}
	}, [collection]);

	useEffect(() => {
		if (!scheduler?.avatar && collection?.isReceivableOnWallet) {
			setReceiveInWallet(true);
		} else {
			setReceiveInWallet(false);
		}
	}, [scheduler, collection]);

	useEffect(() => {
		if (receiveInWallet) {
			setUserAddress(user?.address);
		} else {
			setUserAddress(scheduler?.avatar);
		}
	}, [receiveInWallet]);

	const handleCreateSchmint = async (e) => {
		e.preventDefault();

		dispatch(
			showModal({
				type: MODALS_LIST.CONFIRM_TRANSACTION,
				props: {
					title: 'Waiting for Confirmation',
					subtext: 'Confirm the wallet transaction to proceed.',
					gasCost: `${parseFloat(txGas).toFixed(6)} ${network.unit} or ${(
						parseFloat(txPrice) * parseFloat(txGas)
					).toFixed(2)} USD`,
				},
			})
		);

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
						break;
					}
					case 2: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							nft,
							user.address,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
						break;
					}
					case 3: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](nft, {
							value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
						});
						break;
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
					console.log('no event found'); // eslint-disable-line no-console
					return;
				} else {
					console.log({ event }); // eslint-disable-line no-console
					setSchmintCreated(true);
					setNft(`${1}`);
					setGasPriceLimit('');
					dispatch(replaceModal({ type: MODALS_LIST.SCHMINT_SUCCESFUL, props: {} }));
				}
			} else {
				switch (getABIType(collection.abi)) {
					case 1: {
						console.log(userAddress);
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							userAddress,
							nft,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
						const decoder = new InputDataDecoder(collection.abi);
						const res = decoder.decodeData(buyTx.data);
						console.log(buyTx.to, res, buyTx.value);
						break;
					}
					case 2: {
						console.log(userAddress);

						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							nft,
							userAddress,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
						const decoder = new InputDataDecoder(collection.abi);
						const res = decoder.decodeData(buyTx.data);
						console.log(buyTx.to, res, buyTx.value);
						break;
					}
					case 3: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](nft, {
							value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
						});
						const decoder = new InputDataDecoder(collection.abi);
						const res = decoder.decodeData(buyTx.data);
						console.log(buyTx.to, res, buyTx.value);

						break;
					}
				}

				const schmintInput = [
					{
						target: buyTx.to,
						data: buyTx.data,
						value: buyTx.value,
						gasPriceLimit: gasPriceLimit ? ethers.utils.parseUnits(gasPriceLimit.toString(), 'gwei') : 0,
					},
				];
				const fundsToBeAdded = ethers.utils.parseEther(`${funds.length !== 0 ? funds : 0}`);

				const tx = await SchedulerInstance?.connect(signer)?.createSchmint(schmintInput, {
					value: fundsToBeAdded,
				});

				dispatch(
					replaceModal({
						type: MODALS_LIST.CONFIRM_TRANSACTION,
						props: {
							title: 'Processing...',
							subtext: 'Please wait while your transaction is being processed.',
							loader: true,
						},
					})
				);

				const receipt = await tx?.wait();

				const event = receipt?.events && receipt.events.filter((event) => event.event === 'SchmintCreated');
				if (!event) {
					console.log('no event found'); // eslint-disable-line no-console
					return;
				} else {
					console.log({ event }); // eslint-disable-line no-console
					setSchmintCreated(true);
					setNft(`${1}`);
					setGasPriceLimit('');
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
						break;
					}
					case 2: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							nft,
							user.address,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
						break;
					}
					case 3: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](nft, {
							value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
						});
						break;
					}
				}
				const schmintInput = [
					{
						target: buyTx.to,
						data: buyTx.data,
						value: buyTx.value,
						gasPriceLimit: gasPriceLimit ? ethers.utils.parseUnits(gasPriceLimit.toString(), 'gwei') : 0,
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
				getCoinPrice(network.chainId).then((price) => {
					setTxPrice(price);
				});
				setTxGas(totalEstimatedGasPrice);
			} else {
				switch (getABIType(collection.abi)) {
					case 1: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							userAddress,
							nft,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
						break;
					}
					case 2: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](
							nft,
							userAddress,
							{
								value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
							}
						);
						break;
					}
					case 3: {
						buyTx = await TargetInstance?.populateTransaction?.[collection.abi?.[0]?.name](nft, {
							value: ethers.utils.parseUnits(`${collection.price * parseInt(nft)}`, 'ether'),
						});
						break;
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

				const tx = await SchedulerInstance?.connect(signer)?.estimateGas?.createSchmint(schmintInput, {
					value: fundsToBeAdded,
				});
				const totalEstimatedGasPrice = ethers.utils.formatEther(gasFee?.maxFeePerGas.mul(tx));
				getCoinPrice(network.chainId).then((price) => {
					setTxPrice(price);
				});
				setTxGas(totalEstimatedGasPrice);
			}
		} catch (err) {
			console.log({ err }); // eslint-disable-line no-console
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (collection && user.exists) {
				if (!network.isValid || collection?.network?.chainId !== network.chainId) {
					setWrongNetwork(true);
					return;
				}
			}
			setWrongNetwork(false);
		}
	}, [collection, network.chainId, user.exists]);

	useEffect(() => {
		const total = (collection?.price * parseInt(nft) + estimatedGas).toFixed(3);
		setFunds(total);
	}, [nft]);

	useEffect(() => {
		if (user.exists) {
			getEstimatedGas();
		}
	}, [nft, gasPriceLimit, funds, user, gasFee, network.chainId]);

	return (
		<Box width="54.8rem" px="mxl">
			<Text textAlign="start" mb="3rem" as="h5">
				Schmint Details
			</Text>
			<Box mt="mxxxl" />
			<CounterInput
				label="Number of NFTs"
				required
				bg="gray-10"
				helper={`This contract allows upto ${collection.maxWallet} NFTs per wallet and ${collection.maxPurchase} per transaction.`}
				max={Math.min(collection?.maxPurchase) ?? 15}
				min={1}
				errorText={
					parseInt(nft) < 1
						? 'Value should not be less than 1'
						: parseInt(nft) < collection.maxPurchase
						? `Value should not be more than ${collection?.maxPurchase}`
						: ''
				}
				value={nft}
				setValue={setNft}
				disabled={schmintDisabled}
			/>

			<Box mt="mxxxl" row>
				<Checkbox
					setValue={setReceiveInWallet}
					value={receiveInWallet}
					mr="mm"
					disabled={!scheduler.avatar && collection?.isReceivableOnWallet}
				/>
				<Box column>
					<Text as="h6">Receive NFTs in your Wallet</Text>
					<Text as="b3" mt="mxs" color="gray-40">
						This collection allows you to receive NFTs directly in your wallet. By defalut, NFTs are sent to
						your gnosis safe except for your first schmint.
					</Text>
				</Box>
			</Box>
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
								disabled={schmintDisabled}
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
						<CostComp
							collection={collection}
							nft={parseInt(nft)}
							showTotalAmount
							showCostText
							step={step}
							setStep={setStep}
							estimatedGas={estimatedGas}
							value={0}
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
					disable={!user.exists || wrongNetwork || schmintDisabled}
					onClick={handleCreateSchmint}
				>
					<Text as="btn1">Create Schmint</Text>
				</ButtonComp>

				<If
					condition={gasFee && user.exists}
					then={
						<Text as="c1" color="red-40" mt="mxs">
							EST. GAS COST:{' '}
							<span style={{ color: theme.colors['gray-40'] }}>{`${parseFloat(txGas).toFixed(6)} ${
								network.unit
							} or ${(parseFloat(txPrice) * parseFloat(txGas)).toFixed(2)} USD`}</span>
						</Text>
					}
				/>
				<If
					condition={user.exists}
					then={
						<Box bg="gray-20" borderRadius="4px" p="mxs" mt="mxxxl">
							<If
								condition={scheduler.avatar === ''}
								then={
									<Text as="b3" textAlign="center" color={`${theme.colors['gray-50']}`} mb="mxs">
										Note: Clicking “Create Schmint” will also create for you a pesonal scheduler
										which will be used to execute transactions on your behalf. It will cost
										additonal gas but you only need to do it once.
									</Text>
								}
							/>
							<Text as="b3" color="gray-50" textAlign="center">
								{`A total of ${funds.length !== 0 ? funds : 0} ${
									network.unit
								} will be added to your Gnosis Safe, which will then be used to mint the NFTs. We recommend having a little more than minimum funds in your Gnosis Safe to prevent your transaction from failing.`}
							</Text>
						</Box>
					}
					else={
						<Text as="b3" textAlign="center" p="mxs" color={`${theme.colors['gray-50']}`} mb="mxs">
							Connect wallet to create Schmint
						</Text>
					}
				/>
			</Box>
		</Box>
	);
};
export default SchmintForm;
