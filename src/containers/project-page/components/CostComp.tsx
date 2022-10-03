import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

interface props {
	collection: any;
	nft: number;
	showTotalAmount?: boolean;
	showCostText?: boolean;
}

const CostComp = ({ collection, nft, showTotalAmount, showCostText }: props) => {
	return (
		<Box>
			{showCostText ? (
				<Text as="h5" mt="mxxxl">
					Cost
				</Text>
			) : (
				''
			)}

			<Box backgroundColor={`${theme.colors['sky-blue-20']}`} px="mm" pb="mxs" mt="mm">
				<CostItem
					text={`NFT x${nft}`}
					subText={collection?.price * nft}
					unit={collection?.network?.name?.slice(0, 3).toUpperCase()}
					width="100%"
				/>

				<CostItem
					text="Schmint Fees"
					subText={0.001}
					unit={collection?.network?.name?.slice(0, 3).toUpperCase()}
					width="100%"
					strikeThrough
				/>
				<CostItem
					text="Estimated gas cost?"
					subText={0.001}
					unit={collection?.network?.name?.slice(0, 3).toUpperCase()}
					width="100%"
				/>
			</Box>
			<If
				condition={showTotalAmount}
				then={
					<Box column justifyContent="flex-end" alignItems="flex-end" pt="mxs" width="100%">
						<CostItem
							text="Total:"
							subText={collection?.price * nft + 0.001 + 0.001}
							unit={collection?.network?.name?.slice(0, 3).toUpperCase()}
							width="50%"
							textColor="blue-40"
							fontSize="b2"
						/>
						<CostItem
							text="Gnosis Safe Balance:"
							subText={0.001}
							unit={collection?.network?.name?.slice(0, 3).toUpperCase()}
							width="50%"
							textColor="blue-40"
							fontSize="b2"
						/>
					</Box>
				}
			/>
		</Box>
	);
};

export default CostComp;

interface cost {
	textColor?: string;
	text?: string;
	subText?: number;
	width?: string;
	unit?: string;
	fontSize?: any;
	strikeThrough?: boolean;
}

const CostItem = ({ text, subText, width, unit, textColor, fontSize, strikeThrough }: cost) => {
	return (
		<Box between pt="mxs" width={width}>
			<Text as={fontSize ? fontSize : 'b3'}>{text}</Text>
			<Text as={fontSize ? fontSize : 'b3'} color={textColor ? textColor : `${theme.colors['gray-60']}`}>
				{strikeThrough ? (
					<Box
						as="span"
						mr="mxs"
						css={`
							text-decoration: line-through;
						`}
					>
						{subText}
					</Box>
				) : (
					''
				)}
				{strikeThrough ? '0.000' : subText}
				{'  '}
				{unit}
			</Text>
		</Box>
	);
};
