import { CaretDown, CaretUp, Minus, Plus } from 'phosphor-react';
import React, { useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import theme from 'src/styleguide/theme';
import { fontSize } from 'styled-system';
import AlertBottomBox from './components/AlertBottomBox';
import AlertBox from './components/AlertBox';
import CostComp from './components/CostComp';
import InputBox from './components/InputBox';

const SchmintForm = ({ collection }) => {
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
				max="5"
				min="0"
				errorText={nft > 5 ? "Number of NFTs can't be more than 5" : "Number of NFTs can't be less than 0"}
				disabled
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
			<Box id="input">
				<If
					condition={showOptions === true}
					then={
						<Box>
							<InputBox
								label="Maximum Gas Limit"
								placeholder="5"
								value=""
								detailText="This contract allows upto 5 NFTs per wallet"
								unit="GWEI"
							/>
						</Box>
					}
				/>
			</Box>
			<Box borderTop={`1px solid ${theme.colors['gray-30']}`} width="100%" mt="mxxxl" />
			<CostComp collection={collection} nft={nft} showTotalAmount showCostText />
			<AlertBottomBox showOptions={showOptions} />
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
