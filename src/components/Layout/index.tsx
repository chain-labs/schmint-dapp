import Image from 'next/image';
import { useRouter } from 'next/router';
import { SIMPLR_URL } from 'src/constants';
import Box from 'components/Box';
import Avatar from './Avatar';
import MenuItems from './MenuItems';
import HomeNavbar from 'components/HomeNavbar';
import DappNavbar from 'components/DappNavbar';
import { userSelector } from 'src/redux/user';
import { useAppSelector } from 'src/redux/hooks';
import { indexAddress } from './utils';
import React, { useEffect } from 'react';

const Layout = ({ children }) => {
	const router = useRouter();
	const user = useAppSelector(userSelector);
	const isHome = router.pathname === '/' || router.pathname === '/learn-more';

	const [windowHeight, setWindowHeight] = React.useState(0);

	useEffect(() => {
		setWindowHeight(window.innerHeight);
		window.addEventListener('resize', () => {
			setWindowHeight(window.innerHeight);
		});
	}, []);

	const getSidebarHeight = () => {
		const height = windowHeight;
		return (height - 115 - 24) / 10;
	};

	const setLayoutStripBg = () => {
		if (!user.exists) {
			return 'yellow-30';
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
		<Box>
			<DappNavbar />
			<Box minHeight="16.8rem" bg={setLayoutStripBg()} width="100vw"></Box>
			<Box row>
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
					<MenuItems />
				</Box>
				<Box width="29.2rem"></Box>
				<Box flex={1}>{children}</Box>
			</Box>
		</Box>
	);
};

export default Layout;
