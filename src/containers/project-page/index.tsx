import React from 'react';
import Box from 'src/components/Box';
import Banner from './Banner';
import ContractDetails from './ContractDetails';
import theme from 'src/styleguide/theme';
import SchmintForm from './SchmintForm';

const Projectpage = ({ collection }) => {
	const [schmintCreated, setSchmintCreated] = React.useState(false);
	if (collection.title) {
		return (
			<Box center column>
				<Banner collection={collection} />
				<ContractDetails collection={collection} showDetails schmintCreated={schmintCreated} />
				<Box borderTop={`1px solid ${theme.colors['gray-20']}`} width="100%" my="wxs" />
				<SchmintForm collection={collection} setSchmintCreated={setSchmintCreated} />
			</Box>
		);
	}
	return null;
};

export default Projectpage;
