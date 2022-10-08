import React from 'react';
import animationData from '../lottie/loading.json';
import Lottie from 'react-lottie';
import Box from './Box';
import Text from './Text';
import If from './If';

const Loader = ({ msg, minHeight }: { msg?: string; minHeight?: string }) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<Box minHeight={minHeight ?? '100vh'} column justifyContent="center">
			<Lottie options={defaultOptions} height={64} width={64} />
			<If
				condition={!!msg}
				then={
					<Text as="h5" mt="mxl" textAlign="center">
						{msg}
					</Text>
				}
			/>
		</Box>
	);
};

export default Loader;
