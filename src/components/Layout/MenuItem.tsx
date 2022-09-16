import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import theme from 'src/styleguide/theme';
import Box from '../Box';
import Text from '../Text';

const MenuItem = ({ Icon, text, route }) => {
	const router = useRouter();
	return (
		<Link href={route} passHref>
			<Box
				bg={router.pathname === route ? 'sky-blue-30' : 'transparent'}
				borderRadius="8px"
				row
				alignItems="center"
				px="mm"
				py="ms"
				cursor="pointer"
			>
				<Icon color={theme.colors[router.pathname === route ? 'blue-40' : 'gray-40']} size={24} />
				<Text as="h6" ml="ms">
					{text}
				</Text>
			</Box>
		</Link>
	);
};

export default MenuItem;
