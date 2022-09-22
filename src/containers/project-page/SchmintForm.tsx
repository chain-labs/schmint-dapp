import { CaretDown, CaretUp } from 'phosphor-react';
import React, { useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import theme from 'src/styleguide/theme';
import AlertBox from './components/AlertBox';
import InputBox from './components/InputBox';

const SchmintForm = () => {
	const [showOptions, setShowOptions] = useState(false);
	const [nft, setNft] = useState('');
	return (
		<Box width="54.8rem" px="mxl">
			<Text textAlign="start" mb="3rem" as="h5">
				Schmint Details
			</Text>
			<InputBox
				placeholder="5"
				value={nft}
				detailText="This contract allows upto 5 NFTs per wallet"
				label="Number"
				setValue={setNft}
			/>
			<Text
				as="b3"
				onClick={() => setShowOptions(!showOptions)}
				cursor="pointer"
				my="3.3rem"
				color="blue-40"
				fontWeight="bold"
			>
				Show advanced options
				<Box as="span" ml="0.5rem">
					<If condition={showOptions === false} then={<CaretUp size={16} />} else={<CaretDown size={16} />} />
				</Box>
			</Text>
			<If
				condition={showOptions === true}
				then={
					<Box>
						<InputBox
							label="Maximum Gas Limit"
							placeholder="5"
							value=""
							detailText="This contract allows upto 5 NFTs per wallet"
						/>
						<InputBox
							label="Maximum Gas Limit"
							placeholder="5"
							value=""
							detailText="This contract allows upto 5 NFTs per wallet"
						/>
					</Box>
				}
			/>
			<Box borderTop={`1px solid ${theme.colors['gray-30']}`} width="100%" mt="mxxxl" />
			<Text as="h5" mt="mxxxl">
				Cost
			</Text>
			<Box backgroundColor={`${theme.colors['gray-20']}`} px="mm" pb="mxs" mt="mm">
				<Box between pt="mxs">
					<Text as="b3">Contract</Text>
					<Text as="b3">0x225eB7E5420bC20e</Text>
				</Box>
				<Box between pt="mxs">
					<Text as="b3">Contract</Text>
					<Text as="b3">0x225eB7E5420</Text>
				</Box>
			</Box>
			<Box column justifyContent="flex-end" alignItems="flex-end" pt="mxs" width="100%">
				<Box between width="50%">
					<Text as="b3">Contract</Text>
					<Text as="b3">0x225eB7E5420bC20e</Text>
				</Box>
				<Box between width="50%">
					<Text as="b3">Contract</Text>
					<Text as="b3">0x225eB7E</Text>
				</Box>
			</Box>
			<AlertBox />
			<Box center column mt="mxxxl">
				<ButtonComp bg="primary" color="white" width="23.4rem" height="4.8rem" borderRadius="64px">
					<Text as="btn1">Create Schmint</Text>
				</ButtonComp>
				<Text as="b3" mt="mm" textAlign="center" color={`${theme.colors['gray-40']}`}>
					Clicking “Create Schmint” will also create a create for you a pesonal scheduler which will be used
					to store the schmint.
				</Text>
			</Box>
		</Box>
	);
};

export default SchmintForm;
