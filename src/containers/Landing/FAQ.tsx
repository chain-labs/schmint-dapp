import React, { useState } from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import If from 'src/components/If';
import { CaretDown, CaretUp } from 'phosphor-react';
import theme from 'src/styleguide/theme';

const FAQ = ({ q, a, last }) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<Box
			borderBottom={!last ? `1px solid ${theme.colors['gray-20']}` : 'none'}
			pb="mxl"
			mb={!last ? { mobS: 'mxxxl', deskM: 'wxs' } : '0'}
		>
			<Box row alignItems="center" justifyContent="space-between" mb="mxl">
				<Text as="h5">{q}</Text>
				<Box cursor="pointer">
					<If
						condition={expanded}
						then={<CaretUp size={32} onClick={() => setExpanded(false)} />}
						else={<CaretDown size={32} onClick={() => setExpanded(true)} />}
					/>
				</Box>
			</Box>
			<If
				condition={expanded}
				then={
					<Text as="b1" width={{ mobS: '33rem', tabS: '50.6rem', deskM: '66.4rem' }} color="gray-40">
						{a}
					</Text>
				}
			/>
		</Box>
	);
};

export default FAQ;
