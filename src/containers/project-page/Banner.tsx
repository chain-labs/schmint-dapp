import Image from 'next/image';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

const Banner = () => {
	return (
		<Box width="100%">
			<Box position="relative" height="26.4rem">
				<Box ml="mxxs">
					<Image
						src="https://ik.imagekit.io/chainlabs/Schmint/Banner_exiU62uG7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663856042743"
						layout="fill"
					/>
				</Box>
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
					src="https://ik.imagekit.io/chainlabs/Schmint/Banner_exiU62uG7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663856042743"
				/>
			</Box>
			<Box center column>
				<Text as="h4">Abstract 3D</Text>
				<Text as="h4" textAlign="center">
					Abs
				</Text>
			</Box>
		</Box>
	);
};

export default Banner;
