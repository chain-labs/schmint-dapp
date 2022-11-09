import Image from 'next/image';

import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

const EmptyResultComponent = ({ subText }) => {
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
				{subText}
				<span style={{ color: theme.colors['blue-40'], cursor: 'pointer' }}>
					<a href="https://form.jotform.com/222922224502041" target="_blank" rel="noreferrer">
						Submit a project.
					</a>
				</span>
			</Text>
		</Box>
	);
};

export default EmptyResultComponent;
