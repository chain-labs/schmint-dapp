import Image from 'next/image';
import { ArrowUpRight, SketchLogo } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Loader from 'src/components/Loader';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/network';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { getGnosisSafeUrl } from './utils';

const MyAssetsComponent = () => {
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);
	const [windowHeight, setWindowHeight] = useState(0);
	const network = useAppSelector(networkSelector);

	useEffect(() => {
		setWindowHeight(window.innerHeight);
		window.addEventListener('resize', () => {
			setWindowHeight(window.innerHeight);
		});
	}, []);

	if (user.exists && scheduler.owner) {
		return (
			<Box pl="mxl" pt="wxs">
				<Box row alignItems="center">
					<SketchLogo color={theme.colors['blue-40']} size={40} />
					<Text as="h4" ml="mxs">
						My Assets
					</Text>
				</Box>
				<Box mt="14rem" column center mb="20rem">
					<Box mb="mxs" width="40rem" height="22.4rem" position="relative">
						<Image
							src="https://ik.imagekit.io/chainlabs/Schmint/my-assets-illustration.svg"
							layout="fill"
							objectFit="cover"
						/>
					</Box>
					<Text as="b3" color="gray-40" maxWidth="40rem" textAlign="center" mb="mxl">
						{
							"We're currently working to create a simplr way to manage your assets and funds. In the meantime, you can use Gnosis Safe to do the same."
						}
					</Text>
					<Box
						as="a"
						borderRadius="64px"
						href={getGnosisSafeUrl(network.chainId, `${scheduler.avatar}`)}
						target="_blank"
					>
						<ButtonComp bg="primary" py="ms" px="mxl" borderRadius="64px" row center>
							<Text as="btn2" mr="mxxs">
								Open Gnosis Safe
							</Text>
							<ArrowUpRight color={theme.colors['simply-white']} size={20} />
						</ButtonComp>
					</Box>
				</Box>
			</Box>
		);
	} else {
		return <Loader msg="Loading..." minHeight={`${windowHeight - 167}px`} />;
	}
};

export default MyAssetsComponent;
