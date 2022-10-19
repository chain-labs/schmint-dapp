import { TwitterFill } from 'akar-icons';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, GlobeSimple, StarFour, TwitterLogo } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import { useNetwork } from 'wagmi';
import ReadMore from './components/ReadMore';
import Social from './components/Social';

interface props {
	collection?: any;
	showDetails?: boolean;
	schmintCreated?: boolean;
}

const ContractDetails = ({ collection, showDetails, schmintCreated }: props) => {
	const { chains } = useNetwork();
	const [chainExplorer, setChainExplorer] = useState('');
	const [projectTwitterHandle, setProjectTwitterHandle] = useState('');
	const [projectWebsiteUrl, setProjectWebsiteUrl] = useState('');

	useEffect(() => {
		const chain = chains.find((chain) => chain.id === collection?.network?.chainId);
		setChainExplorer(chain?.blockExplorers?.etherscan?.url);
		setProjectTwitterHandle(collection.twitter_url.slice(20));
		setProjectWebsiteUrl(collection.id);
	}, [chains, collection]);

	return (
		<Box center column>
			<If
				condition={schmintCreated}
				then={
					<Box bg="green-20" px="mxs" py="ms" borderRadius="8px" row mt="mm">
						<StarFour size={32} color={theme.colors['green-60']} weight="fill" />
						<Box ml="mm" width="52.8rem">
							<Text as="h6" color="simply-black">
								Schmint Created!
							</Text>
							<Text as="b3" color="gray-50" mt="mxs">
								You have successfully created a Schmint for Abstract 3D.
							</Text>
							<Box row>
								<Link href={`/my-schmints`} passHref>
									<ButtonComp
										bg="tertiary"
										px="mxl"
										py="ms"
										borderRadius="64px"
										row
										center
										mt="mm"
										color="simply-black"
										mr="mxxs"
									>
										<Text as="btn2" mr="mxxs">
											View
										</Text>
										<ArrowUpRight size={16} />
									</ButtonComp>
								</Link>
								<Link
									target="_blank"
									href={`https://twitter.com/intent/tweet?text=I%20just%20schminted%20%40${projectTwitterHandle}%27s%20NFT%20using%20%40simplrhq%27s%20Schmint.%0AYou%20can%20schedule%20your%20mint%20on%20Schmint%3A%20https%3A//schmint.simplrhq.com/projects/${projectWebsiteUrl}%0A%23justSchmintIt%20%23NoMoreFomo`}
									passHref
								>
									<ButtonComp
										bg="tertiary"
										px="mxl"
										py="ms"
										borderRadius="64px"
										row
										center
										mt="mm"
										color="simply-black"
									>
										<Text as="btn2" mr="mxxs">
											Share on twitter
										</Text>
										<TwitterLogo weight="fill" size={16} />
									</ButtonComp>
								</Link>
							</Box>
						</Box>
					</Box>
				}
			/>
			<Box
				width="45.7rem"
				backgroundColor="#F7FAFF"
				my="mm"
				row
				justifyContent="space-between"
				border={`1px solid ${theme.colors['blue-20']} `}
				borderRadius="8px"
				p="mm"
			>
				<ContractItem
					text="Blockchain"
					subText={collection?.network?.name}
					network={collection?.network?.name}
				/>
				<ContractItem text="Price" subText={collection?.price} />
				<ContractItem text="Supply" subText={collection?.supply} />
				<ContractItem text="Token Standard" subText={collection.tokenStandard} />
			</Box>
			{showDetails ? (
				<Box>
					<ReadMore mainText={collection?.description} />
					<Box mb="mm">
						<Text as="b2" center>
							<Box as="span" mr="mxs" center>
								<GlobeSimple size={24} />
							</Box>
							Website:
							<Box as="span" color="simply-blue" ml="mxs">
								{collection?.website_url}
							</Box>
						</Text>
					</Box>
					<Box center>
						<If
							condition={collection?.contractAddress || collection?.socials}
							then={
								<Box
									border={`1px solid ${theme.colors['gray-20']}`}
									borderRadius="4px"
									row
									maxWidth="40%"
								>
									<If
										condition={collection?.socials?.discord}
										then={<Social border status="discord" />}
									/>
									<If
										condition={collection?.socials?.twitter}
										then={<Social border status="twitter" />}
									/>
									<Social
										status="etherscan"
										link={`${chainExplorer}/address/${collection?.contractAddress}`}
									/>
								</Box>
							}
						/>
					</Box>
				</Box>
			) : (
				''
			)}
		</Box>
	);
};

export default ContractDetails;

const ContractItem = ({ text, subText, network }: { text?: string; subText?: string; network?: string }) => {
	return (
		<Box column>
			<Text as="b2" fontWeight="medium" color="#000000">
				{text}
			</Text>
			<Text as="b3" color="gray-50" row alignItems="center" mt="mxs">
				{subText ? subText : 'N/A'}
				<If
					condition={!!network}
					then={
						<Box position="relative" height="1.6rem" width="1.6rem" ml="mxxs">
							<Image
								src={`/static/images/svgs/${
									network === 'Ethereum' || network === 'Goerli' ? 'eth' : 'polygon-color'
								}.svg`}
								layout="fill"
							/>
						</Box>
					}
				/>
			</Text>
		</Box>
	);
};
