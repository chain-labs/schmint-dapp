import { Binoculars, SketchLogo, StarFour, Wallet } from 'phosphor-react';
import React from 'react';
import Box from '../Box';
import MenuItem from './MenuItem';

const MenuItems = () => {
	return (
		<Box mt="wxxs">
			<MenuItem Icon={Binoculars} text="Explore" route="/explore" />
			<Box mt="mm" />
			<MenuItem Icon={StarFour} text="My Schmints" route="/my-schmints" />
			<Box mt="mm" />
			<MenuItem Icon={SketchLogo} text="My Assets" route="/my-assets" />
			<Box mt="mm" />
			<MenuItem Icon={Wallet} text="Wallet" route="/wallet" />
		</Box>
	);
};

export default MenuItems;
