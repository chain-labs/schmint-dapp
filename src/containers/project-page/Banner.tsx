import Image from 'next/image';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

const Banner = ({ project }) => {
	return (
		<Box width="100%">
			<Box>
				<Box width="100%" height="26.4rem" as="img" src={project?.banner} />
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
					src={project?.logo}
				/>
			</Box>
			<Box center column>
				<Text as="h4">{project?.title}</Text>
				<Text as="h5" textAlign="center" color="gray-50">
					({project?.title?.slice(0, 3).toUpperCase()})
				</Text>
			</Box>
		</Box>
	);
};

export default Banner;
