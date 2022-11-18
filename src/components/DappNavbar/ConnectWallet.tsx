import Image from 'next/image';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { removeUser, setUser, userSelector } from 'src/redux/user';
import { useAccount, useEnsName } from 'wagmi';
import Box from '../Box';
import If from '../If';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import theme from 'src/styleguide/theme';
import Text from '../Text';
import ButtonComp from '../Button';
import { hideModal, showModal } from 'src/redux/modal';
import { MODALS_LIST } from 'src/redux/modal/types';
import { checkIfUserInvited } from 'src/utils/whitelist';
import { setNetwork } from 'src/redux/network';

export const condenseAddress = (address) => {
	if (!address) return null;
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ConnectWallet = ({ networkProps }) => {
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();
	const { isDisconnected } = useAccount();

	useEffect(() => {
		if (user.exists) {
			const validateAddressForInvite = async () => {
				const checkIfUserisValid = await checkIfUserInvited(user.address);
				if (!checkIfUserisValid) {
					dispatch(showModal({ type: MODALS_LIST.INVITE_ONLY_MODAL, props: {} }));
					dispatch(removeUser());
				} else {
					dispatch(hideModal());
				}
			};
			validateAddressForInvite();
		}
	}, [user]);

	useEffect(() => {
		if (isDisconnected) {
			dispatch(removeUser());
		}
	}, [isDisconnected]);

	return (
		<ConnectButton.Custom>
			{({ account, chain, openConnectModal, openChainModal, openAccountModal }) => {
				const { data: ens } = useEnsName({
					address: user.address,
					onError: (err) => {
						console.log("Error getting user's ENS name", err); // eslint-disable-line no-console
					},
				});

				useEffect(() => {
					if (account) {
						const validateAddressForInvite = async () => {
							const checkIfUserisValid = checkIfUserInvited(user.address);
							if (!checkIfUserisValid) {
								dispatch(showModal({ type: MODALS_LIST.INVITE_ONLY_MODAL, props: {} }));
							} else {
								dispatch(setUser(account?.address));
							}
						};
						validateAddressForInvite();
					}
				}, [account]);

				useEffect(() => {
					if (user.address) {
						dispatch(setNetwork({ chainId: chain?.id, name: chain?.name }));
					}
				}, [user, chain?.id]);

				if (!user.exists) {
					return (
						<ButtonComp bg="primary" py="0.95rem" px="mxxxl" borderRadius="64px" onClick={openConnectModal}>
							<Text as="btn2" color="simply-white">
								Connect Wallet
							</Text>
						</ButtonComp>
					);
				}
				if (user.exists) {
					return (
						<Box
							border="1px solid"
							borderColor="blue-10"
							borderRadius="64px"
							my={{ mobS: 'ms', tabS: 'mxs' }}
							pl="mxs"
							pr="mxxs"
							py="mxxs"
							row
							center
						>
							<Box
								as="button"
								type="button"
								borderRadius="50%"
								bg={networkProps?.logoColor}
								height="3rem"
								width="3rem"
								mr="mxs"
								center
								data-tip={chain?.name}
								cursor="pointer"
								onClick={openChainModal}
								border="none"
							>
								<Box position="relative" height="2.4rem" width="2.4rem" center>
									<If
										condition={chain?.id === 1 || chain?.id === 5 || chain?.id === 4}
										then={
											<Image
												src="https://ik.imagekit.io/chainlabs/Schmint/eth_MhN722_5zH.svg"
												layout="fill"
											/>
										}
										else={
											<If
												condition={chain?.id === 137}
												then={
													<Image
														src="https://ik.imagekit.io/chainlabs/Schmint/polygon-white_3vl1XbwDI.svg"
														layout="fill"
													/>
												}
												else={
													<Image
														src="https://ik.imagekit.io/chainlabs/Schmint/polygon-color_NzzPwZ2jGX.svg"
														layout="fill"
													/>
												}
											/>
										}
									/>
								</Box>
							</Box>
							<Box
								as="button"
								border="none"
								borderRadius="64px"
								data-tip={user.address}
								data-offset="{'right': 150,'bottom': 37}"
								px="mm"
								py="1.05rem"
								bg="sky-blue-20"
								color="simply-blue"
								row
								center
								cursor="pointer"
								css={`
									&:active {
										background: ${theme.colors['sky-blue-30']};
									}
								`}
								onClick={openAccountModal}
							>
								<Text as="c1">{ens ?? condenseAddress(user.address)}</Text>
							</Box>
						</Box>
					);
				}
			}}
		</ConnectButton.Custom>
	);
};

export default ConnectWallet;
