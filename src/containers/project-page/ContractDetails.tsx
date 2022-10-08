import Link from 'next/link';
import { ArrowUpRight, GlobeSimple, StarFour } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import ReadMore from './components/ReadMore';
import Social from './components/Social';

interface props {
	collection?: any;
	showDetails?: boolean;
	schmintCreated?: boolean;
}

const ContractDetails = ({ collection, showDetails, schmintCreated }: props) => {
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
								>
									<Text as="btn2" mr="mxxs">
										View
									</Text>
									<ArrowUpRight size={16} />
								</ButtonComp>
							</Link>
						</Box>
					</Box>
				}
			/>
			<Box
				width="45.7rem"
				px="mm"
				backgroundColor="#F7FAFF"
				my="mm"
				row
				justifyContent="space-around"
				border={`1px solid ${theme.colors['blue-20']} `}
				borderRadius="8px"
				p="mm"
			>
				<ContractItem text="Blockchain" subText={collection?.network?.name} />
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
					<If
						condition={collection?.socials}
						then={
							<Box center>
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
									<If
										condition={collection?.socials?.etherscan}
										then={<Social border status="etherscan" />}
									/>
								</Box>
							</Box>
						}
					/>
				</Box>
			) : (
				''
			)}
		</Box>
	);
};

export default ContractDetails;

const ContractItem = ({ text, subText }) => {
	return (
		<Box column>
			<Text as="b2" fontWeight="medium" color="#000000">
				{text}
			</Text>
			<Text as="b3" color="gray-50">
				{subText}
			</Text>
		</Box>
	);
};
