import { Binoculars, SketchLogo, StarFour } from 'phosphor-react';

import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import Box from 'components/Box';
import MenuItem from './MenuItem';

const MenuItems = ({ userHasScheduler }) => {
	const user = useAppSelector(userSelector);
	return (
		<Box mt="wxxs">
			<MenuItem Icon={Binoculars} text="Explore" route="/explore" />
			<Box mt="mm" />
			<MenuItem Icon={StarFour} text="My Schmints" route="/my-schmints" />
			<Box mt="mm" />
			<MenuItem
				Icon={SketchLogo}
				text="My Assets"
				route="/my-assets"
				disabled={!user.exists || !userHasScheduler}
			/>
		</Box>
	);
};

export default MenuItems;
