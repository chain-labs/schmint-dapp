import React, { useState } from 'react';
import Box from 'src/components/Box';

const AlertBox = ({ children, color }) => {
	const [step, setStep] = useState(1);
	return (
		<Box width="100%" px="2.9rem" backgroundColor={color} py="ms" mt="mm">
			{children}
		</Box>
	);
};

export default AlertBox;
