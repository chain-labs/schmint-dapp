import { useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';

const illustration = 'https://ik.imagekit.io/chainlabs/Schmint/pablo-list-is-empty_1__1__Ux_bWTmMO.svg';

const TEXTS = [
	'You haven’t created any schmints yet. Head to the explore tab to create your first schmint.',
	'You don’t have any active schmints at the moment. Explore projects to create one.',
	'Once complete, your active schmints will move to this page.',
	'All your Schmints will appear on this page.',
];

const NoSchmintComponent = ({ page = 0 }: { page: number }) => {
	const user = useAppSelector(userSelector);
	const router = useRouter();
	const { openConnectModal } = useConnectModal();
	const [text, setText] = useState('');

	const handleCTA = () => {
		if (user.exists) {
			router.push('/explore');
		} else {
			openConnectModal();
		}
	};

	useEffect(() => {
		if (!user.exists) {
			setText(TEXTS[3]);
		} else setText(TEXTS[page]);
	}, [page]);

	return (
		<Box mt="wm">
			<Box position="relative" width="40rem" height="23rem" mx="auto">
				<Image src={illustration} alt="No Schmint" layout="fill" />
			</Box>
			<Text as="b3" color="gray-40" mt="mxs" textAlign="center" maxWidth="40rem" mx="auto">
				{text}
			</Text>
			<If
				condition={page < 2}
				then={
					<Box mt="mxl" center>
						<ButtonComp bg="primary" py="ms" px="mxl" borderRadius="64px" onClick={handleCTA} mx="auto">
							<Text as="btn2">{user.exists ? 'Explore Projects' : 'Connect Wallet'}</Text>
						</ButtonComp>
					</Box>
				}
			/>
		</Box>
	);
};

export default NoSchmintComponent;
