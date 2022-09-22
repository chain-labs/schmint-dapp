import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

const ContractDetails = () => {
	return (
		<Box
			width="45.7rem"
			px="mm"
			backgroundColor="#F7FAFF"
			my="4rem"
			row
			justifyContent="space-around"
			border={`1px solid ${theme.colors['blue-20']} `}
			borderRadius="8px"
			p="mm"
		>
			<Box column>
				<Text as="b2" fontWeight="bold" color="#000000">
					Blockchain
				</Text>
				<Text as="b3" color="gray-50">
					Blockchain
				</Text>
			</Box>
			<Box column>
				<Text as="b2" fontWeight="bold" color="#000000">
					Blockchain
				</Text>
				<Text as="b3" color="gray-50">
					Ethereum
				</Text>
			</Box>
			<Box column>
				<Text as="b2" fontWeight="bold" color="#000000">
					Price
				</Text>
				<Text as="b3" color="gray-50">
					Blockchain
				</Text>
			</Box>
			<Box column>
				<Text as="b2" fontWeight="bold" color="#000000">
					Blockchain
				</Text>
				<Text as="b3" color="gray-50">
					Blockchain
				</Text>
			</Box>
		</Box>
	);
};

export default ContractDetails;
