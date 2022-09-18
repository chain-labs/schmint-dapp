import Image from 'next/image';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

const EmptyResultComponent = () => {
	return (
		<Box mt="ws" width="39rem" mx="auto">
			<Box position="relative" width="100%" height="16.6rem">
				<Image
					src="https://ik.imagekit.io/chainlabs/Schmint/pablo-page-not-found-2_1_10AQAQXCo.svg"
					layout="fill"
					objectFit="contain"
					quality={1}
				/>
			</Box>
			<Text as="b3" color="gray-40" textAlign="center">
				{
					"Hmm... looks like the project you're looking for doesn't exist on Schmint yet. If you'd like to have it on Schmint, please let us know."
				}
			</Text>
		</Box>
	);
};

export default EmptyResultComponent;
