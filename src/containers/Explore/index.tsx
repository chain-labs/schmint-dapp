import { Binoculars } from 'phosphor-react';

import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import Filters from './Filters';
import CollectionsList from './CollectionsList';
import SearchInput from './SearchInput';
import React, { useEffect, useState } from 'react';

const ExploreComp = () => {
	const [showPastProjects, setShowPastProjects] = React.useState(0);
	const [all, setAll] = useState('simply-blue');
	const [active, setActive] = useState('gray-30');

	const handleClick = (status) => {
		setShowPastProjects(status);
		if (status === 1) {
			setActive('simply-blue');
			setAll('gray-30');
		}
		if (status === 0) {
			setAll('simply-blue');
			setActive('gray-30');
		}
	};
	return (
		<Box pl="mxl" pt="wxs" width="70%" pb="21rem">
			<Box row alignItems="center" justifyContent="space-between" mb="mxl">
				<Box row alignItems="center">
					<Binoculars size={40} color={theme.colors['blue-40']} weight="fill" />
					<Text as="h4" ml="mxs">
						Explore
					</Text>
				</Box>
				<Box
					alignSelf="flex-end"
					cursor="pointer"
					as="a"
					href="https://form.jotform.com/222922224502041"
					target="_blank"
				>
					<Text as="btn2" color="simply-blue">
						Submit a project
					</Text>
				</Box>
				{/* </Link> */}
			</Box>
			<SearchInput />
			<React.Fragment>
				<Box mt="wxs" row alignItems="center">
					<Text as="h5" color={all} onClick={() => handleClick(0)} cursor="pointer">
						Projects
					</Text>
					<Box mx="mm" height="2rem" bg="gray-30" width="0.1rem" />
					<Text as="h5" color={active} onClick={() => handleClick(1)} cursor="pointer">
						Active Mints
					</Text>
				</Box>
			</React.Fragment>
			<Filters />
			<CollectionsList showPastProjects={showPastProjects} />
		</Box>
	);
};

export default ExploreComp;
