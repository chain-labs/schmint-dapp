import { MagnifyingGlass } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { addSearch, searchSelector } from 'src/redux/filter';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';

const SearchInput = () => {
	const { query, count } = useAppSelector(searchSelector);
	const [search, setSearch] = React.useState(query);
	const dispatch = useAppDispatch();

	const handleChange = (e) => {
		try {
			e.preventDefault();
			setSearch(e.target.value);
			dispatch(addSearch({ query: e.target.value, count }));
		} catch (err) {
			console.log('Error changing search input', err);

			// CODE: 112
		}
	};

	return (
		<Box>
			<Box
				border="0.5px solid"
				borderColor="blue-20"
				bg="gray-10"
				boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
				width="100%"
				height="4.8rem"
				borderRadius="4px"
				px="mm"
				py="ms"
				row
				alignItems="center"
			>
				<MagnifyingGlass size={24} />
				<Box
					as="input"
					bg="transparent"
					border="none"
					outline="none"
					width="90%"
					ml="mxs"
					value={search}
					onChange={handleChange}
					placeholder="Search Projects"
					fontFamily="OpenSauceOneRegular"
					fontSize="16px"
					css={`
						&::placeholder {
							color: ${theme.colors['gray-30']};
						}
					`}
				/>
			</Box>
			<Box mt="mxs" row alignItems="center" opacity={search ? 1 : 0}>
				<Text as="c1">{`"${search}"`}</Text>
				<Text as="c1" color="blue-40" ml="mm">
					{`${count === 0 ? 'No' : count} result${count > 1 || count === 0 ? 's' : ''} found`}
				</Text>
			</Box>
		</Box>
	);
};

export default SearchInput;
