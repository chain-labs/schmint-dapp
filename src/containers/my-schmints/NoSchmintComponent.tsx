import { useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { userAgent } from 'next/server';
import React from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';

const illustration = 'https://ik.imagekit.io/chainlabs/Schmint/pablo-list-is-empty_1__1__Ux_bWTmMO.svg';

const NoSchmintComponent = () => {
	const user = useAppSelector(userSelector);
	const router = useRouter();
	const { openConnectModal } = useConnectModal();

	const handleCTA = () => {
		if (user.exists) {
			router.push('/explore');
		} else {
			openConnectModal();
		}
	};

	return (
		<Box mt="wm">
			<Box position="relative" width="40rem" height="23rem" mx="auto">
				<Image src={illustration} alt="No Schmint" layout="fill" />
			</Box>
			<Text as="b3" color="gray-40" mt="mxs" textAlign="center">
				All your Schmints will appear on this page.
			</Text>
			<Box mt="mxl" center>
				<ButtonComp bg="primary" py="ms" px="mxl" borderRadius="64px" onClick={handleCTA} mx="auto">
					<Text as="btn2">{user.exists ? 'Explore Projects' : 'Connect Wallet'}</Text>
				</ButtonComp>
			</Box>
		</Box>
	);
};

export default NoSchmintComponent;
