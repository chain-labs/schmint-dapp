import React, { useState } from 'react';
import { useEffect } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

const ReadMore = ({ mainText }) => {
	const [slicedText, setSlicedText] = useState('');
	const [isReadMore, setIsReadMore] = useState(false);
	useEffect(() => {
		setSlicedText(isReadMore ? mainText : mainText?.slice(0, 100));
	}, [isReadMore, mainText]);

	return (
		<Box width="57.4rem" my="mm">
			<Text textAlign="center" as="b2" color="gray-50">
				{slicedText}
				{!isReadMore ? (
					<Box
						as="span"
						onClick={() => setIsReadMore(!isReadMore)}
						color="black"
						fontWeight="medium"
						cursor="pointer"
					>
						...Read More
					</Box>
				) : (
					''
				)}
			</Text>
		</Box>
	);
};

export default ReadMore;
