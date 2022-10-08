import { GlobeSimple } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import ReadMore from './components/ReadMore';
import Social from './components/Social';

interface props {
	collection?: any;
	showDetails?: boolean;
}

const ContractDetails = ({ collection, showDetails }: props) => {
	return (
		<Box center column>
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
