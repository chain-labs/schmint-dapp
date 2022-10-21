import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconProps } from 'phosphor-react';
import React from 'react';
import theme from 'src/styleguide/theme';
import Box from '../Box';
import Text from '../Text';

export interface Props {
	Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	text: string;
	route: string;
	disabled?: boolean;
}

const MenuItem = ({ Icon, text, route, disabled }: Props) => {
	const router = useRouter();
	const active = router.pathname === route;
	return (
		<Link href={disabled ? '' : route} passHref>
			<Box
				bg={active ? 'sky-blue-40' : 'transparent'}
				borderRadius="8px"
				row
				alignItems="center"
				px="mm"
				py="ms"
				cursor={disabled ? 'auto' : 'pointer'}
				css={`
					&:hover {
						background-color: ${theme.colors[
							disabled ? 'transparent' : active ? 'sky-blue-40' : 'sky-blue-20'
						]};
					}
				`}
			>
				<Icon
					color={theme.colors[disabled ? 'gray-20' : active ? 'blue-40' : 'gray-40']}
					size={24}
					weight={route !== '/my-assets' ? 'fill' : 'regular'}
				/>
				<Text as="h6" ml="ms" color={theme.colors[disabled ? 'gray-20' : active ? 'simplr-black' : 'gray-40']}>
					{text}
				</Text>
			</Box>
		</Link>
	);
};

export default MenuItem;
