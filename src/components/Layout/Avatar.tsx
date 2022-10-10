import Image from 'next/image';
import { Copy, Plus } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { showModal } from 'src/redux/modal';
import { MODALS_LIST } from 'src/redux/modal/types';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { useBalance, useNetwork } from 'wagmi';
import Box from '../Box';
import { condenseAddress } from '../DappNavbar/ConnectWallet';
import If from '../If';
import Text from '../Text';
import { indexAddress } from './utils';

const Avatar = () => {
	const dispatch = useAppDispatch();
	const [userNo, setUserNo] = useState(0);
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);
	const { chain } = useNetwork();
	const { data: balance } = useBalance({ addressOrName: scheduler.avatar, chainId: chain?.id, watch: true });

	const sanitizePfpUrl = () => {
		return `https://ik.imagekit.io/chainlabs/Schmint/pfps/pfp_${userNo}.svg`;
	};

	useEffect(() => {
		if (user.address) {
			const index = indexAddress(user.address);
			setUserNo(index);
		} else {
			setUserNo(0);
		}
	}, [user.address]);

	const handleDepositFunds = (e) => {
		e.preventDefault();

		dispatch(showModal({ type: MODALS_LIST.DEPOSIT_MODAL, props: {} }));
	};

	return (
		<Box column center mt="wm">
			<Box height="8rem" width="8rem" position="relative" mb="mxs">
				<Image src={sanitizePfpUrl()} layout="fill" />
			</Box>
			<If
				condition={user.exists}
				then={
					<Box borderRadius="8px" border="1px solid" borderColor="blue-20" py="mxs" pl="mxs" pr="ml">
						<Box row justifyContent="space-between" alignItems="center">
							<Text as="c1" width="37%">
								Scheduler:
							</Text>
							<Box ml="ms" flex={1} row alignItems="center">
								<If
									condition={scheduler?.avatar === ''}
									then={<Text as="c1">Not Created</Text>}
									else={
										<React.Fragment>
											<Text as="c1">{condenseAddress(scheduler.schedulerAddress)}</Text>
											<Box
												ml="mxs"
												alignItems="center"
												row
												cursor="pointer"
												onClick={() => {
													navigator.clipboard?.writeText(scheduler.avatar);
													toast.success('Copied');
												}}
											>
												<Copy color={theme.colors['blue-40']} size={16} />
											</Box>
										</React.Fragment>
									}
								/>
							</Box>
						</Box>
						<Box row justifyContent="space-between" alignItems="center" mt="mxs">
							<Text as="c1" width="37%">
								Balance:
							</Text>
							<Box ml="mm" row alignItems="center" justifyContent="space-between" width="10rem">
								<If
									condition={scheduler?.avatar === ''}
									then={<Text as="c1">Not Connected</Text>}
									else={
										<React.Fragment>
											<Box row>
												<Text as="c1">{parseFloat(balance?.formatted).toFixed(4)}</Text>
												<Text as="c1" ml="mxxs">
													{balance?.symbol}
												</Text>
											</Box>
											<Box
												ml="mxs"
												alignItems="center"
												row
												cursor="pointer"
												onClick={handleDepositFunds}
											>
												<Plus color={theme.colors['blue-40']} size={16} />
											</Box>
										</React.Fragment>
									}
								/>
							</Box>
						</Box>
					</Box>
				}
				else={<Text as="h6">Not Connected</Text>}
			/>
		</Box>
	);
};

export default Avatar;
