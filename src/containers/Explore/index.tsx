import { Binoculars } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import theme from 'src/styleguide/theme';

const ExploreComp = () => {
	return (
		<Box px="mxl" pt="wxs" border="2px solid teal">
			<Box>
				<Binoculars size={40} color={theme.colors['blue-40']} weight="fill" />
			</Box>
		</Box>
	);
};

export default ExploreComp;
