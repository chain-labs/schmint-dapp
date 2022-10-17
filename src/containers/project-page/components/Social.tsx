import Image from 'next/image';
import React from 'react';
import Box from 'src/components/Box';
import theme from 'src/styleguide/theme';

interface props {
	border?: boolean;
	status?: string;
	link?: string;
}

const Social = ({ border, status, link }: props) => {
	return (
		<Box row as="a" target="_blank" href={link}>
			<Box
				border="none"
				borderRight={border ? `1px solid ${theme.colors['gray-20']}` : 'none'}
				px="1.8rem"
				py="1.1rem"
				mt="0"
				cursor="pointer"
			>
				<Box position="relative" width="2.4rem" height="1.8rem">
					<Image src={`https://ik.imagekit.io/chainlabs/Schmint/icons/${status}.svg`} layout="fill" />
				</Box>
			</Box>
		</Box>
	);
};

export default Social;
