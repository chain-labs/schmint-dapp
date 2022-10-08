import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import { ICollection } from './projectsStore';

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

const CollectionTile = ({ idx, collection }: { idx: number; collection: ICollection }) => {
	return (
		<Box
			key={`col-${idx}-${collection.title}`}
			borderRadius="8px"
			bg="sky-blue-10"
			border={`1px solid ${theme.colors['sky-blue-20']}`}
			p="mm"
			mb="mm"
			row
			between
			css={`
				transition: all 0.2s ease-in-out;
				&:hover {
					box-shadow: ${theme.shadows['shadow-400']};
				}
			`}
		>
			<Box row alignItems="center">
				<Box
					width="19.2rem"
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
						{'Minting Starts: '}
						<span style={{ color: theme.colors['gray-50'] }}>
							{format(collection.startTimestamp * 1000, 'LLL d yyyy, hh:mm a, OOOO')}
						</span>
					</Text>
					<Box row alignItems="center" mb="0.2rem">
						<Text as="b3">{'Blockchain: '}</Text>
						<Text as="b3" ml="mxxs" color="gray-50">
							{collection.network.name}
						</Text>
						<Box position="relative" height="1.6rem" width="1.6rem" ml="mxxs">
							<Image
								src={`/static/images/svgs/${
									collection.network.name === 'Ethereum' ? 'eth' : 'polygon-color'
								}.svg`}
								layout="fill"
							/>
						</Box>
					</Box>
					<Text as="b3" mb="0.2rem">
						{'Price: '}
						<span style={{ color: theme.colors['gray-50'] }}>
							{collection.price > 0 ? `${collection.price} ${getPriceUnit(collection)}` : 'Free'}
						</span>
					</Text>
				</Box>
			</Box>
			<Box column>
				<Link href={`/projects/${collection?.id}`} passHref>
					<ButtonComp bg="primary" color="white" width="11rem" height="3.6rem" borderRadius="64px" mb="ms">
						<Text as="btn2">View</Text>
					</ButtonComp>
				</Link>
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
								background-color: ${theme.colors['simply-black']};
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
