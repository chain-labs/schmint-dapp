import React from 'react';
import Box from 'src/components/Box';

const AlertBox = ({ children, color }) => {
	return (
		<Box width="100%" px="mxxl" borderRadius="8px" backgroundColor={color} py="ms" mt="mm">
			{children}
		</Box>
	);
};

export default AlertBox;
