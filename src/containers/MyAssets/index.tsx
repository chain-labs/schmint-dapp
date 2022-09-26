import Image from 'next/image';
import { ArrowUpRight, SketchLogo } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Loader from 'src/components/Loader';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { getAbi } from 'src/utils/contracts';
import { useContractRead, useNetwork } from 'wagmi';
import { getGnosisSafeUrl } from './utils';

const PLACEHOLDER_AVATAR = '0x6447eAF782AAcC791483c1fbA3C8C22f22C3281D';

const MyAssetsComponent = () => {
	const { chain } = useNetwork();
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);
	const [windowHeight, setWindowHeight] = useState(0);

	useEffect(() => {
		setWindowHeight(window.innerHeight);
		window.addEventListener('resize', () => {
			setWindowHeight(window.innerHeight);
		});
	}, []);

	const { data, isLoading } = useContractRead({
		addressOrName: scheduler.schedulerAddress,
		contractInterface: getAbi(chain?.id, 'SCHEDULER'),
		functionName: 'avatar',
	});

	if (user.exists && scheduler.owner && !isLoading) {
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
					<Box as="a" borderRadius="64px" href={getGnosisSafeUrl(chain?.id, `${data}`)} target="_blank">
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
