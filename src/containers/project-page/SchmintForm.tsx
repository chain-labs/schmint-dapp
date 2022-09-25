import { CaretDown, CaretUp, Minus, Plus } from 'phosphor-react';
import React, { useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import theme from 'src/styleguide/theme';
import { fontSize } from 'styled-system';
import AlertBox from './components/AlertBox';
import InputBox from './components/InputBox';

const SchmintForm = ({ project }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [nft, setNft] = useState(0);
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
				inputType="number"
			/>

			<Text
				as="b3"
				onClick={() => setShowOptions(!showOptions)}
				cursor="pointer"
				my="3.3rem"
				color="blue-40"
				fontWeight="bold"
				row
				alignItems="center"
			>
				Show advanced options
				<Box as="span" ml="0.5rem" center>
					<If condition={showOptions === false} then={<CaretUp size={18} />} else={<CaretDown size={18} />} />
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
					</Box>
				}
			/>
			<Box borderTop={`1px solid ${theme.colors['gray-30']}`} width="100%" mt="mxxxl" />
			<Text as="h5" mt="mxxxl">
				Cost
			</Text>
			<Box backgroundColor={`${theme.colors['sky-blue-20']}`} px="mm" pb="mxs" mt="mm">
				<CostItem
					text={`NFT x${nft}`}
					subText={project?.price * nft}
					unit={project?.network?.name?.slice(0, 3).toUpperCase()}
					width="100%"
				/>
				<CostItem
					text="Schmint Fees"
					subText={0.001}
					unit={project?.network?.name?.slice(0, 3).toUpperCase()}
					width="100%"
				/>
				<CostItem
					text="Estimated gas cost?"
					subText={0.001}
					unit={project?.network?.name?.slice(0, 3).toUpperCase()}
					width="100%"
				/>
			</Box>
			<Box column justifyContent="flex-end" alignItems="flex-end" pt="mxs" width="100%">
				<CostItem
					text="Total:"
					subText={project?.price * nft + 0.001 + 0.001}
					unit={project?.network?.name?.slice(0, 3).toUpperCase()}
					width="50%"
					textColor="blue-40"
					fontSize="b2"
				/>
				<CostItem
					text="Gnosis Safe Balance:"
					subText={0.001}
					unit={project?.network?.name?.slice(0, 3).toUpperCase()}
					width="50%"
					textColor="blue-40"
					fontSize="b2"
				/>
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

interface cost {
	textColor?: string;
	text?: string;
	subText?: number;
	width?: string;
	unit?: string;
	fontSize?: any;
}

const CostItem = ({ text, subText, width, unit, textColor, fontSize }: cost) => {
	return (
		<Box between pt="mxs" width={width}>
			<Text as={fontSize ? fontSize : 'b3'}>{text}</Text>
			<Text as={fontSize ? fontSize : 'b3'} color={textColor ? textColor : `${theme.colors['gray-60']}`}>
				{subText}
				{'  '}
				{unit}
			</Text>
		</Box>
	);
};
