import { GlobeSimple } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import ReadMore from './components/ReadMore';
import Social from './components/Social';

interface props {
	project: any;
	showDetails?: boolean;
}

const ContractDetails = ({ project, showDetails }: props) => {
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
				<ContractItem text="Blockchain" subText={project?.network?.name} />
				<ContractItem text="Price" subText={project.price} />
				<ContractItem text="Supply" subText={project.supply} />
				<ContractItem text="Token Standard" subText="ERC21A" />
			</Box>
			{showDetails ? (
				<Box>
					<ReadMore mainText={project?.description} />
					<Box mb="mm">
						<Text as="b2" center>
							<Box as="span" mr="mxs" center>
								<GlobeSimple size={24} />
							</Box>
							Website:
							<Box as="span" color="simply-blue" ml="mxs">
								{project?.website_url}
							</Box>
						</Text>
					</Box>
					<Box border={`1px solid ${theme.colors['gray-20']}`} borderRadius="4px" row>
						<Social border status="discord" />
						<Social border status="twitter" />
						<Social status="etherscan" />
					</Box>
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
