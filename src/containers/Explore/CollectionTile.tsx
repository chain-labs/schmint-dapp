import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowUpRight, Sparkle, Users } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { GET_PROJECT_SCHMINTS } from 'src/graphql/query/GetProjectSchmints';
import theme from 'src/styleguide/theme';
import { ICollection } from './projectsStore';
import { chains } from 'src/utils/chains';
import { sendLog } from 'src/utils/logging';

const CollectionTile = ({ idx, collection }: { idx: number; collection: ICollection }) => {
	const { loading, data: schmintsList } = useQuery(GET_PROJECT_SCHMINTS, {
		variables: { target: collection.contractAddress },
		onError: (err) => {
			console.log('Error fetching Project schmints', err); // eslint-disable-line no-console

			// CODE: 123
			sendLog(123, err, { collectionId: collection.id });
		},
	});
	const router = useRouter();
	const [unit, setUnit] = useState('');
	useEffect(() => {
		if (collection?.network?.chainId) {
			try {
				const idx = chains.findIndex((c) => c.chainId === collection?.network?.chainId);
				setUnit(chains?.[idx]?.nativeCurrency.symbol);
			} catch (err) {
				console.log('Error setting unit', err); // eslint-disable-line no-console

				// CODE: 124
				sendLog(124, err, { collectionNetwork: collection?.network?.chainId });
			}
		}
	}, [collection]);

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
			position="relative"
			onClick={() => {
				router.push(`/projects?id=${collection?.id}`);
			}}
			cursor="pointer"
		>
			<If
				condition={collection?.mintTimestampNotDecided}
				then={
					<Box
						position="absolute"
						top="0"
						left="0"
						boxShadow="shadow-100"
						bg="yellow-30"
						borderRadius="8px"
						px="ms"
						py="mxs"
						row
						alignItems="center"
					>
						<Sparkle size={12} weight="fill" />
						<Text as="c2" ml="mxxs">
							Coming Soon!
						</Text>
					</Box>
				}
			/>
			<Box row alignItems="center">
				<Box
					width="19rem"
					height="13.5rem"
					borderRadius="4px"
					as="img"
					src={collection.banner}
					objectFit="cover"
				></Box>
				<Box ml="mm">
					<Text as="h6" mb="mxxs" row alignItems="center">
						{collection.title}
						<Box as="span" ml="mxs">
							<Text as="c1" color="red-40">
								{collection?.startTimestamp < parseInt((Date.now() / 1000).toString()) &&
								collection?.startTimestamp
									? 'Schminting Disabled'
									: ''}
							</Text>
						</Box>
					</Text>
					<Text as="b3" mb="0.2rem">
						{'Minting Starts: '}
						<span style={{ color: theme.colors['gray-50'] }}>
							{collection.startTimestamp
								? format(collection.startTimestamp * 1000, 'LLL d yyyy, hh:mm a, OOOO')
								: 'To Be Announced'}
						</span>
					</Text>
					<Box row alignItems="center" mb="0.2rem">
						<Text as="b3">{'Blockchain: '}</Text>
						<Text as="b3" ml="mxxs" color="gray-50">
							{collection?.network?.name ? collection.network.name : 'To Be Announced'}
						</Text>
						<If
							condition={!!collection?.network?.name}
							then={
								<Box position="relative" height="1.6rem" width="1.6rem" ml="mxxs">
									<Image
										src={
											collection.network.name === 'Ethereum' ||
											collection.network.name === 'Goerli'
												? 'https://ik.imagekit.io/chainlabs/Schmint/eth_MhN722_5zH.svg'
												: 'https://ik.imagekit.io/chainlabs/Schmint/polygon-color_NzzPwZ2jGX.svg'
										}
										layout="fill"
									/>
								</Box>
							}
						/>
					</Box>
					<Text as="b3" mb="0.2rem">
						{'Price: '}
						<span style={{ color: theme.colors['gray-50'] }}>
							<If
								condition={collection?.price === null}
								then={'To Be Announced'}
								else={
									<If
										condition={collection?.price > 0}
										then={`${collection.price} ${unit}`}
										else={'Free'}
									/>
								}
							/>
						</span>
					</Text>
					<Box
						mt="mxxs"
						row
						opacity={!loading && schmintsList?.schmints?.length > 0 ? 1 : 0}
						alignItems="center"
					>
						<Users size={16} color={theme.colors['blue-40']} weight="fill" />
						<Text as="c2" ml="mxs" color="gray-40">
							<span
								style={{ color: theme.colors['simply-black'] }}
							>{`${schmintsList?.schmints?.length} people `}</span>
							have schminted this project already
						</Text>
					</Box>
				</Box>
			</Box>
			<Box column>
				<Link href={`/projects?id=${collection?.id}`} passHref>
					<CustomButtonComponent />
				</Link>
				<a href={collection.website_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
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

const CustomButtonComponent = React.forwardRef((props, ref) => (
	<ButtonComp bg="primary" color="white" width="11rem" height="3.6rem" borderRadius="64px" mb="ms" innerRef={ref}>
		<Text as="btn2">View</Text>
	</ButtonComp>
));
