import Image from 'next/image';
import { useRouter } from 'next/router';
import { SIMPLR_URL } from 'src/constants';
import Box from 'components/Box';
import Avatar from './Avatar';
import MenuItems from './MenuItems';
import HomeNavbar from 'components/HomeNavbar';
import DappNavbar from 'components/DappNavbar';
import { userSelector } from 'src/redux/user';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { indexAddress } from './utils';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import Loader from 'components/Loader';
import { setScheduler } from 'src/redux/scheduler';
import If from 'components/If';
import { GET_USER_SCHEDULER } from 'src/graphql/query/GetUserScheduler';
import Footer from '../Footer';
import { networkSelector, setNetwork } from 'src/redux/network';
import { useNetwork } from 'wagmi';
import Text from '../Text';
import ButtonComp from '../Button';
import Link from 'next/link';
import WrongNetworkAlert from 'src/containers/WrongNetworkAlert';
import { TEST_ENV } from 'src/utils/constants';
import React from 'react';

const Layout = ({ children }) => {
	const router = useRouter();
	const user = useAppSelector(userSelector);
	const [userHasScheduler, setUserHasScheduler] = useState(false);
	const isHome = router.pathname === '/' || router.pathname === '/learn-more';
	const network = useAppSelector(networkSelector);
	const { chains, chain } = useNetwork();
	const [showWrongNetworkAlert, setShowWrongNetworkAlert] = React.useState<boolean>(false);
	const [loadScheduler, { called, loading }] = useLazyQuery(GET_USER_SCHEDULER, {
		onCompleted: (data) => {
			const scheduler = data?.schedulers?.[0];
			if (scheduler && scheduler?.owner?.toLowerCase() === user.address.toLowerCase()) {
				setUserHasScheduler(true);
				dispatch(
					setScheduler({
						owner: scheduler.owner ?? '',
						schedulerAddress: scheduler.id ?? '',
						avatar: scheduler.safe ?? '',
						schmints: scheduler.schmints ?? [],
					})
				);
			} else {
				setUserHasScheduler(false);
				dispatch(
					setScheduler({
						owner: '',
						schedulerAddress: '',
						avatar: '',
						schmints: [],
					})
				);
				if (router.pathname === '/my-assets') {
					router.replace('/explore', undefined, { shallow: true });
				}
			}
		},
		pollInterval: 8000,
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (
			network.isOnline &&
			!network.isValid &&
			(router.asPath === '/explore' || router.asPath === '/my-assets' || router.asPath === '/my-schmints')
		) {
			setShowWrongNetworkAlert(true);
		} else {
			setShowWrongNetworkAlert(false);
		}
	}, [network.isOnline, network.isValid, router.asPath]);

	const [windowHeight, setWindowHeight] = React.useState(0);

	useEffect(() => {
		setWindowHeight(window.innerHeight);
		const resize = () => {
			setWindowHeight(window.innerHeight);
		};
		window.addEventListener('resize', resize);
		window?.ethereum?.on('chainChanged', (chain) => {
			const name = chains.find((c) => c.id === parseInt(chain))?.name;
			dispatch(
				setNetwork({
					chainId: parseInt(chain),
					name: name ?? '',
				})
			);
		});

		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	useEffect(() => {
		if (user.address && network.isValid) {
			loadScheduler({
				variables: {
					id: user.address.toLowerCase(),
				},
			});
		}
	}, [user.address, network.apolloClient]);

	useEffect(() => {
		if (chain?.id) {
			dispatch(setNetwork({ chainId: chain?.id, name: chain?.name }));
		}
	}, [chain]);

	const getSidebarHeight = () => {
		const height = windowHeight;
		return (height - 115 - 24) / 10;
	};

	const setLayoutStripBg = () => {
		if (!user.exists) {
			return 'gray-20';
		} else {
			const index = indexAddress(user.address);
			switch (index) {
				case 1:
					return 'pfp-purple';
				case 2:
					return 'pfp-red';
				case 3:
					return 'yellow-30';
				case 4:
					return 'pfp-gray';
			}
		}
	};

	if (isHome) {
		return (
			<Box>
				{children}
				<HomeNavbar />
				<Box center position="fixed" bottom="0" py="mxl" width="100vw">
					<Box as="a" href={SIMPLR_URL} target="_blank" position="relative" height="3.3rem" width="11.1rem">
						<Image
							src="https://ik.imagekit.io/chainlabs/Schmint/simplr-brand_AziSwlVYT.svg"
							alt="Simplr"
							layout="fill"
						/>
					</Box>
				</Box>
			</Box>
		);
	}
	return (
		<Box overflowX="hidden">
			<Box display={{ mobS: 'block', tabS: 'none' }}>
				<HomeNavbar />
				<Box
					height="100vh"
					width="100vw"
					bg="simply-white"
					zIndex={15}
					center
					column
					position="absolute"
					top="0"
					left="0"
				>
					<Box position="relative" height="12.5rem" width="12.5rem">
						<Image
							src="https://ik.imagekit.io/chainlabs/Schmint/Pause_HydHebOXS.png"
							layout="fill"
							objectFit="cover"
						/>
					</Box>
					<Text as="h5" color="gray-50" textAlign="center" maxWidth="32rem" mt="mxl">
						{
							"Schmint is currently only available for desktop devices.But don't worry, Schmint for mobile will be available soon."
						}
					</Text>
					<Link href="/" passHref>
						<CustomButtonComponent />
					</Link>
				</Box>
			</Box>
			<DappNavbar />
			<Box minHeight="16.8rem" bg={setLayoutStripBg()} width="100vw"></Box>
			<Box row minHeight={`${windowHeight - 168}px`}>
				<Box
					position="fixed"
					left="24px"
					top="115px"
					borderRadius="8px"
					height={`${getSidebarHeight()}rem`}
					bg="sky-blue-10"
					width="26.8rem"
					border="1px solid"
					borderColor="blue-10"
					boxShadow="shadow-300"
					column
					px="mxl"
				>
					<Avatar />
					<MenuItems userHasScheduler={userHasScheduler} />
				</Box>
				<Box width="29.2rem"></Box>
				<Box flex={1}>
					<If
						condition={!user.exists || (called && !loading) || !network.isValid}
						then={children}
						else={<Loader msg="Loading..." minHeight={`${windowHeight - 167}px`} />}
					/>
				</Box>
			</Box>
			<If
				condition={showWrongNetworkAlert}
				then={
					<WrongNetworkAlert
						customText="This network is currently not supported. Switch to a supported network."
						chainTo={TEST_ENV ? 5 : 137}
						setWrongNetwork={setShowWrongNetworkAlert}
					/>
				}
			/>
			<Footer />
		</Box>
	);
};

export default Layout;

const CustomButtonComponent = React.forwardRef((props, ref) => (
	<ButtonComp bg="primary" mt="wxs" px="wxxs" py="ms" innerRef={ref}>
		<Text as="btn1">Back to Home</Text>
	</ButtonComp>
));
