import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { filterAlphabetical, filterNetwork, filterPrice, filterSelector, removeFilter } from 'src/redux/filter';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';

const Filters = () => {
	const filter = useAppSelector(filterSelector);

	const dispatch = useAppDispatch();

	const { alphabetical, network, price, clearAll } = filter;
	return (
		<Box mt="mxxxl">
			<Box row alignItems="center" mb="mm">
				<Text as="b2" mr="mm">
					Filters
				</Text>
				<If
					condition={!clearAll}
					then={
						<Text as="c1" color="blue-40" cursor="pointer" onClick={() => dispatch(removeFilter())}>
							Clear all
						</Text>
					}
				/>
			</Box>
			<Box row alignItems="center" justifyContent="space-between">
				<FilterItem
					label="A-Z"
					active={alphabetical.isAZ}
					onClick={() => dispatch(filterAlphabetical({ isAZ: !alphabetical.isAZ, isZA: false }))}
				/>
				<FilterItem
					label="Z-A"
					active={alphabetical.isZA}
					onClick={() => dispatch(filterAlphabetical({ isAZ: false, isZA: !alphabetical.isZA }))}
				/>
				<FilterItem
					label="Ethereum"
					active={network.isEthereum}
					onClick={() => dispatch(filterNetwork({ ...network, isEthereum: !network.isEthereum }))}
				/>
				<FilterItem
					label="Polygon"
					active={network.isPolygon}
					onClick={() => dispatch(filterNetwork({ ...network, isPolygon: !network.isPolygon }))}
				/>
				<FilterItem
					label="Price: Free"
					active={price.isFree}
					onClick={() =>
						dispatch(filterPrice({ isFree: !price.isFree, isLowToHigh: false, isHighToLow: false }))
					}
				/>
				<FilterItem
					label="Price: Low to High"
					active={price.isLowToHigh}
					onClick={() =>
						dispatch(filterPrice({ isFree: false, isLowToHigh: !price.isLowToHigh, isHighToLow: false }))
					}
				/>
				<FilterItem
					label="Price: High to Low"
					active={price.isHighToLow}
					onClick={() =>
						dispatch(filterPrice({ isFree: false, isLowToHigh: false, isHighToLow: !price.isHighToLow }))
					}
				/>
			</Box>
		</Box>
	);
};

export default Filters;

const FilterItem = ({ label, active, onClick }) => {
	return (
		<Box
			borderRadius="64px"
			bg={`sky-blue-${active ? 40 : 10}`}
			border={`1px solid ${theme.colors['blue-10']}`}
			px="mm"
			py="mxs"
			onClick={onClick}
			cursor="pointer"
			css={`
				&:hover {
					background-color: ${theme.colors[active ? 'sky-blue-40' : 'sky-blue-20']};
				}
			`}
		>
			<Text as="b3">{label}</Text>
		</Box>
	);
};
