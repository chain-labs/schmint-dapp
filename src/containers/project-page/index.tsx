import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import Banner from './Banner';
import ContractDetails from './ContractDetails';
import SchmintForm from './SchmintForm';
import ReactReadMoreReadLess from 'react-read-more-read-less';

const Projectpage = () => {
	const getData = async () => {
		const data = await fetch('https://chain-labs.github.io/schmint-projects/projects.json');
		return await data.json();
	};

	useEffect(() => {
		getData().then((res) => console.log(res));
	}, []);

	return (
		<Box center column>
			<Banner />
			<Box width="55.8rem" center column>
				<ReactReadMoreReadLess
					charLimit={20}
					readMoreText={'Read more'}
					// readLessText={'Read less'}
					readMoreClassName="read-more-less--more"
					// readLessClassName="read-more-less--less"
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin
					vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget
					condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices.
					Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus
					elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
					posuere
				</ReactReadMoreReadLess>
				<ContractDetails />
				<SchmintForm />
			</Box>
		</Box>
	);
};

export default Projectpage;
