import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import theme from 'src/styleguide/theme';
import Box from '../Box';
import Text from '../Text';

const MenuItem = ({ Icon, text, route }) => {
	const router = useRouter();
	const active = router.pathname === route;
	return (
		<Link href={route} passHref>
			<Box
				bg={active ? 'sky-blue-40' : 'transparent'}
				borderRadius="8px"
				row
				alignItems="center"
				px="mm"
				py="ms"
				cursor="pointer"
				css={`
					&:hover {
						background-color: ${theme.colors[active ? 'sky-blue-40' : 'sky-blue-20']};
					}
				`}
			>
				<Icon
					color={theme.colors[active ? 'blue-40' : 'gray-40']}
					size={24}
					weight={route !== '/my-assets' ? 'fill' : 'regular'}
				/>
				<Text as="h6" ml="ms" color={theme.colors[active ? 'simplr-black' : 'gray-40']}>
					{text}
				</Text>
			</Box>
		</Link>
	);
};

export default MenuItem;
