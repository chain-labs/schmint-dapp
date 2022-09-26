import { Binoculars, SketchLogo, StarFour, Wallet } from 'phosphor-react';
import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import Box from '../Box';
import If from '../If';
import MenuItem from './MenuItem';

const MenuItems = ({ userHasScheduler }) => {
	const user = useAppSelector(userSelector);
	return (
		<Box mt="wxxs">
			<MenuItem Icon={Binoculars} text="Explore" route="/explore" />
			<Box mt="mm" />
			<MenuItem Icon={StarFour} text="My Schmints" route="/my-schmints" />
			<If
				condition={user.exists && userHasScheduler}
				then={
					<React.Fragment>
						<Box mt="mm" />
						<MenuItem Icon={SketchLogo} text="My Assets" route="/my-assets" />
						<Box mt="mm" />
						<MenuItem Icon={Wallet} text="Wallet" route="/wallet" />
					</React.Fragment>
				}
			/>
		</Box>
	);
};

export default MenuItems;
