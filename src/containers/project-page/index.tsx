import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import Banner from './Banner';
import ContractDetails from './ContractDetails';
import SchmintForm from './SchmintForm';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import ReadMore from './components/ReadMore';
import theme from 'src/styleguide/theme';

const Projectpage = ({ collection }) => {
	return (
		<Box center column>
			<Banner collection={collection} />
			<ContractDetails collection={collection} showDetails />
			<Box borderTop={`1px solid ${theme.colors['gray-20']}`} width="100%" my="wxs" />
			<SchmintForm collection={collection} />
		</Box>
	);
};

export default Projectpage;