import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { hideModal, replaceModal, showModal } from 'src/redux/modal';
import Box from '../Box';
import ButtonComp from '../Button';
import Modal from '../Modal';
import Text from '../Text';
import useScheduler from 'src/containers/project-page/useScheduler';
import { MODALS_LIST } from 'src/redux/modal/types';
import { useFeeData, useNetwork, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { getCoinPrice } from 'src/utils/gasPrices';

const DeleteModal = ({ schmint, collectionName }) => {
	const dispatch = useAppDispatch();
	const SchedulerInstance = useScheduler();
	const { data: signer } = useSigner();
	const { chain } = useNetwork();
	const { data: gasFee } = useFeeData({
		formatUnits: 'gwei',
		watch: true,
	});

	const [txPrice, setTxPrice] = React.useState('');
	const [txGas, setTxGas] = React.useState('');

	const handleDelete = async () => {
		dispatch(
			showModal({
				type: MODALS_LIST.CONFIRM_TRANSACTION,
				props: {
					title: 'Waiting for Confirmation',
					subtext: 'Confirm the wallet transaction to proceed.',
					gasCost: `${parseFloat(txGas).toFixed(6)} ${chain?.nativeCurrency?.symbol} or ${(
						parseFloat(txPrice) * parseFloat(txGas)
					).toFixed(2)} USD`,
				},
			})
		);

		try {
			const tx = await SchedulerInstance?.connect(signer)?.cancelSchmint(schmint.schmintId);
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
			if (receipt) {
				const gas = ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice));
				const price = ((await getCoinPrice(chain?.id)) * parseFloat(gas.toString())).toFixed(2);
				const final = `${parseFloat(gas.toString()).toFixed(6)} ${
					chain?.nativeCurrency?.symbol
				} or ${price} USD`;

				dispatch(
					replaceModal({
						type: MODALS_LIST.STATUS_MODAL,
						props: {
							success: true,
							btnText: 'Go Back to My Schmints',
							gas: final,
							msg: `Your Schmint for ${collectionName} was successfully deleted.`,
							successMsg: 'Schmint Successfully Deleted',
						},
					})
				);
			}
		} catch (err) {
			console.log(err);
			dispatch(replaceModal({ type: MODALS_LIST.STATUS_MODAL, props: { success: false } }));
		}
	};

	const estimatedGas = async () => {
		try {
			const tx = await SchedulerInstance?.connect(signer)?.estimateGas?.cancelSchmint(schmint.schmintId);
			const totalEstimatedGasPrice = ethers.utils.formatEther(gasFee?.maxFeePerGas.mul(tx));
			getCoinPrice(chain?.id).then((price) => {
				setTxPrice(price);
			});
			setTxGas(totalEstimatedGasPrice);
		} catch (err) {
			console.log({ err });
		}
	};

	useEffect(() => {
		estimatedGas();
	}, [gasFee]);

	useEffect(() => {
		return () => {
			if (typeof window !== 'undefined') {
				window.scrollTo(0, 0);
			}
		};
	}, []);
	return (
		<Modal visible>
			{schmint ? (
				<Box
					bg="sky-blue-10"
					p="mm"
					position="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					borderRadius="16px"
					border="1px solid"
					borderColor="blue-30"
					column
					width="38.2rem"
				>
					<Box position="relative" width="35rem" height="13.2rem" mb="mxxxl">
						<Image
							src="https://ik.imagekit.io/chainlabs/Schmint/delete-modal.svg"
							layout="fill"
							objectFit="cover"
						/>
					</Box>
					<Box width="35rem" column center>
						<Text as="h5" textAlign="center" px="wxxs">
							{' '}
							Are you sure you want to delete this Schmint?
						</Text>

						<Text as="b3" mt="mxs" textAlign="center" color="gray-50" px="wm">
							Once deleted, you won’t be able to recover the schmint.{' '}
						</Text>
					</Box>
					<Box row between>
						<ButtonComp
							bg="primary"
							height={40}
							borderRadius="64px"
							mt="mxl"
							px="wm"
							width="16.7rem"
							mx="auto"
							onClick={() => dispatch(hideModal())}
						>
							Cancel
						</ButtonComp>
						<ButtonComp
							backgroundColor="white"
							height={40}
							borderRadius="64px"
							mt="mxl"
							px="wm"
							width="16.7rem"
							mx="auto"
							color="red-40"
							border="1px solid #7A7A80"
							onClick={handleDelete}
						>
							Delete
						</ButtonComp>
					</Box>
				</Box>
			) : (
				''
			)}
		</Modal>
	);
};

export default DeleteModal;
