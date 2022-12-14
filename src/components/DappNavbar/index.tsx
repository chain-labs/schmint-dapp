/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { userSelector, setUser } from 'src/redux/user';
import ReactTooltip from 'react-tooltip';
import { List } from 'phosphor-react';
import { BLOGS_URL } from 'src/utils/constants';
import Link from 'next/link';
import { useAccount, useSigner, useSwitchNetwork } from 'wagmi';
import If from '../If';
import Drawer from './Drawer';
import TooltipPortal from './TooltipPortal';
import NavItem from './NavItem';
import ConnectWallet from './ConnectWallet';
import Banners from './Banners';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { sendLog } from 'src/utils/logging';

const DappNavbar = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const { data: signer } = useSigner();
	const account = useAccount();
	const { switchNetwork } = useSwitchNetwork();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [networkProps, setNetworkProps] = useState({
		logoColor: '',
		bannerColor: '',
		bannerTextColor: '',
		currency: '',
		bannerText: '',
	});

	useEffect(() => {
		if (account?.connector?.id === 'metaMask' && typeof window !== 'undefined') {
			try {
				const { ethereum } = window;
				ethereum?.on('accountsChanged', (accounts) => {
					if (dispatch) {
						dispatch(setUser(accounts[0]));
					}
				});

				ethereum?.on('chainChanged', (chain) => {
					const chainId = parseInt(chain);
					switchNetwork(chainId);
				});
			} catch (err) {
				console.log('Error in metamask event listener', err); // eslint-disable-line no-console

				// CODE: 107
				sendLog(107, err, { connectorId: account?.connector?.id });
			}
		}
	}, [account]);

	useEffect(() => {
		if (drawerOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [drawerOpen]);

	useEffect(() => {
		if (signer) {
			signer
				.getAddress()
				.then((address) => {
					dispatch(setUser(address));
				})
				.catch((err) => {
					console.log("Couldn't get address from signer", err); // eslint-disable-line no-console
					// CODE: 108
					sendLog(108, err, { isSigner: signer._isSigner });
				});
		}
	}, [signer]);

	useEffect(() => {
		ReactTooltip.rebuild();
	});

	return (
		<Box position="fixed" top="0" left="0" width="100%" zIndex={14} column>
			<TooltipPortal />
			<Toaster position="top-center" />
			<Box bg="sky-blue-10" py={!user.exists ? 'ms' : '0'} order={{ mobS: 2, tabS: 1 }}>
				<Box width={{ mobS: '95%', tabS: '90vw', deskM: '136rem' }} mx="auto">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box row alignItems="center">
							<Box
								display={{ mobS: 'block', tabS: 'none' }}
								mr="mm"
								row
								alignItems="center"
								height="2.4rem"
								onClick={() => setDrawerOpen(true)}
							>
								<List size={24} />
							</Box>
							<Drawer {...{ drawerOpen, setDrawerOpen }} />
							<Link href="/" passHref>
								<Box
									position="relative"
									height={{ mobS: '2.43rem', tabS: '3rem' }}
									width={{ mobS: '9.7rem', tabS: '12rem' }}
								>
									<Image
										src="https://ik.imagekit.io/chainlabs/Schmint/brand_ast6C-3H3.svg"
										alt="schmint"
										style={{ cursor: 'pointer' }}
										layout="fill"
									/>
								</Box>
							</Link>
						</Box>
						<Box row center>
							<NavItem url={BLOGS_URL} text="Blogs" />
							<ConnectWallet networkProps={networkProps} />
						</Box>
					</Box>
				</Box>
			</Box>
			<If condition={user.exists} then={<Banners {...{ networkProps, setNetworkProps }} />} />
		</Box>
	);
};

export default DappNavbar;
