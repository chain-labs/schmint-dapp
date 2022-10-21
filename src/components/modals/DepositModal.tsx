import { ethers } from 'ethers';
import Image from 'next/image';
import { Copy } from 'phosphor-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import InputBox from 'src/containers/project-page/components/InputBox';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { hideModal, replaceModal, showModal } from 'src/redux/modal';
import { MODALS_LIST } from 'src/redux/modal/types';
import { schedulerSelector } from 'src/redux/scheduler';
import theme from 'src/styleguide/theme';
import { getCoinPrice } from 'src/utils/gasPrices';
import { useNetwork, useSigner } from 'wagmi';
import Box from '../Box';
import ButtonComp from '../Button';
import { condenseAddress } from '../DappNavbar/ConnectWallet';
import Modal from '../Modal';
import Text from '../Text';

const illustration = 'https://ik.imagekit.io/chainlabs/Schmint/pablo-pile-yellow-coins-dollars_1__1___hlNpTc2V.svg';

const DepositModal = () => {
	const scheduler = useAppSelector(schedulerSelector);
	const dispatch = useAppDispatch();
	const { chain } = useNetwork();
	const { data: signer } = useSigner();

	const [funds, setFunds] = useState<number>();

	const handleDeposit = async (e) => {
		e.preventDefault();

		try {
			dispatch(
				showModal({
					type: MODALS_LIST.CONFIRM_TRANSACTION,
					props: {
						title: 'Waiting for Confirmation',
						subtext: 'Confirm the wallet transaction to proceed.',
						loader: true,
					},
				})
			);

			const tx = await signer.sendTransaction({
				to: scheduler.avatar,
				value: ethers.utils.parseEther(funds.toString()),
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

			const receipt = await tx.wait();

			console.log({ receipt });
			if (receipt) {
				const fundsString = funds;
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
							msg: `Successfully deposited ${fundsString} ${chain?.nativeCurrency?.symbol} to your Gnosis Safe.`,
							gas: final,
							btnText: 'OK',
						},
					})
				);
			}
		} catch (err) {
			console.log({ err });
			dispatch(replaceModal({ type: MODALS_LIST.STATUS_MODAL, props: { success: false } }));
		}
	};

	return (
		<Modal visible>
			<Box
				bg="sky-blue-10"
				p="mm"
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				borderRadius="8px"
				border="1px solid"
				borderColor="blue-20"
				column
			>
				<Box mb="mxl" column center>
					<Box position="relative" width="12rem" height="8rem" mb="mm">
						<Image src={illustration} layout="fill" alt="Coins Deposit" objectFit="contain" />
					</Box>
					<Text as="h6">Deposit Funds to Gnosis Safe</Text>
					<InputBox
						placeholder="0.05"
						value={funds}
						step="0.0001"
						setValue={setFunds}
						unit={chain?.nativeCurrency?.symbol}
						width="30rem"
					/>
					<Box row alignItems="center">
						<Text as="b3" mr="ms">
							Gnosis Safe Address:
						</Text>
						<Text as="c1" mr="mxs">
							{condenseAddress(scheduler.avatar)}
						</Text>
						<Copy
							size={16}
							color={theme.colors['blue-40']}
							onClick={() => {
								navigator.clipboard.writeText(scheduler.avatar);
								toast.success('Copied');
							}}
							style={{ cursor: 'pointer' }}
						/>
					</Box>
				</Box>
				<Box>
					<ButtonComp bg="tertiary" px="wxs" py="ms" onClick={() => dispatch(hideModal())}>
						<Text as="btn2">Cancel</Text>
					</ButtonComp>
					<ButtonComp
						bg="primary"
						px="wxs"
						py="ms"
						ml="mm"
						disable={!funds || funds <= 0}
						onClick={handleDeposit}
					>
						<Text as="btn2">Deposit</Text>
					</ButtonComp>
				</Box>
			</Box>
		</Modal>
	);
};

export default DepositModal;
