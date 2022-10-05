import Image from 'next/image';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

const Banner = ({ collection }) => {
	return (
		<Box width="100%">
			<Box>
				<Box width="100%" height="26.4rem" as="img" src={collection?.banner} />
			</Box>
			<Box center>
				<Box
					position="relative"
					width="11rem"
					height="11rem"
					mt="-5.5rem"
					border="2px solid white"
					borderRadius="999px"
					as="img"
					src={collection?.logo}
				/>
			</Box>
			<Box center column>
				<Text as="h4">{collection?.title}</Text>
				<Text as="h5" textAlign="center" color="gray-50">
					({collection?.symbol})
				</Text>
			</Box>
		</Box>
	);
};

export default Banner;
