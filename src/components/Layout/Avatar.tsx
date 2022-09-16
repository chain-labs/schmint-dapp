import Image from 'next/image';
import { Copy } from 'phosphor-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { useEnsName } from 'wagmi';
import Box from '../Box';
import { condenseAddress } from '../DappNavbar/ConnectWallet';
import If from '../If';
import Text from '../Text';
import { indexAddress } from './utils';

const Avatar = () => {
	const [userNo, setUserNo] = useState(0);
	const user = useAppSelector(userSelector);
	const { data } = useEnsName({ address: user?.address });

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

	return (
		<Box column center mt="wm">
			<Box height="8rem" width="8rem" position="relative" mb="mxs">
				<Image src={sanitizePfpUrl()} layout="fill" />
			</Box>
			<Box row alignItems="center">
				<Text as="h6" mr="mxxs">
					{data ?? condenseAddress(user.address)}
				</Text>
				<If
					condition={user.exists}
					then={
						<Copy
							color={theme.colors['blue-40']}
							size={16}
							style={{ cursor: 'pointer' }}
							onClick={() => {
								navigator.clipboard?.writeText(user.address);
								toast.success('Copied');
							}}
						/>
					}
				/>
			</Box>
		</Box>
	);
};

export default Avatar;
