import { format } from 'date-fns';
import { ArrowUpRight } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

const getPriceUnit = (collection) => {
	if (collection.price) {
		switch (collection.network.name) {
			case 'Ethereum':
				return 'ETH';
			case 'Polygon':
				return 'MATIC';
		}
	}
	return '';
};

const CollectionTile = ({ idx, collection }) => {
	return (
		<Box
			key={`col-${idx}`}
			borderRadius="8px"
			bg="sky-blue-10"
			border={`1px solid ${theme.colors['sky-blue-20']}`}
			p="mm"
			mb="mm"
			row
			between
		>
			<Box row alignItems="center">
				<Box
					width="15.2rem"
					height="10.8rem"
					borderRadius="4px"
					as="img"
					src={collection.banner}
					objectFit="cover"
				></Box>
				<Box ml="mm">
					<Text as="h6" mb="mxxs">
						{collection.title}
					</Text>
					<Text as="b3" mb="0.2rem">
						{`Minting Starts: ${format(collection.startTimestamp * 1000, 'LLL d yyyy, hh:mm a, OOOO')}`}
					</Text>
					<Text as="b3" mb="0.2rem">
						{`Blockchain: ${collection.network.name}`}
					</Text>
					<Text as="b3">
						{`Price: ${collection.price > 0 ? collection.price : 'Free'} ${getPriceUnit(collection)}`}
					</Text>
				</Box>
			</Box>
			<Box column>
				<ButtonComp bg="primary" color="white" width="11rem" height="3.6rem" borderRadius="64px" mb="ms">
					<Text as="btn2">View</Text>
				</ButtonComp>
				<a href={collection.website_url} target="_blank" rel="noreferrer">
					<ButtonComp
						bg="tertiary"
						color="gray-50"
						width="11rem"
						height="3.6rem"
						borderRadius="64px"
						row
						center
						css={`
							&:hover {
								color: ${theme.colors['simply-white']};
								background-color: ${theme.colors['gray-50']};
							}
						`}
					>
						<Text as="btn2" mr="0.2rem">
							Site
						</Text>
						<ArrowUpRight size={16} />
					</ButtonComp>
				</a>
			</Box>
		</Box>
	);
};

export default CollectionTile;
