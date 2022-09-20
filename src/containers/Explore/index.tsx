import { Binoculars } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import Filters from './Filters';
import CollectionsList from './CollectionsList';
import SearchInput from './SearchInput';

const ExploreComp = () => {
	return (
		<Box pl="mxl" pt="wxs" width="81.7rem" pb="21rem">
			<Box row alignItems="center" justifyContent="space-between" mb="mxl">
				<Box row alignItems="center">
					<Binoculars size={40} color={theme.colors['blue-40']} weight="fill" />
					<Text as="h4" ml="mxs">
						Explore
					</Text>
				</Box>
				<Box alignSelf="flex-end" cursor="pointer">
					<Text as="btn2" color="simply-blue">
						Submit a project
					</Text>
				</Box>
			</Box>
			<SearchInput />
			<Filters />
			<CollectionsList />
		</Box>
	);
};

export default ExploreComp;
