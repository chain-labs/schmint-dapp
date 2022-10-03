import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import Banner from './Banner';
import ContractDetails from './ContractDetails';
import SchmintForm from './SchmintForm';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import ReadMore from './components/ReadMore';
import theme from 'src/styleguide/theme';

const Projectpage = ({ project }) => {
	// const getData = async () => {
	// 	const data = await fetch('https://chain-labs.github.io/schmint-projects/projects.json');
	// 	return await data.json();
	// };

	// useEffect(() => {
	// 	getData().then((res) => console.log(res));
	// }, []);

	return (
		<Box center column>
			<Banner project={project} />
			<ContractDetails project={project} showDetails />
			<Box borderTop={`1px solid ${theme.colors['gray-20']}`} width="100%" my="wxs" />
			<SchmintForm project={project} />
		</Box>
	);
};

export default Projectpage;
