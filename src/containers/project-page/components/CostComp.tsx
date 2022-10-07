import { ethers } from 'ethers';
import { Question } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { useBalance, useNetwork } from 'wagmi';
import { ESTIMATED_GAS_COST_TOOLTIP } from './copy-constants';

interface props {
	collection: any;
	nft: number;
	showTotalAmount?: boolean;
	showCostText?: boolean;
	setStep?: (number) => void;
	step?: number;
}

const CostComp = ({ collection, nft, showTotalAmount, step, setStep }: props) => {
	const scheduler = useAppSelector(schedulerSelector);
	const user = useAppSelector(userSelector);
	const { chain } = useNetwork();
	const [estimatedGas, setEstimatedGas] = useState(0.001);
	const { data: balance, isLoading } = useBalance({
		addressOrName: scheduler.avatar,
		chainId: chain?.id,
		watch: true,
	});

	useEffect(() => {
		if (balance) {
			const unexecutedSchmint = scheduler.schmints.filter((schmint) => schmint.status === 'CREATED');
			let balanceUsed = 0;
			unexecutedSchmint.forEach((schmint) => {
				const value = ethers.utils.formatEther(schmint.value);
				balanceUsed += parseFloat(value);
			});
			const balanceLeft = parseFloat(balance.formatted) - balanceUsed;
			if (step <= 1) {
				if (balanceLeft < collection?.price * nft) {
					setStep(1);
				} else {
					setStep(0);
				}
			}
		}
	}, [balance, nft]);

	return (
		<Box>
			<Box backgroundColor={`${theme.colors['sky-blue-20']}`} px="mm" pb="mxs" mt="mm">
				<CostItem
					text={`NFT x${nft}`}
					subText={parseFloat((collection?.price * nft).toFixed(3))}
					unit={chain?.nativeCurrency.symbol}
					width="100%"
				/>
				<CostItem
					text="Schmint Fees"
					subText={estimatedGas}
					unit={chain?.nativeCurrency.symbol}
					width="100%"
					strikeThrough
				/>
				<CostItem
					text="Estimated gas cost"
					tooltip={ESTIMATED_GAS_COST_TOOLTIP}
					subText={0.001}
					unit={chain?.nativeCurrency.symbol}
					width="100%"
				/>
			</Box>
			<If
				condition={showTotalAmount}
				then={
					<Box column justifyContent="flex-end" alignItems="flex-end" pt="mxs" width="100%">
						<CostItem
							text="Total:"
							subText={parseFloat((collection?.price * nft + estimatedGas).toFixed(3))}
							unit={chain?.nativeCurrency.symbol}
							width="50%"
							textColor="blue-40"
							fontSize="b2"
						/>
						<If
							condition={!isLoading && user.exists && !!scheduler.avatar}
							then={
								<CostItem
									text="Gnosis Safe Balance:"
									subText={parseFloat(balance?.formatted.slice(0, 5))}
									unit={chain?.nativeCurrency.symbol}
									width="50%"
									textColor="blue-40"
									fontSize="b2"
								/>
							}
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
	tooltip?: string;
}

const CostItem = ({ text, subText, width, unit, textColor, fontSize, strikeThrough, tooltip }: cost) => {
	return (
		<Box between pt="mxs" width={width}>
			<Box
				row
				alignItems="center"
				css={`
					#cost-tooltip {
						opacity: 1 !important;
						box-shadow: 0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08);
						border-radius: 4px;
						padding: 8px;
						width: 280px;
					}
				`}
			>
				<Text as={fontSize ? fontSize : 'b3'} mr="mxxs">
					{text}
				</Text>
				<If
					condition={!!tooltip}
					then={
						<Question
							weight="fill"
							size={16}
							data-tip={tooltip}
							data-for="cost-tooltip"
							data-offset="{'left': -150, 'top': 120}"
							style={{ cursor: 'pointer' }}
						/>
					}
				/>
				<ReactTooltip
					id="cost-tooltip"
					place="bottom"
					arrowColor="transparent"
					backgroundColor={theme.colors['blue-10']}
					textColor={theme.colors['simply-black']}
					effect="solid"
				/>
			</Box>
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
