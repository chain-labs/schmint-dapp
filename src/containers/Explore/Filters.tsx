import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

const initialState = {
	alphabetic: {
		'a-z': false,
		'z-a': false,
	},
	network: {
		ethereum: false,
		polygon: false,
	},
	price: {
		free: false,
		'low-to-high': false,
		'high-to-low': false,
	},
	clear: true,
};

const Filters = () => {
	const [filterState, setFilterState] = React.useState(initialState);

	useEffect(() => {
		const checkClear = () => {
			const { alphabetic, network, price } = filterState;
			if (!alphabetic['a-z'] && !alphabetic['z-a']) {
				if (!network.ethereum && !network.polygon) {
					if (!price.free && !price['low-to-high'] && !price['high-to-low']) {
						return true;
					}
				}
			}
			return false;
		};
		const clear = checkClear();
		if (clear !== filterState.clear) {
			setFilterState({ ...filterState, clear });
		}
	}, [filterState]);

	const { alphabetic, network, price, clear } = filterState;
	return (
		<Box mt="mxxxl">
			<Box row alignItems="center" mb="mm">
				<Text as="b2" mr="mm">
					Filters
				</Text>
				<If
					condition={!clear}
					then={
						<Text as="c1" color="blue-40" cursor="pointer" onClick={() => setFilterState(initialState)}>
							Clear all
						</Text>
					}
				/>
			</Box>
			<Box row alignItems="center" justifyContent="space-between">
				<FilterItem
					label="A-Z"
					active={alphabetic['a-z']}
					onClick={() => {
						setFilterState({
							...filterState,
							alphabetic: { 'a-z': !alphabetic['a-z'], 'z-a': false },
						});
					}}
				/>
				<FilterItem
					label="Z-A"
					active={alphabetic['z-a']}
					onClick={() => {
						setFilterState({
							...filterState,
							alphabetic: { 'a-z': false, 'z-a': !alphabetic['z-a'] },
						});
					}}
				/>
				<FilterItem
					label="Ethereum"
					active={network.ethereum}
					onClick={() => {
						setFilterState({
							...filterState,
							network: { ...network, ethereum: !network.ethereum },
						});
					}}
				/>
				<FilterItem
					label="Polygon"
					active={network.polygon}
					onClick={() => {
						setFilterState({
							...filterState,
							network: { ...network, polygon: !network.polygon },
						});
					}}
				/>
				<FilterItem
					label="Price: Free"
					active={price.free}
					onClick={() => {
						setFilterState({
							...filterState,
							price: { free: !price.free, 'low-to-high': false, 'high-to-low': false },
						});
					}}
				/>
				<FilterItem
					label="Price: Low to High"
					active={price['low-to-high']}
					onClick={() => {
						setFilterState({
							...filterState,
							price: { free: false, 'low-to-high': !price['low-to-high'], 'high-to-low': false },
						});
					}}
				/>
				<FilterItem
					label="Price: High to Low"
					active={price['high-to-low']}
					onClick={() => {
						setFilterState({
							...filterState,
							price: { free: false, 'low-to-high': false, 'high-to-low': !price['high-to-low'] },
						});
					}}
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
			bg={`sky-blue-${active ? 30 : 10}`}
			border={`1px solid ${theme.colors['blue-10']}`}
			px="mm"
			py="mxs"
			onClick={onClick}
			cursor="pointer"
		>
			<Text as="b3">{label}</Text>
		</Box>
	);
};
